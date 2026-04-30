@echo off
chcp 65001 >nul

echo ========================================
echo   Slowdown - Deploy Script
echo ========================================
echo.

echo [1/4] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Aborting.
    pause
    exit /b 1
)
echo Build successful!
echo.

echo [2/4] Cleaning slowdown (keeping .git) and copying dist...
if exist slowdown (
    cd /d "%~dp0slowdown"
    for /d %%i in (*) do rmdir /s /q "%%i"
    for %%i in (*) do if not "%%i"==".git" del /q "%%i"
    cd /d "%~dp0"
) else (
    mkdir slowdown
)
xcopy dist\* slowdown /E /Y /Q >nul
copy slowdown\index.html slowdown\404.html /Y >nul
echo slowdown.asia > slowdown\CNAME
echo %DATE% %TIME% - Created CNAME + 404.html (SPA fallback)
echo Done!
echo.

echo [3/4] Staging and committing in slowdown repo...
cd /d "%~dp0slowdown"
git add .
for /f "delims=" %%i in ('powershell -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"') do set "commit_msg=%%i"
git commit -m "%commit_msg%"
echo Done!
echo.

echo [4/4] Pushing to remote...
git push
echo.

cd /d "%~dp0"
echo ========================================
echo   Deploy complete!
echo ========================================
pause
