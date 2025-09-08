export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  isAdmin?: boolean
  joinedAt: string
}

export interface Module {
  id: string
  title: string
  category: string
  description: string
  content: string
  isCompleted: boolean
  progress: number
  comments: Comment[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export const AUTH_STORAGE_KEY = "stl_club_user"
export const MODULES_STORAGE_KEY = "stl_club_modules"
export const ADMIN_EMAIL = "admin@clubestl.com"

export function saveUser(user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error("Erro ao ler usuário do localStorage:", error)
    return null
  }
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function loginUser(name: string, email: string): User {
  const user: User = {
    id: Date.now().toString(),
    name,
    email,
    isAdmin: email === ADMIN_EMAIL,
    joinedAt: new Date().toISOString(),
  }
  saveUser(user)
  return user
}

// Módulos iniciais do sistema
export const initialModules: Omit<Module, "isCompleted" | "progress" | "comments">[] = [
  {
    id: "stl-zodiaco",
    title: "STL ZODÍACO",
    category: "ARQUIVOS STL",
    description: "Modelos 3D dos signos do zodíaco com detalhes únicos",
    content: `Bem-vindo ao módulo STL ZODÍACO!

Este módulo contém modelos 3D exclusivos de todos os 12 signos do zodíaco, criados especialmente para impressão 3D.

CONTEÚDO INCLUÍDO:
• Modelos de todos os 12 signos
• Versões em diferentes tamanhos
• Suportes otimizados para impressão
• Manual de impressão detalhado

ESPECIFICAÇÕES TÉCNICAS:
• Formato: STL
• Resolução: Alta definição
• Compatibilidade: Todas as impressoras FDM/SLA
• Altura recomendada: 10-20cm

DICAS DE IMPRESSÃO:
• Use PLA ou PETG para melhores resultados
• Velocidade: 50mm/s
• Preenchimento: 15-20%
• Suporte: Necessário para alguns modelos

Explore cada arquivo e encontre o signo perfeito para sua coleção!`,
  },
  {
    id: "stl-desenhos-gerais",
    title: "STL DESENHOS GERAIS",
    category: "ARQUIVOS STL",
    description: "Coleção diversificada de desenhos e modelos para impressão 3D",
    content: `Módulo STL DESENHOS GERAIS

Uma coleção variada de modelos 3D para diferentes propósitos e gostos.

CATEGORIAS INCLUÍDAS:
• Decoração doméstica
• Utilitários práticos
• Arte e esculturas
• Brinquedos e jogos
• Acessórios diversos

DESTAQUES:
• Mais de 50 modelos únicos
• Diferentes níveis de complexidade
• Projetos para iniciantes e avançados
• Tutoriais de impressão inclusos

Perfeito para quem quer diversificar sua biblioteca de impressões 3D!`,
  },
  {
    id: "stl-mini-mundo",
    title: "STL MINI MUNDO",
    category: "ARQUIVOS STL",
    description: "Crie mundos em miniatura com cenários detalhados",
    content: `STL MINI MUNDO - Construa Universos em Miniatura

Transforme sua impressora 3D em uma fábrica de mundos fantásticos!

CONTEÚDO:
• Casas e construções
• Árvores e vegetação
• Personagens e animais
• Veículos em miniatura
• Acessórios de cenário

ESCALAS DISPONÍVEIS:
• 1:87 (HO)
• 1:64 (S)
• 1:48 (O)
• Escalas customizáveis

PROJETOS SUGERIDOS:
• Dioramas temáticos
• Maquetes arquitetônicas
• Cenários para fotografia
• Mundos de fantasia

Crie histórias incríveis com estes modelos detalhados!`,
  },
  {
    id: "stl-rpg",
    title: "STL RPG",
    category: "ARQUIVOS STL",
    description: "Modelos épicos para seus jogos de RPG de mesa",
    content: `STL RPG - Aventuras Épicas Aguardam!

Eleve suas sessões de RPG com modelos 3D impressionantes.

PERSONAGENS:
• Guerreiros e paladinos
• Magos e feiticeiros
• Ladinos e rangers
• Clérigos e druidas
• Raças fantásticas

CRIATURAS:
• Dragões em várias poses
• Monstros clássicos
• Bestas selvagens
• Mortos-vivos
• Elementais

CENÁRIOS:
• Masmorras modulares
• Torres e castelos
• Florestas encantadas
• Tavernas e lojas

ACESSÓRIOS:
• Dados personalizados
• Marcadores de status
• Tesouros e artefatos

Transforme suas aventuras em experiências inesquecíveis!`,
  },
  {
    id: "stl-personalidades",
    title: "STL PERSONALIDADES E CELEBRIDADES",
    category: "ARQUIVOS STL",
    description: "Modelos inspirados em personalidades famosas",
    content: `STL PERSONALIDADES E CELEBRIDADES

Coleção especial de modelos inspirados em figuras icônicas.

CATEGORIAS:
• Ícones do cinema
• Lendas da música
• Personalidades históricas
• Figuras contemporâneas
• Personagens fictícios famosos

ESTILOS DISPONÍVEIS:
• Bustos detalhados
• Figuras completas
• Versões estilizadas
• Miniaturas colecionáveis

NOTA IMPORTANTE:
Todos os modelos são interpretações artísticas originais, criadas para fins educacionais e de entretenimento.

QUALIDADE:
• Alta resolução
• Detalhes faciais precisos
• Múltiplas poses
• Diferentes escalas

Crie sua galeria de personalidades favoritas!`,
  },
  {
    id: "stl-cenarios",
    title: "STL CENÁRIOS",
    category: "ARQUIVOS STL",
    description: "Cenários e ambientes detalhados para suas criações",
    content: `STL CENÁRIOS - Construa Mundos Completos

Ambientes detalhados para dar vida às suas histórias.

AMBIENTES URBANOS:
• Prédios e arranha-céus
• Ruas e calçadas
• Parques e praças
• Lojas e estabelecimentos

AMBIENTES NATURAIS:
• Montanhas e colinas
• Rios e lagos
• Florestas densas
• Desertos e oásis

AMBIENTES FANTÁSTICOS:
• Castelos medievais
• Ruínas antigas
• Portais mágicos
• Cidades flutuantes

CARACTERÍSTICAS:
• Modelos modulares
• Fácil montagem
• Escalas compatíveis
• Texturas detalhadas

Crie o cenário perfeito para suas aventuras!`,
  },
  {
    id: "stl-religiao-urbana",
    title: "STL RELIGIÃO URBANA",
    category: "ARQUIVOS STL",
    description: "Modelos relacionados à espiritualidade urbana contemporânea",
    content: `STL RELIGIÃO URBANA

Expressões artísticas da espiritualidade moderna.

ELEMENTOS INCLUÍDOS:
• Símbolos sagrados
• Altares modernos
• Elementos decorativos
• Peças meditativas
• Arte espiritual

ESTILOS:
• Minimalista contemporâneo
• Fusão tradicional-moderno
• Arte urbana sacra
• Design conceitual

APLICAÇÕES:
• Decoração de ambientes
• Peças para meditação
• Arte conceitual
• Projetos pessoais

FILOSOFIA:
Conectando tradições ancestrais com a vida urbana moderna, criando pontes entre o sagrado e o cotidiano.

MATERIAIS RECOMENDADOS:
• PLA para detalhes finos
• PETG para durabilidade
• Resina para alta definição

Explore a espiritualidade através da arte 3D!`,
  },
]

export function getModules(): Module[] {
  // Sempre retornar os módulos atualizados do servidor
  // Removendo dependência do localStorage para garantir que todos vejam as atualizações
  return initialModules.map((module) => ({
    ...module,
    isCompleted: false,
    progress: 0,
    comments: [],
  }))
}

export function updateModule(moduleId: string, updates: Partial<Module>): void {
  // Esta função agora é apenas para compatibilidade
  // O progresso real dos usuários deve ser gerenciado pelo Supabase
  console.log(`updateModule chamado para ${moduleId}:`, updates)
}

// Helpers de fallback local
export function markModuleCompleted(moduleId: string): void {
  updateModule(moduleId, { isCompleted: true, progress: 100 })
}

export function addLocalComment(
  moduleId: string,
  comment: Omit<Comment, "id"> & { id?: string }
): void {
  // Esta função agora é apenas para compatibilidade
  // Os comentários reais devem ser gerenciados pelo Supabase
  console.log(`addLocalComment chamado para ${moduleId}:`, comment)
}

// Função para limpar dados antigos do localStorage
export function clearOldLocalData(): void {
  if (typeof window === "undefined") return
  try {
    // Limpar dados antigos de módulos para forçar recarregamento
    localStorage.removeItem(MODULES_STORAGE_KEY)
    console.log("Dados antigos do localStorage limpos - módulos serão recarregados")
  } catch (error) {
    console.error("Erro ao limpar dados antigos:", error)
  }
}