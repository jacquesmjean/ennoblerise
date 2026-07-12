import type { Locale } from './i18n';

export type LegalDoc = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; body: string }[];
};

const UPDATED = { en: 'July 13, 2026', fr: '13 juillet 2026', es: '13 de julio de 2026' };

export const privacyData: Record<Locale, LegalDoc> = {
  en: {
    metaTitle: 'Privacy Policy | EnnobleRise Global Trust',
    metaDescription: 'How EnnobleRise Global Trust collects, uses, and protects your personal information.',
    title: 'Privacy Policy',
    updated: UPDATED.en,
    intro:
      'EnnobleRise Global Trust™ ("we", "us") exists to honor human dignity — and that begins with how we treat your information. This policy explains what we collect, why, and the choices you have.',
    sections: [
      { h: 'What we collect', body: 'We collect only what you choose to give us: your name, email address, and message when you contact us or use the concierge; your country, organization, and story when you apply to volunteer, become an ambassador, or partner with us; donation pledge details (name, email, amount, designation); scholarship application materials; and your email address when you subscribe to our newsletter. We also store your language preference in a browser cookie so the site greets you in your language.' },
      { h: 'How we use it', body: 'We use your information solely to respond to you, process your application or pledge, administer the Michael G. Henry Legacy Scholarship™, send the newsletter you requested, and run our programs. We do not sell, rent, or trade personal information — ever.' },
      { h: 'Where it lives', body: 'Form submissions are stored securely in our database (hosted on Supabase, with access restricted to authenticated staff under row-level security). Our website is served over HTTPS.' },
      { h: 'Who can see it', body: 'Only authorized EnnobleRise staff and trusted service providers who help us operate (hosting, database, email delivery) — each bound to use it only on our behalf. We may disclose information when the law requires it.' },
      { h: 'Children and young people', body: 'Our programs serve youth, and we take their protection seriously. Our website is not directed at children under 13, and we do not knowingly collect personal information from them online. Scholarship applicants under the age of majority should apply with the involvement of a parent or guardian.' },
      { h: 'Your rights', body: 'You may request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it — at any time, in any of our languages. You can unsubscribe from the newsletter with one message.' },
      { h: 'Retention', body: 'We keep information only as long as needed for the purpose you gave it — for example, scholarship applications through the selection cycle and any award period, and donation records as required for nonprofit accounting.' },
      { h: 'Changes and contact', body: 'If this policy changes, we will post the new version here with a new date. Questions or requests: Engage@EnnobleRise.Org or +1 (224) 536-1603.' },
    ],
  },
  fr: {
    metaTitle: 'Politique de confidentialité | EnnobleRise Global Trust',
    metaDescription: 'Comment EnnobleRise Global Trust collecte, utilise et protège vos informations personnelles.',
    title: 'Politique de confidentialité',
    updated: UPDATED.fr,
    intro:
      "EnnobleRise Global Trust™ (« nous ») existe pour honorer la dignité humaine — et cela commence par la façon dont nous traitons vos informations. Cette politique explique ce que nous collectons, pourquoi, et les choix qui vous appartiennent.",
    sections: [
      { h: 'Ce que nous collectons', body: "Uniquement ce que vous choisissez de nous confier : votre nom, votre e-mail et votre message lorsque vous nous contactez ou utilisez la conciergerie ; votre pays, organisation et histoire lorsque vous candidatez comme bénévole, ambassadeur ou partenaire ; les détails de promesse de don (nom, e-mail, montant, affectation) ; les dossiers de candidature à la bourse ; et votre e-mail lorsque vous vous abonnez à la lettre. Nous conservons aussi votre préférence de langue dans un cookie." },
      { h: 'Comment nous les utilisons', body: "Uniquement pour vous répondre, traiter votre candidature ou promesse, administrer la bourse Michael G. Henry Legacy Scholarship™, envoyer la lettre demandée et mener nos programmes. Nous ne vendons, ne louons ni n'échangeons jamais vos informations personnelles." },
      { h: 'Où elles sont conservées', body: "Les soumissions sont stockées en toute sécurité dans notre base de données (hébergée sur Supabase, accès réservé au personnel authentifié). Le site est servi en HTTPS." },
      { h: 'Qui peut y accéder', body: "Seuls le personnel autorisé d'EnnobleRise et des prestataires de confiance (hébergement, base de données, envoi d'e-mails), tenus de les utiliser uniquement pour notre compte. Nous pouvons divulguer des informations lorsque la loi l'exige." },
      { h: 'Enfants et jeunes', body: "Nos programmes servent la jeunesse et nous prenons sa protection au sérieux. Le site ne s'adresse pas aux enfants de moins de 13 ans et nous ne collectons pas sciemment leurs données. Les candidats mineurs à la bourse doivent postuler avec un parent ou tuteur." },
      { h: 'Vos droits', body: "Vous pouvez à tout moment demander une copie de vos informations, leur correction ou leur suppression — dans chacune de nos langues. Un simple message suffit pour vous désabonner de la lettre." },
      { h: 'Conservation', body: "Nous conservons les informations uniquement le temps nécessaire à leur finalité — les candidatures pendant le cycle de sélection, les dons selon les exigences comptables des organisations à but non lucratif." },
      { h: 'Modifications et contact', body: "Toute modification sera publiée ici avec une nouvelle date. Questions ou demandes : Engage@EnnobleRise.Org ou +1 (224) 536-1603." },
    ],
  },
  es: {
    metaTitle: 'Política de privacidad | EnnobleRise Global Trust',
    metaDescription: 'Cómo EnnobleRise Global Trust recopila, usa y protege tu información personal.',
    title: 'Política de privacidad',
    updated: UPDATED.es,
    intro:
      'EnnobleRise Global Trust™ ("nosotros") existe para honrar la dignidad humana — y eso empieza por cómo tratamos tu información. Esta política explica qué recopilamos, por qué, y las opciones que tienes.',
    sections: [
      { h: 'Qué recopilamos', body: 'Solo lo que eliges darnos: tu nombre, correo y mensaje al contactarnos o usar la conserjería; tu país, organización e historia al postular como voluntario, embajador o aliado; los datos de promesa de donativo (nombre, correo, monto, destino); los materiales de solicitud de beca; y tu correo al suscribirte al boletín. También guardamos tu preferencia de idioma en una cookie.' },
      { h: 'Cómo la usamos', body: 'Únicamente para responderte, procesar tu solicitud o promesa, administrar la beca Michael G. Henry Legacy Scholarship™, enviarte el boletín que pediste y operar nuestros programas. Nunca vendemos, alquilamos ni intercambiamos información personal.' },
      { h: 'Dónde se guarda', body: 'Los envíos se almacenan de forma segura en nuestra base de datos (alojada en Supabase, con acceso restringido a personal autenticado). El sitio se sirve por HTTPS.' },
      { h: 'Quién puede verla', body: 'Solo el personal autorizado de EnnobleRise y proveedores de confianza (alojamiento, base de datos, envío de correos), obligados a usarla solo en nuestro nombre. Podemos divulgar información cuando la ley lo exija.' },
      { h: 'Niños y jóvenes', body: 'Nuestros programas sirven a la juventud y tomamos su protección en serio. El sitio no está dirigido a menores de 13 años y no recopilamos a sabiendas su información. Los solicitantes de beca menores de edad deben postular con un padre o tutor.' },
      { h: 'Tus derechos', body: 'Puedes pedir en cualquier momento una copia de tu información, su corrección o su eliminación — en cualquiera de nuestros idiomas. Un solo mensaje basta para darte de baja del boletín.' },
      { h: 'Retención', body: 'Conservamos la información solo el tiempo necesario para su propósito — las solicitudes durante el ciclo de selección, los donativos según los requisitos contables de las organizaciones sin fines de lucro.' },
      { h: 'Cambios y contacto', body: 'Cualquier cambio se publicará aquí con nueva fecha. Preguntas o solicitudes: Engage@EnnobleRise.Org o +1 (224) 536-1603.' },
    ],
  },
};

