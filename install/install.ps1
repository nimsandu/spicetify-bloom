# Enable TLS 1.2 since it is required for connections to GitHub
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = "Stop"

Write-Host -Object "Beginning installation of spicetify-bloom"
Write-Host -Object "https://github.com/nimsandu/spicetify-bloom"

# Give time for user to cancel via CTRL+C
Start-Sleep -Seconds 3

# Check if Spotify installed
if ( -not (Test-Path -Path "$env:APPDATA/Spotify") ) {
  if ( -not (Get-AppxPackage | Where-Object -Property Name -Match "^SpotifyAB") ) {
    Write-Host -Object "Spotify not installed!" -ForegroundColor Red
    Start-Sleep -Seconds 3
    exit
  }
}

if ( -not (Get-Command -Name spicetify -ErrorAction SilentlyContinue) ) {
  Write-Host -Object "Spicetify not found. Installing it for you..." -ForegroundColor Red
  Invoke-WebRequest -Uri "https://raw.githubusercontent.com/khanhas/spicetify-cli/master/install.ps1" -UseBasicParsing | Invoke-Expression
}

# Check if ~\.spicetify-cli\Themes\bloom directory exists
$spicePath = spicetify -c | Split-Path
$themePath = "$spicePath\Themes\bloom"
if (Test-Path -Path $themePath) {
  # Remove pre-existing files, only keep the newest files
  Remove-Item -Path "$themePath\*" -Recurse -Force
}
else {
  Write-Host -Object "Creating bloom theme folder..."
  New-Item -Path $themePath -ItemType Directory | Out-Null
}

# Remove old extension
spicetify config extensions bloom.js- -q
Remove-Item -Path "$spicePath\Extensions\bloom.js" -Force -ErrorAction SilentlyContinue

# Download latest master
$zipUri      = "https://github.com/nimsandu/spicetify-bloom/archive/refs/heads/master.zip"
$zipSavePath = "$themePath\bloom-main.zip"
Write-Host -Object "Downloading spicetify-bloom latest master..."
Invoke-WebRequest -Uri $zipUri -UseBasicParsing -OutFile $zipSavePath

# Extract theme from .zip file
Write-Host -Object "Extracting..."
Expand-Archive -Path $zipSavePath -DestinationPath $themePath -Force
Move-Item -Path "$themePath\spicetify-bloom-main\src\*" -Destination $themePath
Remove-Item -Path "$themePath\spicetify-bloom-main"

# Delete .zip file
Write-Host -Object "Deleting zip file..."
Remove-Item -Path $zipSavePath

# Apply the theme with spicetify config calls
$currentTheme = (spicetify config current_theme)
$colorScheme = (spicetify config color_scheme)
if (($currentTheme -ne "bloom") -or ($colorScheme -notin @("dark", "light", "darkmono"))) {
  spicetify config current_theme bloom
  $appsUseLightTheme = Get-ItemPropertyValue -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize -Name AppsUseLightTheme
  switch ($appsUseLightTheme) {
    0 { spicetify config color_scheme dark }
    1 { spicetify config color_scheme light }
  }
}
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1 inject_theme_js 1
Write-Host -Object "+ Configured bloom theme"

# Patch the xpui.js for sidebar fixes
# credit: https://github.com/JulienMaille/dribbblish-dynamic-theme/blob/main/install.ps1
$configFile = Get-Content -Path "$spicePath\config-xpui.ini"
if (-not($configFile -match "xpui.js_find_8008")) {
  $rep = @"
[Patch]
xpui.js_find_8008 = , (\w+=)32,
xpui.js_repl_8008 = , `${1}58,
"@
  # In case missing Patch section
  if (-not($configFile -match "\[Patch\]")) {
    $configFile += "`n[Patch]`n"
  }
  $configFile = $configFile -replace "\[Patch\]", $rep
  Set-Content -Path "$spicePath\config-xpui.ini" -Value $configFile
}
Write-Host -Object "+ Patched xpui.js for Sidebar fixes"

$files = @(
  "$env:SystemRoot\Fonts\SegUIVar.ttf",
  "$env:SystemRoot\Fonts\SegoeUI-VF.ttf",
  "$env:LOCALAPPDATA\Microsoft\Windows\Fonts\SegoeUI-VF.ttf"
)
if ( -not ( ($files | Test-Path -PathType Leaf) -contains $true ) ) {
  $choice = $host.UI.PromptForChoice("", "Install Segoe UI Variable font for better look?", ("&Yes", "&No"), 0)
  if ($choice -eq 0) {
    Invoke-WebRequest -Uri https://aka.ms/SegoeUIVariable -UseBasicParsing -OutFile $env:TEMP\SegoeUI-VF.zip
    Expand-Archive -Path $env:TEMP\SegoeUI-VF.zip -DestinationPath $env:TEMP\SegoeUI-VF\ -Force
    (New-Object -ComObject Shell.Application).Namespace(0x14).CopyHere("$env:TEMP\SegoeUI-VF\SegoeUI-VF.ttf", 0x10)
    Remove-Item -Path $env:TEMP\SegoeUI-VF.zip, $env:TEMP\SegoeUI-VF -Recurse -Force
  }
}

# backup apply or just apply where necessary
$configFile | ForEach-Object {
  if ($_ -match "^version = (.+)$") {
    $version = $matches[1]
  }
}

if ($version) {
  spicetify apply
}
else {
  spicetify backup apply
}
Write-Host -Object "+ Applied Theme"
