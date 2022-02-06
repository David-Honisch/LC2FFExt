@echo off
REM move lc2ffext-1.01.zip lc2ffext-1.01_backup.zip
cd %~dp0
REM call build.bat
REM cd ..
REM copy "D:\src\git\LC2FireFox.Addon.2022\src\web-ext-artifacts\lc2ffext-1.01.zip" "D:\src\git\LC2FireFox.Addon.2022\lc2ffext-1.01.zip"
REM pip install winreg
REM pip install json
REM pip install os
REM pip install re
REM pip install winreg
py check_config_win.py
timeout 3