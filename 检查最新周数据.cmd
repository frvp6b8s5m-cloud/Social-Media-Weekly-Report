@echo off
title ReelShort Weekly Data Validation
cd /d "%~dp0"

set "PYTHON=C:\Users\20161\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if not exist "%PYTHON%" (
  echo The bundled Python runtime was not found.
  pause
  exit /b 1
)

"%PYTHON%" "scripts\validate_week.py"
echo.
echo Validation finished. Detailed result files have been saved locally.
pause
