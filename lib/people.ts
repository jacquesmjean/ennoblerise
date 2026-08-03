export type Person = {
  name: string;
  role: string;
  country: string;
  img: string;
  bio: string;
  linkedin?: string;
  website?: string;
};

export type Ambassador = Person & { category: 'Youth' | 'Educator' | 'Women' };

/** EnnobleRise Global Trust™ Advisory Board */
export const advisoryBoard: Person[] = [
  {
    name: 'Melissa Gallego',
    role: 'Insurance Executive & Educator',
    country: 'Belize',
    img: '/images/people/melissa-gallego.jpg',
    bio: 'With more than 37 years of leadership in the insurance industry, Melissa is a respected executive, educator, and community leader advancing professional excellence across the Caribbean. A founding member of the Insurance Institute of Belize, she has served as its President and as President and Treasurer of the Association of Insurance Institutes of the Caribbean. She teaches insurance courses and serves numerous civic and faith-based organizations, exemplifying compassionate leadership and lifelong learning.',
    linkedin: 'https://www.linkedin.com/in/melissa-gallego-2125716/',
  },
  {
    name: 'Ruchira Palliyaguruge',
    role: 'Youth Leadership Through Sport · ICC International Umpire',
    country: 'Sri Lanka',
    img: '/images/people/ruchira-palliyaguruge.jpg',
    bio: 'An internationally respected cricket leader, former first-class cricketer, and ICC International Panel umpire, Ruchira has officiated more than 100 One Day Internationals, Test matches, and ICC World Cup competitions. He holds a Master of Science in Performance Enhancement in Sports Officiating from Edinburgh Napier University. He champions sport as a platform for developing character, resilience, and ethical leadership in young people worldwide.',
  },
  {
    name: 'James J. Ojo',
    role: 'Founder, Destiny Connect Foundation',
    country: 'South Africa',
    img: '/images/people/james-ojo.jpg',
    bio: "A social-impact leader and entrepreneur, James founds and leads Destiny Connect Foundation, advancing leadership and human-capital development. Through its 3C's Mastermind Program™, he has equipped more than 350 emerging leaders across 15+ countries with the communication, collaboration, and leadership skills to create lasting change. He believes the world's greatest untapped resource is human potential.",
    linkedin: 'https://www.linkedin.com/in/jamesojo/',
  },
  {
    name: 'Kunle Pelemo',
    role: 'Founder, Empower Mental Drive Foundation',
    country: 'Nigeria',
    img: '/images/people/kunle-pelemo.jpg',
    bio: 'A global mental-health advocate, business strategist, and social-impact leader with over 15 years of experience, Kunle (fondly called KP) founds the Empower Mental Drive Foundation, championing mental-health awareness and psychosocial wellbeing across Africa. Recognized for his systems thinking, he partners with organizations to build resilient communities and empower young people through leadership and entrepreneurship.',
    linkedin: 'https://www.linkedin.com/in/kunlepelemo/',
  },
  {
    name: 'Margaret “Mags” Bourke',
    role: 'Global Treasurer, Duracell',
    country: 'United Kingdom',
    img: '/images/people/margaret-bourke.jpg',
    bio: 'Margaret is Global Treasurer at Duracell, a Berkshire Hathaway company, leading cash management, FX, payments, and treasury systems across North America, Europe, Asia, and Latin America. With over 30 years of treasury experience across many sectors and global markets, she champions AI adoption across treasury operations and is an active voice in the treasury and fintech community.',
    linkedin: 'https://www.linkedin.com/in/margaret-bourke-7bb65738/',
  },
  {
    name: 'Neeraja Ganesh',
    role: "Leadership & Women's Empowerment Coach",
    country: 'India',
    img: '/images/people/neeraja-ganesh.jpg',
    bio: 'A three-time Top 100 Thought Leader (Thinkers360), Neeraja moved from a 25-year career in IT to become a champion of leadership development and gender advocacy. She transforms mindsets through mentoring, coaching, and workshops — helping women move beyond impostor syndrome, perfectionism, and self-doubt to lead with confidence.',
    linkedin: 'https://www.linkedin.com/in/neeraja-ganesh/',
  },
];

/** EnnobleRise Global Trust™ Ambassadors — Youth · Educators · Women */
export const ambassadors: Ambassador[] = [
  {
    category: 'Youth',
    name: 'Rhojani Manzanero',
    role: 'Youth Ennoblement Lead',
    country: 'Belize',
    img: '/images/people/rhojani-manzanero.jpg',
    bio: 'A Marketing and Media Communication student at Sacred Heart College and an aspiring entrepreneur building an AI-powered media startup, Rhojani serves as Youth Ennoblement Lead for Belize. She champions youth leadership, personal growth, and community engagement — representing a new generation of purpose-driven innovators who believe technology, creativity, and human values build stronger communities.',
    linkedin: 'https://www.linkedin.com/in/rhojani-manzanero-88461740a/',
  },
  {
    category: 'Educator',
    name: 'Patricia “Trish” Wilkinson',
    role: 'The Empowered School Project',
    country: 'United States',
    img: '/images/people/patricia-wilkinson.jpg',
    bio: 'Patricia facilitates The Empowered School Project to restore joy in education and boost students’ learning — socially, emotionally, and academically. Coauthor of the Readers’ Choice winner “Brain Stages: How to Raise Smart, Confident Kids and Have Fun Doing It,” she spent 23 years in the classroom developing proven techniques to help children become their best selves.',
    website: 'https://thebrainstages.com',
  },
  {
    category: 'Women',
    name: 'Karen Gray',
    role: 'ICF-Certified Executive Coach (PCC) & Identity Architect',
    country: 'United States',
    img: '/images/people/karen-gray.jpg',
    bio: "An ICF-certified executive coach, speaker, and Identity Architect, Karen helps women see their purpose beyond their past. From young leaders finding their voice to executives redefining their next chapter, she helps women reclaim their identity so they can choose their future. Her mission is simple: no woman should have to sacrifice herself to succeed.",
    linkedin: 'https://www.linkedin.com/in/coachkarengray/',
    website: 'https://www.coachkarengray.com/',
  },
];
