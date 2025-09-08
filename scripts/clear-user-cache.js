// Script para limpar cache de usuários e forçar atualizações
// Execute este script no console do navegador para limpar dados antigos

console.log("🧹 Limpando cache de usuários...");

// Limpar dados antigos do localStorage
const keysToRemove = [
  'stl_club_modules',
  'stl_club_user',
  'stl-admin',
  'isAdminLoggedIn'
];

keysToRemove.forEach(key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
    console.log(`✅ Removido: ${key}`);
  }
});

// Limpar sessionStorage também
keysToRemove.forEach(key => {
  if (sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
    console.log(`✅ Removido do sessionStorage: ${key}`);
  }
});

console.log("🎉 Cache limpo! Recarregue a página para ver as atualizações.");
console.log("💡 Todos os usuários agora verão o mesmo conteúdo atualizado.");
