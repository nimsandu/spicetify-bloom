# Enable TLS 1.2 since it is required for connections to GitHub
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ErrorActionPreference = "Stop"

Write-Host -Object "Beginning installation of spicetify-bloom"
Write-Host -Object "https://github.com/nimsandu/spicetify-bloom"

# Give time for user to cancel via CTRL+C
Start-Sleep -Seconds 3

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

# Download latest master
$zipUri      = "https://github.com/nimsandu/spicetify-bloom/archive/refs/heads/master.zip"
$zipSavePath = "$themePath\bloom-main.zip"
Write-Host -Object "Downloading spicetify-bloom latest master..."
Invoke-WebRequest -Uri $zipUri -UseBasicParsing -OutFile $zipSavePath

# Extract theme from .zip file
Write-Host -Object "Extracting..."
Expand-Archive -Path $zipSavePath -DestinationPath $themePath -Force
Move-Item -Path "$themePath\spicetify-bloom-main\*" -Destination $themePath
Remove-Item -Path "$themePath\spicetify-bloom-main"

# Delete .zip file
Write-Host -Object "Deleting zip file..."
Remove-Item -Path $zipSavePath

# Copy the bloom.js to the Extensions folder
Copy-Item -Path "$themePath\bloom.js" -Destination "$spicePath\Extensions"
Write-Host -Object "Installed bloom.js theme"

# Apply the theme with spicetify config calls
spicetify config extensions bloom.js
spicetify config current_theme bloom
spicetify config color_scheme dark
spicetify config inject_css 1 replace_colors 1 overwrite_assets 1
Write-Host -Object "Configured bloom theme"

# Patch the xpui.js for sidebar fixes
# credit: https://github.com/JulienMaille/dribbblish-dynamic-theme/blob/main/install.ps1
$configFile = Get-Content "$spicePath\config-xpui.ini"
if ($configFile -notmatch "xpui.js_find_8008") {
  $rep = @"
[Patch]
xpui.js_find_8008 = , (\w+=)32,
xpui.js_repl_8008 = , `${1}58,
"@
  # In case missing Patch section
  if ($configFile -notmatch "\[Patch\]") {
    $configFile += "`n[Patch]`n"
  }
  $configFile = $configFile -replace "\[Patch\]", $rep
  Set-Content -Path "$spicePath\config-xpui.ini" -Value $configFile
}
Write-Host -Object "Patched xpui.js for Sidebar fixes"

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
Write-Host -Object "Applied Theme"