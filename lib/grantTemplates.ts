export type GrantInput = {
  funder: string;
  program: 'general' | 'youth' | 'educators' | 'women';
  amount: string;
  duration: string;
  geography: string;
  docType: 'loi' | 'narrative';
};

const programBlocks = {
  general: {
    name: 'our three program pillars — Youth Ennoblement, Teacher Leadership, and Women\'s Financial Resilience',
    need: 'Rising inequality, environmental degradation, and social unrest call for leaders who embody compassion, mindfulness, and resilience. Communities do not thrive through charity alone; they flourish when ennobled with purpose, emotional strength, and financial resilience.',
    activities: '- Mentorship circles pairing participants with global role models\n- Emotional intelligence and mindful leadership training\n- Financial literacy and entrepreneurial skill-building\n- Educator professional development in socio-emotional learning\n- Ambassador-led community leadership initiatives',
    outcomes: '- Participants demonstrate measurable growth in emotional resilience and leadership confidence\n- Educators integrate socio-emotional learning into their classrooms\n- Women participants establish or strengthen income-generating activities\n- Local ambassador networks sustain programming beyond the grant period',
  },
  youth: {
    name: 'Youth Ennoblement: Mindful Leaders of Tomorrow',
    need: 'Young people in underserved communities carry extraordinary potential that waits only for opportunity. Without mentorship and leadership formation, that potential is extracted or lost — with consequences that echo across generations.',
    activities: '- Emotional intelligence training building self-awareness, empathy, and courage\n- Mindful leadership programs grounding ambition in character and service\n- Entrepreneurial and financial skills converting potential into livelihoods\n- Youth mentorship circles with global role models and peers',
    outcomes: '- Youth participants report increased self-efficacy and purpose\n- Participants launch community-improvement initiatives in their own villages and neighborhoods\n- A cohort of youth ambassadors models humane leadership for peers',
  },
  educators: {
    name: 'Teacher Leadership: Nurturing Humane and Resilient Minds',
    need: 'Educators shape the character, confidence, and aspirations of entire generations — yet they are among the least supported professionals in the communities we serve. Strengthening teachers multiplies impact across every child they reach.',
    activities: '- Professional development in mindful teaching and socio-emotional learning\n- Leadership cultivation honoring educators as nation-builders\n- Peer networks that fight isolation and renew purpose\n- Classroom toolkits for emotional resilience instruction',
    outcomes: '- Educators integrate socio-emotional learning into daily instruction\n- Teacher retention and reported professional purpose increase\n- Each trained educator reaches hundreds of students annually',
  },
  women: {
    name: "Women's Financial Resilience: Unleashing Economic Power with Purpose",
    need: 'Women are the anchors of families and societies, yet systemic barriers keep their economic power constrained. When women gain financial independence, entire communities rise with them.',
    activities: '- Financial literacy education building lasting economic independence\n- Vocational and entrepreneurial training with real market pathways\n- Collaborative networks of women who lift as they rise\n- Leadership formation grounded in courage and compassion',
    outcomes: '- Women participants establish or grow income-generating activities\n- Household financial stability improves measurably\n- Women assume visible leadership roles in community institutions',
  },
};

export function composeGrantDoc(input: GrantInput): { title: string; content: string } {
  const p = programBlocks[input.program];
  const amount = input.amount ? `$${Number(input.amount).toLocaleString()}` : '[AMOUNT]';
  const duration = input.duration || '12 months';
  const geography = input.geography || 'our program countries across 5 continents';

  if (input.docType === 'loi') {
    const title = `Letter of Inquiry — ${input.funder}`;
    const content = `# Letter of Inquiry
**To:** ${input.funder}
**From:** EnnobleRise Global Trust™
**Request:** ${amount} over ${duration}
**Program:** ${p.name}

Dear ${input.funder} team,

EnnobleRise Global Trust respectfully requests ${amount} over ${duration} to advance ${p.name} in ${geography}.

## Who we are
EnnobleRise Global Trust is a nonprofit catalyst for human-centered transformation, founded by Dr. Kasthuri Henry — transformation executive, educator, and author of the international bestseller *Ennobled for Success: From Civil War to a US CFO*. We ennoble youth to lead with courage, equip educators to teach with purpose, and advance women as architects of resilient communities. We currently serve 8+ countries across 5 continents through 18 program ambassadors.

Our philosophy is distinctive: we go beyond empowerment. Empowerment assumes power must first be given; ennoblement recognizes that every human being already carries innate worth and potential — and that the role of education, mentorship, and leadership is to awaken and unleash it.

## The need
${p.need}

## What your investment makes possible
${p.activities}

## Expected outcomes
${p.outcomes}

## Stewardship
Funds are managed under the financial leadership of our founder, a career CFO, with mindful stewardship and transparent reporting. We would welcome the opportunity to submit a full proposal and to discuss how this work aligns with ${input.funder}'s priorities.

With gratitude and purpose,

**Dr. Kasthuri Henry**
Founder & Executive Director, EnnobleRise Global Trust™
Engage@EnnobleRise.Org`;
    return { title, content };
  }

  const title = `Grant Narrative — ${input.funder}`;
  const content = `# Grant Proposal Narrative
**Funder:** ${input.funder}
**Applicant:** EnnobleRise Global Trust™
**Request:** ${amount} over ${duration}
**Program:** ${p.name}
**Geography:** ${geography}

## 1. Organizational background
EnnobleRise Global Trust™ is a nonprofit catalyst for human-centered transformation. Founded by Dr. Kasthuri Henry — a transformation executive whose journey from civil war to U.S. CFO is chronicled in the international bestseller *Ennobled for Success* — the Trust ennobles youth, educators, and women through emotional resilience, financial independence, and mindful leadership. We serve 8+ countries across 5 continents with 18 program ambassadors, guided by the mantra "Building to Last and Ennobling for Success."

## 2. Statement of need
${p.need}

The communities we serve — across the Caribbean, Latin America, Africa, and Asia, as well as underserved populations in developed nations — face interconnected challenges that no single intervention resolves. Our answer is to invest in the human beings who transform systems from within: young people, teachers, and women.

## 3. Program description
This grant will fund ${p.name} in ${geography} over ${duration}. Core activities:

${p.activities}

Programming is delivered through our ambassador model: trained local leaders who carry cultural fluency, lived experience, and lasting presence in their communities — ensuring the work continues well beyond any single funding cycle.

## 4. Goals and measurable outcomes
${p.outcomes}

We will track participation, pre/post measures of emotional resilience and financial capability, and community-level indicators, reporting to ${input.funder} on the schedule you require.

## 5. Budget summary
The requested ${amount} will support program delivery (curriculum, training, mentorship), ambassador stipends and development, materials and translation (programming is offered in English, French, and Spanish), monitoring and evaluation, and modest administrative costs. A detailed line-item budget is attached.

## 6. Sustainability
Our theory of change is inherently sustainable: ennobled leaders ennoble others. Each cohort produces ambassadors and mentors for the next, while our public-private-community partnership model diversifies support across philanthropy, institutions, and local stakeholders.

## 7. Conclusion
When the human spirit is ennobled, transformation does not stop with one individual — it ripples across families, communities, and generations. We invite ${input.funder} to help set that ripple in motion.

**Contact:** Dr. Kasthuri Henry, Founder & Executive Director · Engage@EnnobleRise.Org`;
  return { title, content };
}
