# 🚀 GUIA COMPLETO - UPLOAD PARA SEU GITHUB

## 📋 **PASSO A PASSO COMPLETO:**

### **1. CRIAR REPOSITÓRIO NO GITHUB**

1. **Acesse:** [github.com](https://github.com)
2. **Faça login** com sua conta
3. **Clique no botão verde** "New" ou "+" → "New repository"
4. **Preencha:**
   - Repository name: `stl-club-members`
   - Description: `Site do Clube STL - Área de Membros`
   - Marque **"Public"** ou **"Private"** (sua escolha)
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore"
   - **NÃO marque** "Choose a license"
5. **Clique em** "Create repository"

### **2. EXECUTAR O SCRIPT DE UPLOAD**

1. **Execute o arquivo:** `upload-github-simples.bat`
2. **Digite seu nome de usuário** do GitHub quando solicitado
3. **Digite seu email** do GitHub quando solicitado
4. **Aguarde** o processo de upload

### **3. VERIFICAR O UPLOAD**

1. **Acesse:** `https://github.com/SEU_USUARIO/stl-club-members`
2. **Verifique** se todos os arquivos estão lá
3. **Confirme** que não há arquivos grandes (como `node_modules`)

## 🔧 **SE DER ERRO - SOLUÇÕES:**

### **Erro: "Repository not found"**
- Verifique se o repositório foi criado no GitHub
- Confirme o nome de usuário digitado

### **Erro: "Permission denied"**
- Verifique se você tem permissão no repositório
- Confirme se está logado na conta correta

### **Erro: "Large file detected"**
- O `.gitignore` já está configurado para evitar isso
- Se ainda der erro, execute: `git rm --cached node_modules/`

## 🎯 **APÓS O UPLOAD BEM-SUCEDIDO:**

### **1. DEPLOY NA VERCEL (RECOMENDADO)**

1. **Acesse:** [vercel.com](https://vercel.com)
2. **Clique em** "Sign up" e conecte com GitHub
3. **Clique em** "New Project"
4. **Selecione** o repositório `stl-club-members`
5. **Configure as variáveis de ambiente:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://ysslfjqratjaluyzposy.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlzc2xmanFyYXRqYWx1eXpwb3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzI1MzksImV4cCI6MjA3Mjg0ODUzOX0.yjVQGMNuMTOzchln1rHgjCRNWWBw3d3H01v6Vdz8acM
   ```
6. **Clique em** "Deploy"
7. **Aguarde** 2-3 minutos
8. **Seu site estará online!**

### **2. CONFIGURAR DOMÍNIO PERSONALIZADO (OPCIONAL)**

1. Na Vercel, vá para **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções

## 📁 **ARQUIVOS QUE SERÃO ENVIADOS:**

✅ **Incluídos:**
- `app/` - Páginas do site
- `components/` - Componentes React
- `lib/` - Bibliotecas e configurações
- `public/` - Imagens e arquivos estáticos
- `package.json` - Dependências
- `.gitignore` - Exclusões
- `env.example` - Exemplo de variáveis

❌ **Excluídos (automaticamente):**
- `node_modules/` - Dependências (muito grande)
- `.next/` - Arquivos temporários
- `.env.local` - Credenciais (segurança)

## 🚨 **IMPORTANTE:**

- ✅ **Repositório criado** no GitHub
- ✅ **Script executado** com suas credenciais
- ✅ **Arquivos enviados** sem problemas
- ✅ **Pronto para deploy** na Vercel

## 📞 **SUPORTE:**

Se ainda tiver problemas:
1. Verifique se o repositório existe no GitHub
2. Confirme o nome de usuário e email
3. Execute o script novamente
4. Se persistir, use o upload manual no GitHub

**Seu site estará online em poucos minutos!** 🎉
