@echo off
setlocal enabledelayedexpansion
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"
set "GIT_USER=sanyaleks2012-lab"
set "GIT_REPO=LegacyPane"

:main_menu
cls
echo ============================================
echo   CS:GO Panorama UI - Git Manager
echo ============================================
echo.
echo  [1] Manage .gitignore
echo  [2] Git status
echo  [3] Add all + commit
echo  [4] Push to GitHub
echo  [5] Full cycle: add ^> commit ^> push
echo  [6] Exit
echo.
choice /c 123456 /n /m "Choose action: "
if !errorlevel! equ 1 goto gitignore_menu
if !errorlevel! equ 2 goto git_status
if !errorlevel! equ 3 goto git_add_commit
if !errorlevel! equ 4 goto git_push
if !errorlevel! equ 5 goto git_full_cycle
if !errorlevel! equ 6 goto :eof

:gitignore_menu
cls
echo ============================================
echo   Manage .gitignore
echo ============================================
echo.
echo  Current rules:
echo  -----------------------------------------
type .gitignore 2>nul
echo  -----------------------------------------
echo.
echo  [1] Ignore build files (.pbin .table.txt .zip)
echo  [2] Ignore backups (2/ 3/)
echo  [3] Ignore vanilla (fonts/ videos/)
echo  [4] Ignore Python cache
echo  [5] Ignore backgrounds/ (do not publish)
echo  [6] PUBLISH backgrounds/ (include in repo)
echo  [7] Reset to default template
echo  [8] Back to main menu
echo.
choice /c 12345678 /n /m "Choose action: "
if !errorlevel! equ 1 (
    call :add_rule "*.pbin"
    call :add_rule "*.table.txt"
    call :add_rule "*.zip"
    goto gitignore_menu
)
if !errorlevel! equ 2 (
    call :add_rule "/2/"
    call :add_rule "/3/"
    goto gitignore_menu
)
if !errorlevel! equ 3 (
    call :add_rule "/fonts/"
    call :add_rule "/videos/"
    goto gitignore_menu
)
if !errorlevel! equ 4 (
    call :add_rule "__pycache__/"
    call :add_rule "*.pyc"
    goto gitignore_menu
)
if !errorlevel! equ 5 (
    call :add_rule "/backgrounds/"
    goto gitignore_menu
)
if !errorlevel! equ 6 (
    call :remove_rule "/backgrounds/"
    goto gitignore_menu
)
if !errorlevel! equ 7 goto reset_gitignore
if !errorlevel! equ 8 goto main_menu

:add_rule
findstr /x /c:"%~1" .gitignore >nul 2>&1
if errorlevel 1 (
    echo %~1>>.gitignore
    echo  [+] Added: %~1
) else (
    echo  [=] Already exists: %~1
)
timeout /t 1 >nul
goto :eof

:remove_rule
findstr /v /x /c:"%~1" .gitignore > .gitignore.tmp 2>nul
if exist .gitignore.tmp (
    move /y .gitignore.tmp .gitignore >nul 2>&1
    echo  [-] Removed: %~1
)
timeout /t 1 >nul
goto :eof

:reset_gitignore
(
echo # Build artifacts
echo *.pbin
echo *.table.txt
echo *.zip
echo.
echo # Backup directories
echo /2/
echo /3/
echo.
echo # Vanilla game files
echo /fonts/
echo /videos/
echo.
echo # Python cache
echo __pycache__/
echo *.pyc
echo.
echo # IDE
echo .vscode/
echo .idea/
) > .gitignore
echo  [!] .gitignore reset to default template
timeout /t 1 >nul
goto :eof

:git_status
cls
echo ============================================
echo   Git Status
echo ============================================
echo.
git status --short
echo.
pause
goto main_menu

:git_add_commit
cls
echo ============================================
echo   Add all and commit
echo ============================================
echo.
git add -A
echo  [+] All files added
echo.
set /p "COMMIT_MSG=Commit message: "
if "!COMMIT_MSG!"=="" set "COMMIT_MSG=auto update"
git commit -m "!COMMIT_MSG!"
echo.
pause
goto main_menu

:git_push
cls
echo ============================================
echo   Push to GitHub
echo ============================================
echo.
git remote -v | findstr "origin" >nul 2>&1
if errorlevel 1 (
    echo  Remote 'origin' not found.
    echo.
    set /p "REPO_URL=Enter repo URL (or press Enter for default): "
    if "!REPO_URL!"=="" set "REPO_URL=https://github.com/%GIT_USER%/%GIT_REPO%.git"
    git remote add origin "!REPO_URL!"
    echo  [+] Remote added
)
git push -u origin main
if errorlevel 1 (
    echo  Push to master failed, trying main...
    git push -u origin main
)
echo.
pause
goto main_menu

:git_full_cycle
cls
echo ============================================
echo   Full cycle: add ^> commit ^> push
echo ============================================
echo.
git add -A
echo  [+] Files added
echo.
set /p "COMMIT_MSG=Commit message: "
if "!COMMIT_MSG!"=="" set "COMMIT_MSG=auto update"
git commit -m "!COMMIT_MSG!"
if errorlevel 1 (
    echo  [!] Nothing to commit
    choice /c yn /n /m "Continue push anyway? (y/n): "
    if !errorlevel! equ 2 goto main_menu
)
echo.
git remote -v | findstr "origin" >nul 2>&1
if errorlevel 1 (
    set /p "REPO_URL=Enter repo URL (or press Enter for default): "
    if "!REPO_URL!"=="" set "REPO_URL=https://github.com/%GIT_USER%/%GIT_REPO%.git"
    git remote add origin "!REPO_URL!"
)
git push -u origin main
if errorlevel 1 (
    git push -u origin main
)
echo.
echo  [!] Done!
pause
goto main_menu

