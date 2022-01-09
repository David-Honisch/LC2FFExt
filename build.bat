@echo off
move lc2ffext-1.01.zip lc2ffext-1.01_backup.zip
cd src
call build.bat
cd ..
copy "D:\src\git\LC2FireFox.Addon.2022\src\web-ext-artifacts\lc2ffext-1.01.zip" "D:\src\git\LC2FireFox.Addon.2022\lc2ffext-1.01.zip"
timeout 3