-- Inserir módulos STL iniciais
INSERT INTO public.modules (title, description, category, content, order_index) VALUES
('STL ZODÍACO', 'Modelos 3D dos signos do zodíaco para impressão', 'ARQUIVOS STL', 'Coleção completa de modelos 3D dos 12 signos do zodíaco, perfeitos para decoração e presentes personalizados.', 1),
('STL DESENHOS GERAIS', 'Diversos modelos 3D para impressão geral', 'ARQUIVOS STL', 'Ampla variedade de modelos 3D para diferentes propósitos e aplicações.', 2),
('STL MINI MUNDO', 'Modelos em miniatura para colecionadores', 'ARQUIVOS STL', 'Modelos detalhados em miniatura para criar seu próprio mini mundo.', 3),
('STL RPG', 'Modelos para jogos de RPG e tabuleiro', 'ARQUIVOS STL', 'Personagens, criaturas e acessórios para seus jogos de RPG favoritos.', 4),
('STL PERSONALIDADES E CELEBRIDADES', 'Modelos de figuras famosas', 'ARQUIVOS STL', 'Bustos e figuras de personalidades e celebridades para coleção.', 5),
('STL CENÁRIOS', 'Cenários e ambientes para dioramas', 'ARQUIVOS STL', 'Cenários detalhados para criar dioramas impressionantes.', 6),
('STL RELIGIÃO URBANA', 'Modelos com temática religiosa urbana', 'ARQUIVOS STL', 'Modelos inspirados na religiosidade urbana e cultura popular.', 7);

-- Inserir um usuário admin padrão (será criado quando alguém se registrar com este email)
-- Nota: O usuário real será criado via auth, esta é apenas a estrutura
