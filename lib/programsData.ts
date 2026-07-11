import type { Locale } from './i18n';

export type SignatureProgram = {
  key: 'youth' | 'educators' | 'women';
  name: string;
  academy: string;
  audience: string;
  purpose: string;
  pillars: { name: string; items: string[] }[];
  outcomes: string[];
  tagline: string;
};

export type ProgramsContent = {
  frameworkKicker: string;
  frameworkTitle: string;
  frameworkIntro: string;
  audienceLabel: string;
  purposeLabel: string;
  pillarsLabel: string;
  outcomesLabel: string;
  ecosystemTitle: string;
  ecosystemLines: string[];
  ecosystemBody: string;
  programs: SignatureProgram[];
};

export const programsData: Record<Locale, ProgramsContent> = {
  en: {
    frameworkKicker: 'The EnnobleRise signature program framework',
    frameworkTitle: 'Building emotionally resilient, financially empowered, and conscious leaders',
    frameworkIntro:
      'True leadership extends beyond academic achievement or economic advancement. Our signature programs ennoble the whole person — equipping each participant with emotional resilience, financial intelligence, and conscious leadership so that success becomes a catalyst for uplifting others.',
    audienceLabel: 'Who it serves',
    purposeLabel: 'Purpose',
    pillarsLabel: 'Core pillars',
    outcomesLabel: 'Outcomes',
    ecosystemTitle: 'The EnnobleRise Ecosystem Model',
    ecosystemLines: [
      'Youth are inspired by Educators.',
      'Educators are strengthened by Women.',
      'Women empower Families.',
      'Families nurture Youth.',
    ],
    ecosystemBody:
      'Together, these interconnected programs create a self-sustaining ecosystem of emotional resilience, financial empowerment, and conscious leadership — elevating individuals, strengthening communities, and cultivating the ennobled future our world needs.',
    programs: [
      {
        key: 'youth',
        name: 'Ennobled Futures™',
        academy: 'Youth Leadership & Life Readiness Academy',
        audience: 'Middle school, high school, and college students, and emerging young adults',
        purpose:
          'To equip youth with the emotional resilience, financial intelligence, and conscious leadership skills to thrive in a rapidly changing world — becoming compassionate leaders who positively influence their communities.',
        pillars: [
          { name: 'Emotional Resilience', items: ['Emotional intelligence and self-awareness', 'Stress management and mindfulness', 'Healthy relationships and communication', 'Growth mindset and mental wellness'] },
          { name: 'Financial Resilience', items: ['Financial literacy fundamentals', 'Saving, budgeting, and investing', 'Entrepreneurship and innovation', 'Wealth-building and responsible decisions'] },
          { name: 'Conscious Leadership', items: ['Character and values-based leadership', 'Service learning and civic engagement', 'Ethical decision-making and collaboration', 'Global citizenship and cultural intelligence'] },
        ],
        outcomes: ['Increased emotional well-being and confidence', 'Stronger financial decision-making', 'Community engagement projects', 'Youth leadership certification'],
        tagline: "Preparing today's youth to become tomorrow's ennobled leaders.",
      },
      {
        key: 'educators',
        name: 'Ennobled Educators™',
        academy: 'Resilient Educator Leadership Institute',
        audience: 'Teachers, school administrators, counselors, coaches, and educational leaders',
        purpose:
          'To strengthen the emotional well-being, leadership effectiveness, and financial resilience of educators — empowering them to cultivate thriving learning environments.',
        pillars: [
          { name: 'Emotional Resilience', items: ['Preventing burnout and compassion fatigue', 'Trauma-informed leadership', 'Mindfulness and emotional regulation', 'Self-care and professional sustainability'] },
          { name: 'Financial Resilience', items: ['Personal financial wellness', 'Retirement and long-term planning', 'Resource stewardship and program sustainability', 'Grant and funding awareness'] },
          { name: 'Conscious Leadership', items: ['Transformational leadership practices', 'Inclusive and compassionate classrooms', 'Mentorship and student development', 'Building belonging and psychological safety'] },
        ],
        outcomes: ['Improved educator well-being', 'Reduced burnout risk', 'Increased student engagement', 'Stronger school cultures'],
        tagline: 'Empowering educators who shape the leaders of tomorrow.',
      },
      {
        key: 'women',
        name: 'Ennobled Women™',
        academy: 'Women Rising Leadership & Empowerment Collective',
        audience: 'Women professionals, mothers, entrepreneurs, community leaders, and emerging changemakers',
        purpose:
          'To empower women to strengthen their emotional resilience, financial independence, and conscious leadership capacity — becoming catalysts for thriving families, organizations, and communities.',
        pillars: [
          { name: 'Emotional Resilience', items: ['Healing, self-awareness, and self-worth', 'Navigating life transitions', 'Boundary setting and emotional wellness', 'Building supportive networks'] },
          { name: 'Financial Resilience', items: ['Financial literacy and wealth creation', 'Entrepreneurship and business growth', 'Investing and legacy planning', 'Career advancement and economic power'] },
          { name: 'Conscious Leadership', items: ['Purpose-driven leadership', 'Authentic influence and communication', 'Community impact and service', 'Mentoring the next generation'] },
        ],
        outcomes: ['Increased confidence and self-efficacy', 'Greater financial independence', 'Expanded leadership opportunities', "Women's leadership certification"],
        tagline: 'When women rise, families, communities, and nations rise.',
      },
    ],
  },
  fr: {
    frameworkKicker: 'Le cadre des programmes signature EnnobleRise',
    frameworkTitle: 'Former des leaders émotionnellement résilients, financièrement autonomes et conscients',
    frameworkIntro:
      "Le vrai leadership dépasse la réussite académique ou économique. Nos programmes signature ennoblissent la personne entière — dotant chaque participant de résilience émotionnelle, d'intelligence financière et de leadership conscient, pour que le succès devienne un levier d'élévation des autres.",
    audienceLabel: 'Pour qui',
    purposeLabel: 'Vocation',
    pillarsLabel: 'Piliers fondamentaux',
    outcomesLabel: 'Résultats',
    ecosystemTitle: "Le modèle d'écosystème EnnobleRise",
    ecosystemLines: [
      'Les jeunes sont inspirés par les éducateurs.',
      'Les éducateurs sont renforcés par les femmes.',
      'Les femmes élèvent les familles.',
      'Les familles nourrissent les jeunes.',
    ],
    ecosystemBody:
      "Ensemble, ces programmes interconnectés créent un écosystème auto-entretenu de résilience émotionnelle, d'autonomie financière et de leadership conscient — élevant les individus, renforçant les communautés et cultivant l'avenir ennobli dont notre monde a besoin.",
    programs: [
      {
        key: 'youth',
        name: 'Ennobled Futures™',
        academy: "Académie de leadership et de préparation à la vie pour la jeunesse",
        audience: 'Collégiens, lycéens, étudiants et jeunes adultes émergents',
        purpose:
          "Doter les jeunes de la résilience émotionnelle, de l'intelligence financière et du leadership conscient nécessaires pour s'épanouir dans un monde en mutation — et devenir des leaders compatissants qui influencent positivement leur communauté.",
        pillars: [
          { name: 'Résilience émotionnelle', items: ['Intelligence émotionnelle et conscience de soi', 'Gestion du stress et pleine conscience', 'Relations saines et communication', "État d'esprit de croissance et bien-être mental"] },
          { name: 'Résilience financière', items: ['Fondamentaux de la littératie financière', 'Épargne, budget et investissement', 'Entrepreneuriat et innovation', 'Création de richesse et décisions responsables'] },
          { name: 'Leadership conscient', items: ['Leadership fondé sur le caractère et les valeurs', 'Apprentissage par le service et engagement civique', 'Décision éthique et collaboration', 'Citoyenneté mondiale et intelligence culturelle'] },
        ],
        outcomes: ['Bien-être émotionnel et confiance accrus', 'Meilleures décisions financières', "Projets d'engagement communautaire", 'Certification de leadership jeunesse'],
        tagline: "Préparer la jeunesse d'aujourd'hui à devenir les leaders ennoblis de demain.",
      },
      {
        key: 'educators',
        name: 'Ennobled Educators™',
        academy: "Institut de leadership de l'éducateur résilient",
        audience: "Enseignants, directions d'école, conseillers, coachs et leaders éducatifs",
        purpose:
          "Renforcer le bien-être émotionnel, l'efficacité de leadership et la résilience financière des éducateurs — pour qu'ils cultivent des environnements d'apprentissage florissants.",
        pillars: [
          { name: 'Résilience émotionnelle', items: ["Prévention de l'épuisement et de la fatigue compassionnelle", 'Leadership sensible aux traumatismes', 'Pleine conscience et régulation émotionnelle', 'Soin de soi et durabilité professionnelle'] },
          { name: 'Résilience financière', items: ['Bien-être financier personnel', 'Retraite et planification à long terme', 'Intendance des ressources et durabilité des programmes', 'Connaissance des subventions et financements'] },
          { name: 'Leadership conscient', items: ['Pratiques de leadership transformationnel', 'Classes inclusives et compatissantes', "Mentorat et développement de l'élève", "Appartenance et sécurité psychologique"] },
        ],
        outcomes: ['Bien-être accru des éducateurs', "Risque d'épuisement réduit", 'Engagement accru des élèves', "Cultures scolaires renforcées"],
        tagline: 'Élever les éducateurs qui façonnent les leaders de demain.',
      },
      {
        key: 'women',
        name: 'Ennobled Women™',
        academy: 'Collectif Femmes en ascension — leadership et autonomisation',
        audience: 'Professionnelles, mères, entrepreneures, leaders communautaires et actrices du changement',
        purpose:
          'Permettre aux femmes de renforcer leur résilience émotionnelle, leur indépendance financière et leur capacité de leadership conscient — pour devenir des catalyseuses de familles, d’organisations et de communautés florissantes.',
        pillars: [
          { name: 'Résilience émotionnelle', items: ['Guérison, conscience de soi et estime de soi', 'Traverser les transitions de vie', 'Poser des limites et bien-être émotionnel', 'Bâtir des réseaux de soutien'] },
          { name: 'Résilience financière', items: ['Littératie financière et création de richesse', "Entrepreneuriat et croissance d'entreprise", 'Investissement et planification du legs', 'Avancement de carrière et pouvoir économique'] },
          { name: 'Leadership conscient', items: ['Leadership guidé par le sens', 'Influence authentique et communication', 'Impact communautaire et service', 'Mentorat de la prochaine génération'] },
        ],
        outcomes: ['Confiance et efficacité personnelle accrues', 'Indépendance financière renforcée', 'Opportunités de leadership élargies', 'Certification de leadership féminin'],
        tagline: "Quand les femmes s'élèvent, les familles, les communautés et les nations s'élèvent.",
      },
    ],
  },
  es: {
    frameworkKicker: 'El marco de programas insignia de EnnobleRise',
    frameworkTitle: 'Formando líderes emocionalmente resilientes, financieramente empoderados y conscientes',
    frameworkIntro:
      'El verdadero liderazgo va más allá del logro académico o económico. Nuestros programas insignia ennoblecen a la persona entera — dotando a cada participante de resiliencia emocional, inteligencia financiera y liderazgo consciente, para que el éxito se convierta en un catalizador que eleve a otros.',
    audienceLabel: 'A quién sirve',
    purposeLabel: 'Propósito',
    pillarsLabel: 'Pilares fundamentales',
    outcomesLabel: 'Resultados',
    ecosystemTitle: 'El modelo de ecosistema EnnobleRise',
    ecosystemLines: [
      'Los jóvenes son inspirados por los educadores.',
      'Los educadores son fortalecidos por las mujeres.',
      'Las mujeres empoderan a las familias.',
      'Las familias nutren a los jóvenes.',
    ],
    ecosystemBody:
      'Juntos, estos programas interconectados crean un ecosistema autosostenible de resiliencia emocional, empoderamiento financiero y liderazgo consciente — elevando a las personas, fortaleciendo comunidades y cultivando el futuro ennoblecido que nuestro mundo necesita.',
    programs: [
      {
        key: 'youth',
        name: 'Ennobled Futures™',
        academy: 'Academia de Liderazgo Juvenil y Preparación para la Vida',
        audience: 'Estudiantes de secundaria, preparatoria y universidad, y jóvenes adultos emergentes',
        purpose:
          'Equipar a los jóvenes con la resiliencia emocional, la inteligencia financiera y el liderazgo consciente para prosperar en un mundo cambiante — convirtiéndose en líderes compasivos que influyen positivamente en sus comunidades.',
        pillars: [
          { name: 'Resiliencia emocional', items: ['Inteligencia emocional y autoconciencia', 'Manejo del estrés y atención plena', 'Relaciones sanas y comunicación', 'Mentalidad de crecimiento y bienestar mental'] },
          { name: 'Resiliencia financiera', items: ['Fundamentos de educación financiera', 'Ahorro, presupuesto e inversión', 'Emprendimiento e innovación', 'Creación de patrimonio y decisiones responsables'] },
          { name: 'Liderazgo consciente', items: ['Liderazgo basado en carácter y valores', 'Aprendizaje-servicio y compromiso cívico', 'Decisiones éticas y colaboración', 'Ciudadanía global e inteligencia cultural'] },
        ],
        outcomes: ['Mayor bienestar emocional y confianza', 'Mejores decisiones financieras', 'Proyectos de compromiso comunitario', 'Certificación de liderazgo juvenil'],
        tagline: 'Preparando a la juventud de hoy para ser los líderes ennoblecidos del mañana.',
      },
      {
        key: 'educators',
        name: 'Ennobled Educators™',
        academy: 'Instituto de Liderazgo del Educador Resiliente',
        audience: 'Docentes, directivos escolares, consejeros, entrenadores y líderes educativos',
        purpose:
          'Fortalecer el bienestar emocional, la eficacia de liderazgo y la resiliencia financiera de los educadores — empoderándolos para cultivar entornos de aprendizaje florecientes.',
        pillars: [
          { name: 'Resiliencia emocional', items: ['Prevención del agotamiento y la fatiga por compasión', 'Liderazgo informado en trauma', 'Atención plena y regulación emocional', 'Autocuidado y sostenibilidad profesional'] },
          { name: 'Resiliencia financiera', items: ['Bienestar financiero personal', 'Retiro y planificación a largo plazo', 'Administración de recursos y sostenibilidad de programas', 'Conocimiento de subvenciones y financiamiento'] },
          { name: 'Liderazgo consciente', items: ['Prácticas de liderazgo transformacional', 'Aulas inclusivas y compasivas', 'Mentoría y desarrollo estudiantil', 'Pertenencia y seguridad psicológica'] },
        ],
        outcomes: ['Mayor bienestar docente', 'Menor riesgo de agotamiento', 'Mayor compromiso estudiantil', 'Culturas escolares más fuertes'],
        tagline: 'Empoderando a los educadores que forman a los líderes del mañana.',
      },
      {
        key: 'women',
        name: 'Ennobled Women™',
        academy: 'Colectivo Mujeres que Ascienden — Liderazgo y Empoderamiento',
        audience: 'Profesionales, madres, emprendedoras, lideresas comunitarias y agentes de cambio',
        purpose:
          'Empoderar a las mujeres para fortalecer su resiliencia emocional, independencia financiera y capacidad de liderazgo consciente — convirtiéndose en catalizadoras de familias, organizaciones y comunidades florecientes.',
        pillars: [
          { name: 'Resiliencia emocional', items: ['Sanación, autoconciencia y valor propio', 'Navegar las transiciones de la vida', 'Establecer límites y bienestar emocional', 'Construir redes de apoyo'] },
          { name: 'Resiliencia financiera', items: ['Educación financiera y creación de riqueza', 'Emprendimiento y crecimiento empresarial', 'Inversión y planificación de legado', 'Avance profesional y poder económico'] },
          { name: 'Liderazgo consciente', items: ['Liderazgo guiado por el propósito', 'Influencia auténtica y comunicación', 'Impacto comunitario y servicio', 'Mentoría a la próxima generación'] },
        ],
        outcomes: ['Mayor confianza y autoeficacia', 'Mayor independencia financiera', 'Más oportunidades de liderazgo', 'Certificación de liderazgo femenino'],
        tagline: 'Cuando las mujeres se elevan, las familias, las comunidades y las naciones se elevan.',
      },
    ],
  },
};
