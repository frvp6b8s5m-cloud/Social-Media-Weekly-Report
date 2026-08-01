@echo off
title ReelShort Weekly Data Folder
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "& { $weeklyScript = [scriptblock]::Create((Get-Content -Raw -Encoding UTF8 'scripts\create_week_folder.ps1')); & $weeklyScript }"
if errorlevel 1 (
  echo.
  echo Could not create the weekly folder. Please review the message above.
)
pause
