@echo off
echo ========================================
echo   CORRIGINDO PROBLEMAS DO SITE STL
echo ========================================
echo.

echo 1. Criando arquivo .env.local...
echo # Supabase Configuration > .env.local
echo NEXT_PUBLIC_SUPABASE_URL=https://ysslfjqratjaluyzposy.supabase.co >> .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2xmanFyYXRqYWx1eXpwb3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzI1MzksImV4cCI6MjA3Mjg0ODUzOX0.yjVQGMNuMTOzchln1rHgjCRNWWBw3d3H01v6Vdz8acM >> .env.local
echo Arquivo .env.local criado com sucesso!
echo.

echo 2. Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias com npm
    echo Tentando com yarn...
    call yarn install
    if %errorlevel% neq 0 (
        echo Erro ao instalar dependencias com yarn
        echo Tentando com pnpm...
        call pnpm install
    )
)
echo.

echo 3. Iniciando o servidor de desenvolvimento...
echo O site sera aberto em http://localhost:3000
echo.
call npm run dev

pause
