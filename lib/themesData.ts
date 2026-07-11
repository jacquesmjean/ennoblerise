import type { Locale } from './i18n';

export type MonthTheme = { month: string; theme: string; note: string };

export type ThemesContent = {
  kicker: string;
  title: string;
  intro: string;
  currentLabel: string;
  themes: MonthTheme[]; // index 0 = 2026-03
};

// First theme month: March 2026 (index 0). Month key = 2026-03 + index.
export const THEMES_START = { year: 2026, month: 3 };

export const themesData: Record<Locale, ThemesContent> = {
  en: {
    kicker: 'A rhythm for the rise',
    title: 'Monthly themes',
    intro:
      'Each month, our community — families, classrooms, and women leaders across 8+ countries — reflects, writes, and acts around one shared human theme.',
    currentLabel: 'This month',
    themes: [
      { month: 'March 2026', theme: 'Courage', note: 'Spring energy inspires bravery to face challenges — and to stand up for kindness.' },
      { month: 'April 2026', theme: 'Mindfulness', note: 'A time for awareness and renewal, at home and in classrooms.' },
      { month: 'May 2026', theme: 'Kindness', note: 'Teacher Appreciation Month — caring actions that strengthen communities.' },
      { month: 'June 2026', theme: 'Connection', note: 'Family bonds, teamwork, and community ties as summer begins.' },
      { month: 'July 2026', theme: 'Joy', note: 'A midyear celebration of positivity — and of modeling emotional balance.' },
      { month: 'August 2026', theme: 'Growth', note: 'Back-to-school: learning, progress, and adaptability.' },
      { month: 'September 2026', theme: 'Responsibility', note: 'Accountability, leadership, and community contribution.' },
      { month: 'October 2026', theme: 'Compassion', note: 'Emotional intelligence through caring actions and listening.' },
      { month: 'November 2026', theme: 'Gratitude', note: 'Appreciation in families, classrooms, and workplaces.' },
      { month: 'December 2026', theme: 'Hope', note: 'Closing the year with purpose, unity, and renewal.' },
      { month: 'January 2027', theme: 'Optimism', note: 'A hopeful start — growth mindset and resilience for all ages.' },
      { month: 'February 2027', theme: 'Love', note: 'A month of love, in every language and every home.' },
      { month: 'March 2027', theme: 'Empathy', note: 'Deepening understanding and compassion — the core of healthy relationships.' },
      { month: 'April 2027', theme: 'Unity', note: 'Together we rise — connection across classrooms, communities, and generations.' },
    ],
  },
  fr: {
    kicker: "Un rythme pour l'élan",
    title: 'Thèmes mensuels',
    intro:
      'Chaque mois, notre communauté — familles, salles de classe et femmes leaders dans plus de 8 pays — réfléchit, écrit et agit autour d’un même thème humain.',
    currentLabel: 'Ce mois-ci',
    themes: [
      { month: 'Mars 2026', theme: 'Courage', note: "L'énergie du printemps inspire la bravoure — et la défense de la bonté." },
      { month: 'Avril 2026', theme: 'Pleine conscience', note: 'Un temps de conscience et de renouveau, à la maison comme en classe.' },
      { month: 'Mai 2026', theme: 'Bonté', note: 'Mois de reconnaissance des enseignants — des gestes qui renforcent les communautés.' },
      { month: 'Juin 2026', theme: 'Connexion', note: "Liens familiaux, esprit d'équipe et liens communautaires au début de l'été." },
      { month: 'Juillet 2026', theme: 'Joie', note: "Une célébration de la positivité — et de l'équilibre émotionnel." },
      { month: 'Août 2026', theme: 'Croissance', note: 'La rentrée : apprentissage, progrès et adaptabilité.' },
      { month: 'Septembre 2026', theme: 'Responsabilité', note: 'Responsabilité, leadership et contribution à la communauté.' },
      { month: 'Octobre 2026', theme: 'Compassion', note: "L'intelligence émotionnelle par l'écoute et les gestes attentionnés." },
      { month: 'Novembre 2026', theme: 'Gratitude', note: "L'appréciation dans les familles, les classes et le travail." },
      { month: 'Décembre 2026', theme: 'Espoir', note: "Clore l'année avec sens, unité et renouveau." },
      { month: 'Janvier 2027', theme: 'Optimisme', note: "Un départ plein d'espoir — état d'esprit de croissance et résilience." },
      { month: 'Février 2027', theme: 'Amour', note: "Un mois d'amour, dans toutes les langues et tous les foyers." },
      { month: 'Mars 2027', theme: 'Empathie', note: 'Approfondir la compréhension et la compassion.' },
      { month: 'Avril 2027', theme: 'Unité', note: "Ensemble nous nous élevons — entre classes, communautés et générations." },
    ],
  },
  es: {
    kicker: 'Un ritmo para el ascenso',
    title: 'Temas mensuales',
    intro:
      'Cada mes, nuestra comunidad — familias, aulas y mujeres líderes en más de 8 países — reflexiona, escribe y actúa en torno a un mismo tema humano.',
    currentLabel: 'Este mes',
    themes: [
      { month: 'Marzo 2026', theme: 'Valentía', note: 'La energía de la primavera inspira valor — y defender la bondad.' },
      { month: 'Abril 2026', theme: 'Atención plena', note: 'Un tiempo de conciencia y renovación, en casa y en el aula.' },
      { month: 'Mayo 2026', theme: 'Bondad', note: 'Mes de aprecio docente — acciones de cuidado que fortalecen comunidades.' },
      { month: 'Junio 2026', theme: 'Conexión', note: 'Lazos familiares, trabajo en equipo y comunidad al iniciar el verano.' },
      { month: 'Julio 2026', theme: 'Alegría', note: 'Una celebración de la positividad — y del equilibrio emocional.' },
      { month: 'Agosto 2026', theme: 'Crecimiento', note: 'Regreso a clases: aprendizaje, progreso y adaptabilidad.' },
      { month: 'Septiembre 2026', theme: 'Responsabilidad', note: 'Responsabilidad, liderazgo y contribución comunitaria.' },
      { month: 'Octubre 2026', theme: 'Compasión', note: 'Inteligencia emocional a través del cuidado y la escucha.' },
      { month: 'Noviembre 2026', theme: 'Gratitud', note: 'Aprecio en familias, aulas y lugares de trabajo.' },
      { month: 'Diciembre 2026', theme: 'Esperanza', note: 'Cerrar el año con propósito, unidad y renovación.' },
      { month: 'Enero 2027', theme: 'Optimismo', note: 'Un inicio esperanzador — mentalidad de crecimiento y resiliencia.' },
      { month: 'Febrero 2027', theme: 'Amor', note: 'Un mes de amor, en todos los idiomas y todos los hogares.' },
      { month: 'Marzo 2027', theme: 'Empatía', note: 'Profundizar la comprensión y la compasión.' },
      { month: 'Abril 2027', theme: 'Unidad', note: 'Juntos nos elevamos — entre aulas, comunidades y generaciones.' },
    ],
  },
};

export function currentThemeIndex(now: Date): number {
  const idx = (now.getFullYear() - THEMES_START.year) * 12 + (now.getMonth() + 1 - THEMES_START.month);
  return Math.max(0, Math.min(idx, 13));
}