export const termsData: Record<Locale, LegalDoc> = {
  en: {
    metaTitle: 'Terms of Use | EnnobleRise Global Trust',
    metaDescription: 'The terms that govern your use of the EnnobleRise Global Trust website and services.',
    title: 'Terms of Use',
    updated: UPDATED.en,
    intro:
      'Welcome. By using this website, you agree to these terms. They are written plainly, because clarity is a form of respect.',
    sections: [
      { h: 'Who we are', body: 'This website is operated by EnnobleRise Global Trust™, a nonprofit organization ennobling youth, educators, and women through emotional resilience, financial independence, and mindful leadership.' },
      { h: 'Use of the site', body: 'You may use this site to learn about our work, apply to our programs, give, and contact us. You agree not to misuse the site — including attempting to gain unauthorized access, submitting false or harmful content, or interfering with its operation.' },
      { h: 'Our content', body: 'The EnnobleRise name, logo, program names (including Ennobled Futures™, Ennobled Educators™, Ennobled Women™, and the Michael G. Henry Legacy Scholarship™), text, and imagery are the property of EnnobleRise Global Trust and protected by law. You may share our content with attribution; you may not use our marks without written permission.' },
      { h: 'Applications and submissions', body: 'Information you submit through our forms must be truthful and yours to share. Submitting an application (volunteer, ambassador, partner, or scholarship) does not guarantee acceptance; decisions rest with EnnobleRise.' },
      { h: 'Donations', body: 'Donation pledges made through this site are completed through secure payment channels we confirm with you. Gifts are applied with mindful stewardship to the designation you choose or, where needed, to where the need is greatest.' },
      { h: 'No professional advice', body: 'Content on this site — including essays and program materials — is for general information and inspiration. It is not legal, financial, medical, or psychological advice.' },
      { h: 'Limitation of liability', body: 'The site is provided "as is." To the fullest extent permitted by law, EnnobleRise Global Trust is not liable for indirect or consequential damages arising from your use of the site. Nothing in these terms limits liability that cannot be limited by law.' },
      { h: 'Changes, law, and contact', body: 'We may update these terms; the current version always lives on this page with its date. These terms are governed by the laws of the State of Illinois, USA. Questions: Engage@EnnobleRise.Org.' },
    ],
  },
  fr: {
    metaTitle: "Conditions d'utilisation | EnnobleRise Global Trust",
    metaDescription: "Les conditions qui régissent l'utilisation du site d'EnnobleRise Global Trust.",
    title: "Conditions d'utilisation",
    updated: UPDATED.fr,
    intro:
      'Bienvenue. En utilisant ce site, vous acceptez ces conditions. Elles sont rédigées simplement, car la clarté est une forme de respect.',
    sections: [
      { h: 'Qui nous sommes', body: "Ce site est exploité par EnnobleRise Global Trust™, organisation à but non lucratif qui ennoblit les jeunes, les éducateurs et les femmes par la résilience émotionnelle, l'indépendance financière et le leadership conscient." },
      { h: 'Utilisation du site', body: "Vous pouvez utiliser ce site pour découvrir notre travail, candidater à nos programmes, donner et nous contacter. Vous vous engagez à ne pas en faire un usage abusif — accès non autorisé, contenus faux ou nuisibles, ou perturbation de son fonctionnement." },
      { h: 'Nos contenus', body: "Le nom EnnobleRise, le logo, les noms de programmes (dont Ennobled Futures™, Ennobled Educators™, Ennobled Women™ et la bourse Michael G. Henry Legacy Scholarship™), les textes et les images appartiennent à EnnobleRise Global Trust et sont protégés par la loi. Vous pouvez partager nos contenus avec attribution ; l'usage de nos marques requiert une autorisation écrite." },
      { h: 'Candidatures et soumissions', body: "Les informations soumises via nos formulaires doivent être véridiques et vous appartenir. Une candidature (bénévole, ambassadeur, partenaire ou bourse) ne garantit pas l'acceptation ; la décision appartient à EnnobleRise." },
      { h: 'Dons', body: "Les promesses de don faites sur ce site sont finalisées par des canaux de paiement sécurisés que nous confirmons avec vous. Les dons sont gérés avec soin selon l'affectation choisie ou, si nécessaire, là où le besoin est le plus grand." },
      { h: 'Pas de conseil professionnel', body: "Les contenus de ce site — essais et supports de programme compris — sont d'ordre général et inspirant. Ils ne constituent pas un conseil juridique, financier, médical ou psychologique." },
      { h: 'Limitation de responsabilité', body: "Le site est fourni « en l'état ». Dans la mesure permise par la loi, EnnobleRise Global Trust n'est pas responsable des dommages indirects liés à votre utilisation du site. Rien ici ne limite une responsabilité qui ne peut l'être légalement." },
      { h: 'Modifications, droit applicable et contact', body: "Nous pouvons mettre à jour ces conditions ; la version en vigueur figure toujours sur cette page avec sa date. Ces conditions sont régies par le droit de l'État de l'Illinois, États-Unis. Questions : Engage@EnnobleRise.Org." },
    ],
  },
  es: {
    metaTitle: 'Términos de uso | EnnobleRise Global Trust',
    metaDescription: 'Los términos que rigen el uso del sitio web de EnnobleRise Global Trust.',
    title: 'Términos de uso',
    updated: UPDATED.es,
    intro:
      'Bienvenido. Al usar este sitio, aceptas estos términos. Están escritos con sencillez, porque la claridad es una forma de respeto.',
    sections: [
      { h: 'Quiénes somos', body: 'Este sitio es operado por EnnobleRise Global Trust™, organización sin fines de lucro que ennoblece a jóvenes, educadores y mujeres mediante resiliencia emocional, independencia financiera y liderazgo consciente.' },
      { h: 'Uso del sitio', body: 'Puedes usar este sitio para conocer nuestro trabajo, postular a nuestros programas, donar y contactarnos. Te comprometes a no hacer mal uso del sitio — incluido el acceso no autorizado, el envío de contenido falso o dañino, o la interferencia con su funcionamiento.' },
      { h: 'Nuestro contenido', body: 'El nombre EnnobleRise, el logotipo, los nombres de programas (incluidos Ennobled Futures™, Ennobled Educators™, Ennobled Women™ y la beca Michael G. Henry Legacy Scholarship™), los textos y las imágenes pertenecen a EnnobleRise Global Trust y están protegidos por la ley. Puedes compartir nuestro contenido con atribución; el uso de nuestras marcas requiere permiso escrito.' },
      { h: 'Solicitudes y envíos', body: 'La información enviada por nuestros formularios debe ser veraz y tuya. Enviar una solicitud (voluntariado, embajador, aliado o beca) no garantiza la aceptación; la decisión corresponde a EnnobleRise.' },
      { h: 'Donativos', body: 'Las promesas de donativo hechas en este sitio se completan por canales de pago seguros que confirmamos contigo. Los donativos se administran con cuidado según el destino que elijas o, si es necesario, donde la necesidad sea mayor.' },
      { h: 'Sin asesoría profesional', body: 'El contenido de este sitio — incluidos ensayos y materiales de programa — es informativo e inspirador. No constituye asesoría legal, financiera, médica ni psicológica.' },
      { h: 'Limitación de responsabilidad', body: 'El sitio se ofrece "tal cual". En la máxima medida permitida por la ley, EnnobleRise Global Trust no es responsable de daños indirectos derivados del uso del sitio. Nada aquí limita responsabilidades que la ley no permita limitar.' },
      { h: 'Cambios, ley aplicable y contacto', body: 'Podemos actualizar estos términos; la versión vigente estará siempre en esta página con su fecha. Estos términos se rigen por las leyes del Estado de Illinois, EE. UU. Preguntas: Engage@EnnobleRise.Org.' },
    ],
  },
};
