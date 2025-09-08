-- Inserir módulos STL iniciais
INSERT INTO public.modules (id, title, category, description, content, stl_files) VALUES
('stl-zodiaco', 'STL ZODÍACO', 'ARQUIVOS STL', 'Modelos 3D dos signos do zodíaco com detalhes únicos', 
'Bem-vindo ao módulo STL ZODÍACO!

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

Explore cada arquivo e encontre o signo perfeito para sua coleção!',
'[{"name": "Aries.stl", "size": "2.5MB"}, {"name": "Touro.stl", "size": "2.8MB"}, {"name": "Gemeos.stl", "size": "2.3MB"}]'::jsonb),

('stl-desenhos-gerais', 'STL DESENHOS GERAIS', 'ARQUIVOS STL', 'Coleção diversificada de modelos para impressão 3D',
'Módulo com desenhos variados para todas as ocasiões!

CATEGORIAS INCLUÍDAS:
• Decoração
• Utilitários
• Brinquedos
• Arte
• Ferramentas

Mais de 50 modelos únicos esperando por você!',
'[{"name": "Vaso_Decorativo.stl", "size": "1.8MB"}, {"name": "Porta_Canetas.stl", "size": "1.2MB"}]'::jsonb),

('stl-mini-mundo', 'STL MINI MUNDO', 'ARQUIVOS STL', 'Miniaturas e cenários em escala reduzida',
'Crie seu próprio mini mundo com estes modelos incríveis!

CONTEÚDO:
• Casas em miniatura
• Veículos
• Personagens
• Paisagens
• Acessórios

Perfeito para dioramas e coleções!',
'[{"name": "Casa_Medieval.stl", "size": "3.2MB"}, {"name": "Carro_Vintage.stl", "size": "2.1MB"}]'::jsonb),

('stl-rpg', 'STL RPG', 'ARQUIVOS STL', 'Modelos para jogos de RPG e mesa',
'Aventure-se no mundo dos RPGs com estes modelos!

INCLUI:
• Personagens
• Monstros
• Cenários
• Acessórios
• Dados customizados

Ideal para D&D e outros sistemas!',
'[{"name": "Guerreiro_Elfo.stl", "size": "2.9MB"}, {"name": "Dragao_Vermelho.stl", "size": "4.1MB"}]'::jsonb),

('stl-personalidades', 'STL PERSONALIDADES E CELEBRIDADES', 'ARQUIVOS STL', 'Bustos e figuras de personalidades famosas',
'Homenageie suas personalidades favoritas!

CATEGORIAS:
• Artistas
• Cientistas
• Líderes históricos
• Celebridades
• Personagens ficcionais

Modelos de alta qualidade e detalhamento!',
'[{"name": "Einstein_Busto.stl", "size": "3.5MB"}, {"name": "Da_Vinci.stl", "size": "3.8MB"}]'::jsonb),

('stl-cenarios', 'STL CENÁRIOS', 'ARQUIVOS STL', 'Cenários completos para suas criações',
'Construa cenários incríveis para suas histórias!

TIPOS DE CENÁRIOS:
• Medievais
• Futuristas
• Naturais
• Urbanos
• Fantásticos

Combine com outros módulos para criar mundos únicos!',
'[{"name": "Castelo_Completo.stl", "size": "8.2MB"}, {"name": "Floresta_Magica.stl", "size": "6.5MB"}]'::jsonb),

('stl-religiao-urbana', 'STL RELIGIÃO URBANA', 'ARQUIVOS STL', 'Elementos religiosos e espirituais urbanos',
'Explore a espiritualidade através da arte 3D!

CONTEÚDO:
• Símbolos religiosos
• Arquitetura sagrada
• Arte devocional
• Elementos decorativos
• Peças colecionáveis

Respeito e arte em cada modelo!',
'[{"name": "Cruz_Ornamentada.stl", "size": "2.2MB"}, {"name": "Mandala_3D.stl", "size": "1.9MB"}]'::jsonb);

-- Criar usuário admin padrão se não existir
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE email = 'admin@clubestl.com') THEN
    -- Nota: O usuário admin deve ser criado através do sistema de auth do Supabase
    -- Este é apenas um placeholder para referência
    NULL;
  END IF;
END $$;
