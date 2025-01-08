@echo off
:: Cambiar al directorio donde está ubicado el archivo .bat
cd /d "%~dp0"

:: Mostrar la ruta actual para confirmar
echo Directorio actual: %cd%

:: Instalar dependencias
echo Instalando dependencias...
npm install > npm-install-log.txt 2>&1
if %errorlevel% neq 0 (
    echo Error al instalar dependencias. Ver archivo npm-install-log.txt para más detalles.
    pause
    exit /b %errorlevel%
)
pause

:: Pausar después de la instalación
echo Proceso de instalación completado.
pause
