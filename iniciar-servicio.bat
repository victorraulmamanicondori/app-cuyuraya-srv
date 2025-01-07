@echo off
:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Ejecutar el comando npm run start en una nueva ventana de cmd
start cmd /k "npm run start"

