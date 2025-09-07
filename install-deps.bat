@echo off
echo Instalando dependencias do projeto...
echo.

REM Tentar usar npm primeiro
echo Tentando npm...
npm install
if %errorlevel% equ 0 (
    echo Dependencias instaladas com sucesso usando npm!
    goto :end
)

REM Se npm falhar, tentar yarn
echo npm falhou, tentando yarn...
yarn install
if %errorlevel% equ 0 (
    echo Dependencias instaladas com sucesso usando yarn!
    goto :end
)

REM Se yarn falhar, tentar pnpm
echo yarn falhou, tentando pnpm...
pnpm install
if %errorlevel% equ 0 (
    echo Dependencias instaladas com sucesso usando pnpm!
    goto :end
)

echo.
echo ERRO: Nao foi possivel instalar as dependencias.
echo Verifique se Node.js esta instalado e tente novamente.
echo.

:end
pause

