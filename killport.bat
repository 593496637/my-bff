@echo off
REM 用法: killport.bat 3000
REM Windows 版本的端口清理脚本

if "%1"=="" (
    echo ❌ 请输入要释放的端口号，例如: killport.bat 3000
    exit /b 1
)

set PORT=%1

echo 🖥️  检测到 Windows 系统
echo 🔎 正在查找占用端口 %PORT% 的进程...

REM 查找占用端口的进程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%PORT% "') do (
    echo 🔫 正在杀死进程 PID: %%a ^(端口 %PORT%^)
    taskkill /PID %%a /F >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✅ 成功杀死进程 %%a
    ) else (
        echo ❌ 杀死进程 %%a 失败
    )
)

echo 🎉 端口 %PORT% 清理完成
pause