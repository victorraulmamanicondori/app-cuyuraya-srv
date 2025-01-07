@echo off
:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Ejecuar carga inicial de datos
npm run setup:db

:: Ejecutar el comando npm run start
npm run start

:: Pausar para ver el resultado en la terminal
pause
