@echo off
title ReelShort Social Weekly Report
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Please contact the report maintainer.
  pause
  exit /b 1
)

if not exist "dist\server\index.js" (
  echo The generated report was not found. Please contact the report maintainer.
  pause
  exit /b 1
)

start "" /b powershell.exe -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://127.0.0.1:4173/'"
node "work\preview-server.mjs"

echo.
echo The report server has stopped.
pause
