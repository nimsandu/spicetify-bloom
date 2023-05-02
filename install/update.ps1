$ErrorActionPreference = "Stop"

# Auto-update task code
$UpdaterTask = @"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
`$ErrorActionPreference = 'Stop'

`$spicePath = spicetify -c | Split-Path
`$themeFolder = Get-ChildItem -Path `$spicePath\Themes\bloom

`$lastWriteTime = Get-Date -Date (`$themeFolder.LastWriteTime | Select-Object -Last 1)

`$commitsHistory = (Invoke-WebRequest -Uri 'https://github.com/nimsandu/spicetify-bloom/commits/main' -UseBasicParsing).RawContent
`$commitsHistory -match '<relative-time datetime="(.+)" class' | Out-Null
`$lastCommitDate = Get-Date -Date `$matches[1]

if (`$lastCommitDate -gt `$lastWriteTime) {
    Invoke-WebRequest -UseBasicParsing 'https://raw.githubusercontent.com/nimsandu/spicetify-bloom/main/install/install.ps1' | Invoke-Expression
}
"@

# Set auto-update task parameters and register it
$Parameters = @{
    TaskName    = "Bloom Updater"
    Description = "Keeps your Spicetify Bloom theme up to date"
    Action      = New-ScheduledTaskAction -Execute powershell.exe -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -Command $UpdaterTask"
    Trigger     = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek Monday -At 12am
    Principal   = New-ScheduledTaskPrincipal -UserId $env:USERNAME -RunLevel Highest
    Settings    = New-ScheduledTaskSettingsSet -StartWhenAvailable
}
Register-ScheduledTask @Parameters -Force | Out-Null

exit
