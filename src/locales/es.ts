import type { Dictionary } from '@/types/i18n';

export const es: Dictionary = {
  nav: { dashboard: 'Dashboard', import: 'Importar', hands: 'Manos', settings: 'Configuración', logout: 'Cerrar sesión' },
  auth: { title: 'BADBIT SOLVER', login: 'Entrar', signup: 'Registro', email: 'Email', password: 'Contraseña' },
  dashboard: { title: 'Resumen', importedHands: 'Manos importadas', sessions: 'Sesiones', leak: 'Leak Finder' },
  import: { title: 'Importar Hand History', upload: 'Subir .txt', paste: 'Pegar texto', submit: 'Procesar' },
  settings: { title: 'Configuración', language: 'Idioma', theme: 'Tema', currency: 'Moneda', timezone: 'Zona horaria' },
  onboarding: {
    title: 'Bienvenido a BadBit Solver',
    steps: [
      { title: 'Importa tus manos', description: 'Sube archivos .txt o pega tu historial de manos para convertir sesiones reales en análisis estratégico.' },
      { title: 'Revisa cada decisión', description: 'Usa el replay visual para seguir cada acción calle por calle y entender el bote, stacks y showdown.' },
      { title: 'Detecta tus leaks', description: 'El sistema resalta patrones repetitivos, spots problemáticos y oportunidades claras de mejora.' },
      { title: 'Estudia con más claridad', description: 'Dashboard, filtros y métricas te ayudan a convertir volumen de manos en mejores decisiones.' },
      { title: 'Personaliza tu experiencia', description: 'Elige idioma, tema, moneda y zona horaria para usar BadBit Solver a tu manera.' }
    ],
    next: 'Siguiente', back: 'Atrás', skip: 'Omitir', start: 'Comenzar ahora'
  }
};
