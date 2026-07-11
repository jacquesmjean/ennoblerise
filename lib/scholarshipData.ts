import type { Locale } from './i18n';

export type ScholarshipContent = {
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  motto: string;
  sub: string;
  legacyKicker: string;
  legacyTitle: string;
  legacyBody: string[];
  philosophyTitle: string;
  philosophyIntro: string;
  philosophyItems: string[];
  eligibilityTitle: string;
  eligibilityItems: string[];
  criteriaTitle: string;
  criteriaNote: string;
  criteria: { name: string; weight: string }[];
  promiseTitle: string;
  promiseBody: string;
  promiseClose1: string;
  promiseClose2: string;
  applyTitle: string;
  applyIntro: string;
  form: {
    name: string;
    email: string;
    phone: string;
    country: string;
    institution: string;
    program: string;
    path: string;
    paths: string[];
    careerVision: string;
    careerVisionHint: string;
    service: string;
    serviceHint: string;
    essay: string;
    essayHint: string;
    need: string;
    needHint: string;
    commitment: string;
    commitmentItems: string[];
    submit: string;
    receivedTitle: string;
    receivedBody: string;
  };
};

export const scholarshipData: Record<Locale, ScholarshipContent> = {
  en: {
    metaTitle: 'Michael G. Henry Legacy Scholarship™ | EnnobleRise Global Trust',
    metaDescription:
      'Educating minds. Ennobling hearts. Elevating humanity. The Michael G. Henry Legacy Scholarship invests in young leaders who master their craft, protect human dignity, and leave every community better than they found it.',
    kicker: 'The Michael G. Henry Legacy Scholarship™',
    title: 'Educating Minds. Ennobling Hearts. Elevating Humanity.',
    motto: 'Success earns admiration. Significance creates legacy.',
    sub: 'Developing mindful leaders who build a more compassionate, just, and prosperous world.',
    legacyKicker: 'A life worth honoring',
    legacyTitle: 'The legacy of Michael G. Henry',
    legacyBody: [
      'This scholarship honors the life and legacy of Michael G. Henry — educator, ordained minister, broadcaster, mentor, humanitarian, and lifelong champion of human dignity.',
      'Mike believed that education was about far more than earning a degree. It was about becoming the kind of person who uplifts others, leads with wisdom, and leaves every community better than they found it.',
      'The Michael G. Henry Legacy Scholarship seeks young people who aspire to master their craft while cultivating emotional intelligence, integrity, compassion, resilience, and a commitment to serving others. We are investing not only in your education — but in your future as a leader.',
    ],
    philosophyTitle: 'Our guiding philosophy',
    philosophyIntro: 'We believe great leaders:',
    philosophyItems: [
      'Master their craft.',
      'Know themselves.',
      'Serve others.',
      'Lead with wisdom.',
      'Protect human dignity.',
      'Leave every person better than they found them.',
    ],
    eligibilityTitle: 'Eligibility',
    eligibilityItems: [
      'Currently enrolled in or accepted to an accredited educational institution, apprenticeship, trade program, certification program, or university.',
      'Demonstrated commitment to academic or professional excellence.',
      'Leadership potential and a commitment to serving others.',
      'Willingness to participate in leadership development opportunities sponsored by EnnobleRise Global Trust™.',
    ],
    criteriaTitle: 'How applications are evaluated',
    criteriaNote: 'Applications are evaluated holistically across six areas:',
    criteria: [
      { name: 'Leadership potential', weight: '25%' },
      { name: 'Character & integrity', weight: '20%' },
      { name: 'Commitment to service', weight: '20%' },
      { name: 'Educational & career vision', weight: '15%' },
      { name: 'Essay quality', weight: '15%' },
      { name: 'Financial need', weight: '5%' },
    ],
    promiseTitle: 'Our promise',
    promiseBody:
      'At EnnobleRise Global Trust™, we believe education should shape both the mind and the heart. The Michael G. Henry Legacy Scholarship is more than financial assistance — it is an investment in future leaders who will master their craft, cultivate wisdom, protect human dignity, and create a lasting ripple of hope in the world.',
    promiseClose1: 'Success earns admiration.',
    promiseClose2: 'Significance creates legacy.',
    applyTitle: 'Apply for the scholarship',
    applyIntro:
      'Tell us who you are, who you hope to become, and how your education will elevate others. Every application is read personally and with care.',
    form: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      country: 'Country',
      institution: 'Current school / institution',
      program: 'Program or major',
      path: 'Educational path',
      paths: ['High school', 'Trade school', 'Community college', 'University', 'Graduate school', 'Certification program', 'Apprenticeship'],
      careerVision: 'Your career vision',
      careerVisionHint: 'What profession, trade, business, or field do you hope to pursue — and what inspired you?',
      service: 'Service to others',
      serviceHint: 'Volunteer work, community involvement, mentoring, caregiving, faith-based service, or other ways you have improved the lives of others.',
      essay: 'Leadership essay',
      essayHint:
        'In 750–1,000 words: Mike Henry believed true success is measured by the number of lives we positively impact. Describe the person you hope to become, the craft you hope to master, the legacy you hope to leave, and how you will use your education to elevate others while protecting human dignity.',
      need: 'Financial need',
      needHint: 'How would this scholarship help you continue your educational journey?',
      commitment: 'If selected, I commit to:',
      commitmentItems: [
        'pursuing excellence in my chosen field;',
        'treating every individual with dignity and respect;',
        'leading with integrity and compassion;',
        'serving my community whenever possible;',
        'acting as an ambassador of the values represented by this scholarship.',
      ],
      submit: 'Submit my application',
      receivedTitle: 'Your application has been received.',
      receivedBody: 'Thank you for honoring Mike Henry\'s legacy with your aspiration. Our selection committee reviews every application personally — you will hear from us by email.',
    },
  },
  fr: {
    metaTitle: 'Bourse Michael G. Henry Legacy Scholarship™ | EnnobleRise Global Trust',
    metaDescription:
      "Éduquer les esprits. Ennoblir les cœurs. Élever l'humanité. La bourse Michael G. Henry investit dans de jeunes leaders qui maîtrisent leur art, protègent la dignité humaine et laissent chaque communauté meilleure.",
    kicker: 'La bourse Michael G. Henry Legacy Scholarship™',
    title: "Éduquer les esprits. Ennoblir les cœurs. Élever l'humanité.",
    motto: "Le succès attire l'admiration. La signification crée l'héritage.",
    sub: 'Former des leaders conscients qui bâtissent un monde plus compatissant, plus juste et plus prospère.',
    legacyKicker: 'Une vie digne d’être honorée',
    legacyTitle: "L'héritage de Michael G. Henry",
    legacyBody: [
      "Cette bourse honore la vie et l'héritage de Michael G. Henry — éducateur, ministre ordonné, homme de radio, mentor, humanitaire et défenseur infatigable de la dignité humaine.",
      "Mike croyait que l'éducation dépassait de loin l'obtention d'un diplôme. Il s'agissait de devenir la personne qui élève les autres, dirige avec sagesse et laisse chaque communauté meilleure qu'elle ne l'a trouvée.",
      "La bourse Michael G. Henry recherche des jeunes qui aspirent à maîtriser leur art tout en cultivant l'intelligence émotionnelle, l'intégrité, la compassion, la résilience et l'engagement au service des autres. Nous n'investissons pas seulement dans vos études — nous investissons dans votre avenir de leader.",
    ],
    philosophyTitle: 'Notre philosophie directrice',
    philosophyIntro: 'Nous croyons que les grands leaders :',
    philosophyItems: [
      'Maîtrisent leur art.',
      'Se connaissent eux-mêmes.',
      'Servent les autres.',
      'Dirigent avec sagesse.',
      'Protègent la dignité humaine.',
      "Laissent chaque personne meilleure qu'ils ne l'ont trouvée.",
    ],
    eligibilityTitle: 'Admissibilité',
    eligibilityItems: [
      'Être inscrit ou admis dans un établissement accrédité : université, école de métiers, programme de certification ou apprentissage.',
      "Engagement démontré envers l'excellence académique ou professionnelle.",
      'Potentiel de leadership et engagement au service des autres.',
      'Volonté de participer aux opportunités de développement du leadership offertes par EnnobleRise Global Trust™.',
    ],
    criteriaTitle: 'Comment les candidatures sont évaluées',
    criteriaNote: 'Les candidatures sont évaluées de manière holistique selon six critères :',
    criteria: [
      { name: 'Potentiel de leadership', weight: '25%' },
      { name: 'Caractère et intégrité', weight: '20%' },
      { name: 'Engagement au service', weight: '20%' },
      { name: 'Vision éducative et professionnelle', weight: '15%' },
      { name: "Qualité de l'essai", weight: '15%' },
      { name: 'Besoin financier', weight: '5%' },
    ],
    promiseTitle: 'Notre promesse',
    promiseBody:
      "Chez EnnobleRise Global Trust™, nous croyons que l'éducation doit former à la fois l'esprit et le cœur. La bourse Michael G. Henry est bien plus qu'une aide financière — c'est un investissement dans les leaders de demain, qui maîtriseront leur art, cultiveront la sagesse, protégeront la dignité humaine et créeront une onde d'espoir durable dans le monde.",
    promiseClose1: "Le succès attire l'admiration.",
    promiseClose2: "La signification crée l'héritage.",
    applyTitle: 'Postuler à la bourse',
    applyIntro:
      'Dites-nous qui vous êtes, qui vous espérez devenir, et comment vos études élèveront les autres. Chaque candidature est lue personnellement et avec soin.',
    form: {
      name: 'Nom complet',
      email: 'Adresse e-mail',
      phone: 'Téléphone',
      country: 'Pays',
      institution: 'École / établissement actuel',
      program: 'Programme ou spécialité',
      path: 'Parcours éducatif',
      paths: ['Lycée', 'École de métiers', 'Collège communautaire', 'Université', 'Études supérieures', 'Programme de certification', 'Apprentissage'],
      careerVision: 'Votre vision professionnelle',
      careerVisionHint: 'Quel métier, art ou domaine espérez-vous exercer — et qu’est-ce qui vous a inspiré ?',
      service: 'Service aux autres',
      serviceHint: 'Bénévolat, engagement communautaire, mentorat, soins aux proches, service confessionnel, ou toute autre façon dont vous avez amélioré la vie des autres.',
      essay: 'Essai de leadership',
      essayHint:
        "En 750 à 1 000 mots : Mike Henry croyait que le vrai succès se mesure au nombre de vies positivement touchées. Décrivez la personne que vous espérez devenir, l'art que vous espérez maîtriser, l'héritage que vous espérez laisser, et comment vos études élèveront les autres tout en protégeant la dignité humaine.",
      need: 'Besoin financier',
      needHint: 'Comment cette bourse vous aiderait-elle à poursuivre votre parcours éducatif ?',
      commitment: 'Si je suis sélectionné(e), je m’engage à :',
      commitmentItems: [
        "poursuivre l'excellence dans mon domaine ;",
        'traiter chaque personne avec dignité et respect ;',
        'diriger avec intégrité et compassion ;',
        'servir ma communauté chaque fois que possible ;',
        'être ambassadeur des valeurs de cette bourse.',
      ],
      submit: 'Envoyer ma candidature',
      receivedTitle: 'Votre candidature a été reçue.',
      receivedBody: "Merci d'honorer l'héritage de Mike Henry par votre aspiration. Notre comité lit chaque candidature personnellement — vous recevrez notre réponse par e-mail.",
    },
  },
  es: {
    metaTitle: 'Beca Michael G. Henry Legacy Scholarship™ | EnnobleRise Global Trust',
    metaDescription:
      'Educar mentes. Ennoblecer corazones. Elevar la humanidad. La beca Michael G. Henry invierte en jóvenes líderes que dominan su oficio, protegen la dignidad humana y dejan cada comunidad mejor de como la encontraron.',
    kicker: 'La beca Michael G. Henry Legacy Scholarship™',
    title: 'Educar mentes. Ennoblecer corazones. Elevar la humanidad.',
    motto: 'El éxito gana admiración. La trascendencia crea legado.',
    sub: 'Formando líderes conscientes que construyen un mundo más compasivo, justo y próspero.',
    legacyKicker: 'Una vida digna de honrar',
    legacyTitle: 'El legado de Michael G. Henry',
    legacyBody: [
      'Esta beca honra la vida y el legado de Michael G. Henry — educador, ministro ordenado, locutor, mentor, humanitario y defensor incansable de la dignidad humana.',
      'Mike creía que la educación era mucho más que obtener un título. Se trataba de convertirse en la clase de persona que eleva a otros, lidera con sabiduría y deja cada comunidad mejor de como la encontró.',
      'La beca Michael G. Henry busca jóvenes que aspiren a dominar su oficio mientras cultivan inteligencia emocional, integridad, compasión, resiliencia y compromiso de servir a otros. No solo invertimos en tu educación — invertimos en tu futuro como líder.',
    ],
    philosophyTitle: 'Nuestra filosofía',
    philosophyIntro: 'Creemos que los grandes líderes:',
    philosophyItems: [
      'Dominan su oficio.',
      'Se conocen a sí mismos.',
      'Sirven a otros.',
      'Lideran con sabiduría.',
      'Protegen la dignidad humana.',
      'Dejan a cada persona mejor de como la encontraron.',
    ],
    eligibilityTitle: 'Elegibilidad',
    eligibilityItems: [
      'Estar inscrito o aceptado en una institución acreditada: universidad, escuela técnica, programa de certificación o aprendizaje.',
      'Compromiso demostrado con la excelencia académica o profesional.',
      'Potencial de liderazgo y compromiso de servir a otros.',
      'Disposición a participar en oportunidades de desarrollo de liderazgo de EnnobleRise Global Trust™.',
    ],
    criteriaTitle: 'Cómo se evalúan las solicitudes',
    criteriaNote: 'Las solicitudes se evalúan de manera integral en seis áreas:',
    criteria: [
      { name: 'Potencial de liderazgo', weight: '25%' },
      { name: 'Carácter e integridad', weight: '20%' },
      { name: 'Compromiso de servicio', weight: '20%' },
      { name: 'Visión educativa y profesional', weight: '15%' },
      { name: 'Calidad del ensayo', weight: '15%' },
      { name: 'Necesidad financiera', weight: '5%' },
    ],
    promiseTitle: 'Nuestra promesa',
    promiseBody:
      'En EnnobleRise Global Trust™ creemos que la educación debe formar la mente y el corazón. La beca Michael G. Henry es más que ayuda financiera — es una inversión en los líderes del futuro, que dominarán su oficio, cultivarán sabiduría, protegerán la dignidad humana y crearán una onda duradera de esperanza en el mundo.',
    promiseClose1: 'El éxito gana admiración.',
    promiseClose2: 'La trascendencia crea legado.',
    applyTitle: 'Solicita la beca',
    applyIntro:
      'Cuéntanos quién eres, quién esperas llegar a ser, y cómo tu educación elevará a otros. Cada solicitud se lee personalmente y con cuidado.',
    form: {
      name: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      country: 'País',
      institution: 'Escuela / institución actual',
      program: 'Programa o carrera',
      path: 'Trayectoria educativa',
      paths: ['Preparatoria', 'Escuela técnica', 'Colegio comunitario', 'Universidad', 'Posgrado', 'Programa de certificación', 'Aprendizaje'],
      careerVision: 'Tu visión profesional',
      careerVisionHint: '¿Qué profesión, oficio, negocio o campo esperas ejercer — y qué te inspiró?',
      service: 'Servicio a otros',
      serviceHint: 'Voluntariado, participación comunitaria, mentoría, cuidado de otros, servicio de fe, u otras formas en que has mejorado la vida de los demás.',
      essay: 'Ensayo de liderazgo',
      essayHint:
        'En 750–1,000 palabras: Mike Henry creía que el verdadero éxito se mide por la cantidad de vidas que impactamos positivamente. Describe la persona que esperas llegar a ser, el oficio que esperas dominar, el legado que esperas dejar, y cómo usarás tu educación para elevar a otros protegiendo la dignidad humana.',
      need: 'Necesidad financiera',
      needHint: '¿Cómo te ayudaría esta beca a continuar tu camino educativo?',
      commitment: 'Si soy seleccionado(a), me comprometo a:',
      commitmentItems: [
        'buscar la excelencia en mi campo;',
        'tratar a cada persona con dignidad y respeto;',
        'liderar con integridad y compasión;',
        'servir a mi comunidad siempre que sea posible;',
        'ser embajador(a) de los valores que representa esta beca.',
      ],
      submit: 'Enviar mi solicitud',
      receivedTitle: 'Tu solicitud ha sido recibida.',
      receivedBody: 'Gracias por honrar el legado de Mike Henry con tu aspiración. Nuestro comité lee cada solicitud personalmente — recibirás nuestra respuesta por correo.',
    },
  },
};
