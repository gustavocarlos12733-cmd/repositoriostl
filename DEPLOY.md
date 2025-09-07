# 🚀 GUIA DE DEPLOY - STL CLUB MEMBERS

## Opção 1: Vercel (RECOMENDADO - GRÁTIS)

### Passo 1: Preparar o Projeto
1. Crie uma conta no [GitHub](https://github.com)
2. Crie um novo repositório
3. Faça upload dos arquivos do projeto

### Passo 2: Deploy na Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign up" e conecte com GitHub
3. Clique em "New Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ysslfjqratjaluyzposy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2xmanFyYXRqYWx1eXpwb3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzI1MzksImV4cCI6MjA3Mjg0ODUzOX0.yjVQGMNuMTOzchln1rHgjCRNWWBw3d3H01v6Vdz8acM
   ```
6. Clique em "Deploy"
7. Aguarde o build (2-3 minutos)
8. Seu site estará online!

### Vantagens da Vercel:
- ✅ Grátis para projetos pessoais
- ✅ Deploy automático
- ✅ Otimizado para Next.js
- ✅ HTTPS automático
- ✅ CDN global

## Opção 2: Hostinger VPS

### Requisitos:
- Plano VPS da Hostinger
- Node.js instalado
- PM2 para gerenciar processos

### Passo a Passo:
1. **Acesse seu VPS** via SSH
2. **Instale Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Faça upload dos arquivos** via FTP/SFTP
4. **Instale dependências:**
   ```bash
   npm install
   ```
5. **Configure variáveis de ambiente:**
   ```bash
   export NEXT_PUBLIC_SUPABASE_URL="https://ysslfjqratjaluyzposy.supabase.co"
   export NEXT_PUBLIC_SUPABASE_ANON_KEY="sua_chave_aqui"
   ```
6. **Instale PM2:**
   ```bash
   npm install -g pm2
   ```
7. **Inicie o projeto:**
   ```bash
   npm run build
   pm2 start npm --name "stl-club" -- start
   pm2 save
   pm2 startup
   ```

## Opção 3: Netlify (Alternativa)

1. Acesse [netlify.com](https://netlify.com)
2. Conecte com GitHub
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Configure variáveis de ambiente
5. Deploy!

## 🔧 Configurações Importantes

### Variáveis de Ambiente (OBRIGATÓRIAS):
```
NEXT_PUBLIC_SUPABASE_URL=https://ysslfjqratjaluyzposy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2xmanFyYXRqYWx1eXpwb3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzI1MzksImV4cCI6MjA3Mjg0ODUzOX0.yjVQGMNuMTOzchln1rHgjCRNWWBw3d3H01v6Vdz8acM
```

### Arquivos Importantes:
- `app/page.tsx` - Página principal
- `app/layout.tsx` - Layout global
- `middleware.ts` - Autenticação
- `package.json` - Dependências

## 🎯 RECOMENDAÇÃO FINAL

**Use a Vercel!** É a opção mais fácil e eficiente para sites Next.js:
- Deploy em 2 minutos
- Grátis
- Automático
- Otimizado

Seu site ficará com uma URL como: `https://seu-projeto.vercel.app`
