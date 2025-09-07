@echo off
echo ========================================
echo   UPLOAD AUTOMATICO PARA GITHUB
echo ========================================
echo.

echo 1. Verificando se o Git esta configurado...
git config --global user.name
if %errorlevel% neq 0 (
    echo Configurando Git...
    git config --global user.name "STL Club"
    git config --global user.email "admin@clubestl.com"
)

echo.
echo 2. Criando repositorio no GitHub...
echo IMPORTANTE: Voce precisa ter uma conta no GitHub e estar logado!
echo.

echo 3. Fazendo push para o GitHub...
echo Digite seu nome de usuario do GitHub:
set /p GITHUB_USER=

echo.
echo Criando repositorio remoto...
git remote add origin https://github.com/%GITHUB_USER%/stl-club-members.git
if %errorlevel% neq 0 (
    echo Removendo remote existente...
    git remote remove origin
    git remote add origin https://github.com/%GITHUB_USER%/stl-club-members.git
)

echo.
echo Fazendo push dos arquivos...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   UPLOAD CONCLUIDO COM SUCESSO!
    echo ========================================
    echo.
    echo Seu repositorio esta disponivel em:
    echo https://github.com/%GITHUB_USER%/stl-club-members
    echo.
    echo Proximos passos:
    echo 1. Acesse o link acima
    echo 2. Vá para Vercel.com
    echo 3. Conecte com GitHub
    echo 4. Importe o repositorio
    echo 5. Configure as variaveis de ambiente
    echo 6. Deploy!
) else (
    echo.
    echo ========================================
    echo   ERRO NO UPLOAD
    echo ========================================
    echo.
    echo Possiveis causas:
    echo 1. Repositorio nao existe no GitHub
    echo 2. Problema de autenticacao
    echo 3. Nome de usuario incorreto
    echo.
    echo Solucao:
    echo 1. Crie o repositorio manualmente no GitHub
    echo 2. Nome: stl-club-members
    echo 3. Execute este script novamente
)

echo.
pause
