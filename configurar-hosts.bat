@echo off
:: Comprobar si el script se está ejecutando como administrador
:: Si no, solicitar privilegios elevados y reiniciar el script
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Solicitud de permisos de administrador...
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Ejecutar el comando npm run start en una nueva ventana de cmd
start cmd /k "npm run setup:hosts"