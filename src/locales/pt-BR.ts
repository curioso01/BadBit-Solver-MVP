import type { Dictionary } from '@/types/i18n';

export const ptBR: Dictionary = {
  nav: { dashboard: 'Dashboard', import: 'Importar', hands: 'Mãos', settings: 'Configurações', logout: 'Sair' },
  auth: { title: 'BADBIT SOLVER', login: 'Entrar', signup: 'Cadastrar', email: 'Email', password: 'Senha' },
  dashboard: { title: 'Visão Geral', importedHands: 'Mãos importadas', sessions: 'Sessões', leak: 'Leak Finder' },
  import: { title: 'Importar Hand History', upload: 'Upload .txt', paste: 'Colar texto', submit: 'Processar' },
  settings: { title: 'Configurações', language: 'Idioma', theme: 'Tema', currency: 'Moeda', timezone: 'Fuso horário', save: 'Salvar alterações', saving: 'Salvando...', success: 'Configurações aplicadas com sucesso.', dateFormat: 'Formato de data', numberFormat: 'Formato numérico', noChanges: 'Sem mudanças pendentes.' },
  onboarding: {
    title: 'Bem-vindo ao BadBit Solver',
    steps: [
      { title: 'Importe suas mãos', description: 'Envie arquivos .txt ou cole o histórico de mãos para transformar sessões reais em análise estratégica.' },
      { title: 'Revise cada decisão', description: 'Use o replay visual para acompanhar ações street por street, entender o pot, stacks e showdown.' },
      { title: 'Encontre seus leaks', description: 'O sistema destaca padrões recorrentes, spots problemáticos e oportunidades claras de melhoria.' },
      { title: 'Estude com mais clareza', description: 'Dashboard, filtros e métricas ajudam você a transformar volume de mãos em decisões mais inteligentes.' },
      { title: 'Personalize sua experiência', description: 'Escolha idioma, tema, moeda e fuso horário para usar o BadBit Solver do seu jeito.' }
    ],
    next: 'Próximo', back: 'Voltar', skip: 'Pular', start: 'Começar agora'
  }
};
