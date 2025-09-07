# Script para corrigir política de execução e executar o projeto
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   CORRIGINDO PROBLEMAS DO SITE STL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Criar arquivo .env.local
Write-Host "1. Criando arquivo .env.local..." -ForegroundColor Yellow
$envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ysslfjqratjaluyzposy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2xmanFyYXRqYWx1eXpwb3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzI1MzksImV4cCI6MjA3Mjg0ODUzOX0.yjVQGMNuMTOzchln1rHgjCRNWWBw3d3H01v6Vdz8acM
"@

$envContent | Out-File -FilePath ".env.local" -Encoding UTF8
Write-Host "Arquivo .env.local criado com sucesso!" -ForegroundColor Green
Write-Host ""

# 2. Instalar dependências
Write-Host "2. Instalando dependências..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "Dependências instaladas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro ao instalar dependências com npm" -ForegroundColor Red
    Write-Host "Tentando com yarn..." -ForegroundColor Yellow
    try {
        yarn install
        Write-Host "Dependências instaladas com sucesso usando yarn!" -ForegroundColor Green
    } catch {
        Write-Host "Erro ao instalar dependências" -ForegroundColor Red
    }
}
Write-Host ""

# 3. Iniciar servidor
Write-Host "3. Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
Write-Host "O site será aberto em http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
try {
    npm run dev
} catch {
    Write-Host "Erro ao iniciar o servidor" -ForegroundColor Red
}
