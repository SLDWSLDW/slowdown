@echo off
for /f %%i in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"') do set msg=%%i
git add .
git commit -m "%msg%"
git push
