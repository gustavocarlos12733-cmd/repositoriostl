@echo off
echo ========================================
echo   UPLOAD PARA SEU GITHUB
echo ========================================
echo.

echo Digite seu nome de usuario do GitHub:
set /p GITHUB_USER=

echo.
echo Digite seu email do GitHub:
set /p GITHUB_EMAIL=

echo.
echo Configurando Git com suas credenciais...
git config --global user.name "%GITHUB_USER%"
git config --global user.email "%GITHUB_EMAIL%"

echo.
echo ========================================
echo   IMPORTANTE: CRIE O REPOSITORIO PRIMEIRO
echo ========================================
echo.
echo 1. Acesse: https://github.com/new
echo 2. Nome do repositorio: stl-club-members
echo 3. Descricao: Site do Clube STL - Area de Membros
echo 4. Marque "Public" ou "Private"
echo 5. NAO marque "Add a README file"
echo 6. Clique em "Create repository"
echo.
echo Apos criar o repositorio, pressione qualquer tecla para continuar...
pause

echo.
echo Conectando com seu repositorio...
git remote add origin https://github.com/%GITHUB_USER%/stl-club-members.git
if %errorlevel% neq 0 (
    echo Removendo conexao existente...
    git remote remove origin
    git remote add origin https://github.com/%GITHUB_USER%/stl-club-members.git
)

echo.
echo Fazendo upload dos arquivos...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCESSO! ARQUIVOS ENVIADOS!
    echo ========================================
    echo.
    echo Seu repositorio: https://github.com/%GITHUB_USER%/stl-club-members
    echo.
    echo PROXIMOS PASSOS:
    echo 1. Acesse o link acima para verificar
    echo 2. Vá para vercel.com
    echo 3. Conecte com GitHub
    echo 4. Importe o repositorio stl-club-members
    echo 5. Configure as variaveis de ambiente
    echo 6. Deploy automatico!
) else (
    echo.
    echo ========================================
    echo   ERRO NO UPLOAD
    echo ========================================
    echo.
    echo Verifique:
    echo 1. Se o repositorio foi criado no GitHub
    echo 2. Se o nome de usuario esta correto
    echo 3. Se voce tem permissao no repositorio
    echo.
    echo Tente novamente ou crie o repositorio manualmente.
)

echo.
pause
