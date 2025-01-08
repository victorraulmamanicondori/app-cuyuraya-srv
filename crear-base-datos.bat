@echo off
:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Ejecutar el comando npm run setup:db
echo Configurando la base de datos...
npm run setup:db
if %errorlevel% neq 0 (
    echo Error al configurar la base de datos.
    pause
    exit /b %errorlevel%
)

:: Pausar
echo Proceso completado.
pause
