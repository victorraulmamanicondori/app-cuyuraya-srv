@echo off
:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Instalar dependencias
npm install

:: Ejecutar el comando npm run start en una nueva ventana de cmd
npm run setup:db

:: Pausar
pause

