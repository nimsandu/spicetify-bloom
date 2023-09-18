[CmdletBinding()]
param (
  [ValidateSet('Install', 'Uninstall', 'Update')]
  [string]$Action = 'Install'
)
begin {
  $ErrorActionPreference = 'Stop'
  Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process -Force
  $previousConsoleTitle = $Host.UI.RawUI.WindowTitle
  $Host.UI.RawUI.WindowTitle = 'Bloom Installer'
}
process {
  Clear-Host
  
  Write-Verbose -Message 'Downloading Functions module...' -Verbose
  $moduleName = 'Functions'
  $modulePath = "$env:TEMP\$moduleName.psm1"
  $Parameters = @{
    Uri             = (
      'https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/powershell/functions.psm1'
    )
    UseBasicParsing = $true
    OutFile         = $modulePath
  }
  Invoke-WebRequest @Parameters
  Import-Module -Name $modulePath
  
  Clear-Host
  Write-HelloMessage
  
  $minimumPowerShellVersion = [version]5.1
  $currentPowerShellVersion = [version]$PSVersionTable.PSVersion
  
  if ($currentPowerShellVersion -lt $minimumPowerShellVersion) {
    Write-Error -Message (
      "Your PowerShell version is $currentPowerShellVersion.`n" +
      "The minimum version required to run this script is $minimumPowerShellVersion."
    )
  }
  
  $isSpicetifyInstalled = Test-Spicetify
  
  switch ($Action) {
    'Uninstall' {
      if (-not $isSpicetifyInstalled) {
        Write-Error -Message 'Failed to detect Spicetify installation!'
      }
      
      $spicetifyFolders = Get-SpicetifyFoldersPaths
      $Parameters = @{
        Path   = $spicetifyFolders.bloomPath
        Config = $spicetifyFolders.configPath
      }
      
      $Host.UI.RawUI.Flushinputbuffer()
      $choice = $Host.UI.PromptForChoice(
        '',
        'Do you plan to use the marketplace to install the next theme?',
        ('&Yes', '&No'),
        0
      )
      if ($choice -eq 0) {
        $Parameters.Value = 'marketplace'
      }
      
      Uninstall-Bloom @Parameters
    }
    'Update' {
      if (-not $isSpicetifyInstalled) {
        Write-Error -Message 'Failed to detect Spicetify installation!'
      }
      
      $type = Get-ThemeType -Path $spicetifyFolders.bloomPath
      $spicetifyFolders = Get-SpicetifyFoldersPaths
      $Parameters = @{
        Path        = (Get-Bloom -Type $type)
        Destination = $spicetifyFolders.bloomPath
        Config      = $spicetifyFolders.configPath
      }
      Install-Bloom @Parameters
    }
    'Install' {
      if (-not (Test-Spotify)) {
        Write-Warning -Message 'Spotify not found.'
        
        $Host.UI.RawUI.Flushinputbuffer()
        $choice = $Host.UI.PromptForChoice('', 'Install Spotify?', ('&Yes', '&No'), 0)
        if ($choice -eq 1) {
          exit
        }
        
        Install-Spotify
      }
      
      if (-not $isSpicetifyInstalled) {
        Write-Warning -Message 'Spicetify not found.'
        
        $Host.UI.RawUI.Flushinputbuffer()
        $choice = $Host.UI.PromptForChoice('', 'Install Spicetify?', ('&Yes', '&No'), 0)
        if ($choice -eq 1) {
          exit
        }
        
        Install-Spicetify
        Install-Marketplace
      }
      
      if (-not (Test-SegoeUIVariable)) {
        Write-Warning -Message 'Segoe UI Variable font not found.'
        
        $Host.UI.RawUI.Flushinputbuffer()
        $choice = $Host.UI.PromptForChoice(
          '',
          'Install Segoe UI Variable font for better look?',
          ('&Yes', '&No'),
          0
        )
        if ($choice -eq 0) {
          Add-SegoeUIVariable -Path (Get-SegoeUIVariable)
        }
      }
      
      $Host.UI.RawUI.Flushinputbuffer()
      $choice = $Host.UI.PromptForChoice(
        '',
        'Use the files that fetch all the code remotely (auto-update) ' +
        'or store all of the code locally (no auto-update)?',
        ('&Remote', '&Local'),
        0
      )

      if ($choice -eq 0) {
        $type = 'Remote'
      }
      else {
        $type = 'Local'
      }

      $spicetifyFolders = Get-SpicetifyFoldersPaths
      $Parameters = @{
        Path        = (Get-Bloom -Type $type)
        Destination = $spicetifyFolders.bloomPath
        Config      = $spicetifyFolders.configPath
        ColorScheme = (Get-WindowsAppsTheme)
      }
      
      Install-Bloom @Parameters
    }
  }
}
end {
  Write-ByeMessage
  Remove-Module -Name $moduleName -Force
  Remove-Item -Path $modulePath -Force
  [Console]::Title = $previousConsoleTitle
  Start-Sleep -Seconds 5
}
