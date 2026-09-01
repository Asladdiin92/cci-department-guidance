// Career pathway data for all departments
// Includes job titles, salary bands (ETB), and Ethiopian employers

export const CAREER_PATHWAYS = {
  CS: {
    careers: [
      {
        title: 'Software Engineer',
        entryLevel: '25,000 - 40,000',
        seniorLevel: '80,000 - 150,000',
        description: 'Design and develop software applications'
      },
      {
        title: 'Machine Learning Engineer',
        entryLevel: '35,000 - 55,000',
        seniorLevel: '100,000 - 200,000',
        description: 'Build AI/ML models and intelligent systems'
      },
      {
        title: 'Research Scientist',
        entryLevel: '30,000 - 50,000',
        seniorLevel: '90,000 - 180,000',
        description: 'Conduct research in computer science and AI'
      },
      {
        title: 'Algorithm Engineer',
        entryLevel: '30,000 - 45,000',
        seniorLevel: '85,000 - 160,000',
        description: 'Optimize algorithms for performance and efficiency'
      },
      {
        title: 'Data Scientist',
        entryLevel: '35,000 - 50,000',
        seniorLevel: '95,000 - 175,000',
        description: 'Extract insights from complex datasets'
      }
    ],
    employers: [
      { name: 'Safaricom Ethiopia', type: 'Telecom', logo: '📱' },
      { name: 'INSA (Information Network Security Agency)', type: 'Government', logo: '🛡️' },
      { name: 'Gebeya', type: 'Tech Startup', logo: '🚀' },
      { name: 'Ethiopian Airlines IT', type: 'Aviation', logo: '✈️' },
      { name: 'iCog Labs', type: 'AI Research', logo: '🤖' }
    ]
  },
  
  SWE: {
    careers: [
      {
        title: 'Full-Stack Developer',
        entryLevel: '22,000 - 38,000',
        seniorLevel: '75,000 - 140,000',
        description: 'Build complete web applications from front to back'
      },
      {
        title: 'Mobile App Developer',
        entryLevel: '25,000 - 40,000',
        seniorLevel: '80,000 - 145,000',
        description: 'Create iOS and Android applications'
      },
      {
        title: 'DevOps Engineer',
        entryLevel: '30,000 - 45,000',
        seniorLevel: '85,000 - 160,000',
        description: 'Automate deployment and manage infrastructure'
      },
      {
        title: 'QA Engineer',
        entryLevel: '20,000 - 35,000',
        seniorLevel: '65,000 - 120,000',
        description: 'Ensure software quality through testing'
      },
      {
        title: 'Technical Lead',
        entryLevel: '40,000 - 60,000',
        seniorLevel: '100,000 - 180,000',
        description: 'Lead development teams and architecture decisions'
      }
    ],
    employers: [
      { name: 'Ride (Dodai)', type: 'Tech Startup', logo: '🚗' },
      { name: 'Telebirr', type: 'FinTech', logo: '💰' },
      { name: 'Kifiya Financial Technology', type: 'FinTech', logo: '🏦' },
      { name: 'Ethio Telecom', type: 'Telecom', logo: '📡' },
      { name: 'Gebeya', type: 'Tech Talent', logo: '💼' }
    ]
  },
  
  IT: {
    careers: [
      {
        title: 'Network Administrator',
        entryLevel: '18,000 - 32,000',
        seniorLevel: '60,000 - 110,000',
        description: 'Manage and maintain computer networks'
      },
      {
        title: 'Systems Administrator',
        entryLevel: '20,000 - 35,000',
        seniorLevel: '65,000 - 120,000',
        description: 'Configure and support IT infrastructure'
      },
      {
        title: 'Cybersecurity Specialist',
        entryLevel: '28,000 - 42,000',
        seniorLevel: '80,000 - 150,000',
        description: 'Protect systems from cyber threats'
      },
      {
        title: 'Cloud Engineer',
        entryLevel: '30,000 - 45,000',
        seniorLevel: '85,000 - 155,000',
        description: 'Deploy and manage cloud infrastructure'
      },
      {
        title: 'IT Support Specialist',
        entryLevel: '15,000 - 25,000',
        seniorLevel: '45,000 - 85,000',
        description: 'Provide technical support to users'
      }
    ],
    employers: [
      { name: 'Commercial Bank of Ethiopia (CBE)', type: 'Banking', logo: '🏛️' },
      { name: 'Ethio Telecom', type: 'Telecom', logo: '📡' },
      { name: 'Ethiopian Electric Power', type: 'Utility', logo: '⚡' },
      { name: 'Awash Bank', type: 'Banking', logo: '🏦' },
      { name: 'INSA', type: 'Government', logo: '🛡️' }
    ]
  },
  
  IS: {
    careers: [
      {
        title: 'Business Analyst',
        entryLevel: '22,000 - 36,000',
        seniorLevel: '70,000 - 130,000',
        description: 'Bridge business needs and IT solutions'
      },
      {
        title: 'ERP Consultant',
        entryLevel: '25,000 - 40,000',
        seniorLevel: '75,000 - 140,000',
        description: 'Implement enterprise resource planning systems'
      },
      {
        title: 'Database Administrator',
        entryLevel: '23,000 - 38,000',
        seniorLevel: '72,000 - 135,000',
        description: 'Manage and optimize databases'
      },
      {
        title: 'IT Project Manager',
        entryLevel: '28,000 - 45,000',
        seniorLevel: '80,000 - 150,000',
        description: 'Lead IT projects and teams'
      },
      {
        title: 'Systems Analyst',
        entryLevel: '24,000 - 38,000',
        seniorLevel: '73,000 - 137,000',
        description: 'Analyze and improve information systems'
      }
    ],
    employers: [
      { name: 'CBE (Commercial Bank of Ethiopia)', type: 'Banking', logo: '🏛️' },
      { name: 'Dashen Bank', type: 'Banking', logo: '🏦' },
      { name: 'Ethiopian Revenues & Customs Authority', type: 'Government', logo: '🏢' },
      { name: 'Oromia Bank', type: 'Banking', logo: '💼' },
      { name: 'Abyssinia Bank', type: 'Banking', logo: '🏦' }
    ]
  },
  
  ISC: {
    careers: [
      {
        title: 'Information Architect',
        entryLevel: '20,000 - 35,000',
        seniorLevel: '65,000 - 120,000',
        description: 'Design information structures and systems'
      },
      {
        title: 'UX/UI Designer',
        entryLevel: '22,000 - 38,000',
        seniorLevel: '70,000 - 130,000',
        description: 'Create user-centered digital experiences'
      },
      {
        title: 'Digital Librarian',
        entryLevel: '18,000 - 30,000',
        seniorLevel: '55,000 - 100,000',
        description: 'Manage digital collections and resources'
      },
      {
        title: 'Content Manager',
        entryLevel: '20,000 - 32,000',
        seniorLevel: '60,000 - 110,000',
        description: 'Organize and curate digital content'
      },
      {
        title: 'Knowledge Manager',
        entryLevel: '23,000 - 37,000',
        seniorLevel: '68,000 - 125,000',
        description: 'Manage organizational knowledge systems'
      }
    ],
    employers: [
      { name: 'Ethiopian Universities', type: 'Education', logo: '🎓' },
      { name: 'Ethiopian National Archives', type: 'Government', logo: '📚' },
      { name: 'Tech Startups', type: 'Private', logo: '🚀' },
      { name: 'NGOs & International Orgs', type: 'Non-Profit', logo: '🌍' },
      { name: 'Ministry of Education', type: 'Government', logo: '🏛️' }
    ]
  },
  
  STAT: {
    careers: [
      {
        title: 'Data Analyst',
        entryLevel: '23,000 - 38,000',
        seniorLevel: '72,000 - 135,000',
        description: 'Analyze data to support decision-making'
      },
      {
        title: 'Statistician',
        entryLevel: '25,000 - 40,000',
        seniorLevel: '75,000 - 140,000',
        description: 'Apply statistical methods to research'
      },
      {
        title: 'Data Scientist',
        entryLevel: '32,000 - 50,000',
        seniorLevel: '90,000 - 170,000',
        description: 'Extract insights using ML and statistics'
      },
      {
        title: 'Research Analyst',
        entryLevel: '22,000 - 36,000',
        seniorLevel: '68,000 - 128,000',
        description: 'Conduct statistical research and analysis'
      },
      {
        title: 'Quantitative Analyst',
        entryLevel: '28,000 - 45,000',
        seniorLevel: '82,000 - 155,000',
        description: 'Apply statistical models in finance'
      }
    ],
    employers: [
      { name: 'Central Statistical Agency (CSA)', type: 'Government', logo: '📊' },
      { name: 'Commercial Banks', type: 'Banking', logo: '🏦' },
      { name: 'Ethiopian Insurance Corporation', type: 'Insurance', logo: '🛡️' },
      { name: 'Research Institutes', type: 'Research', logo: '🔬' },
      { name: 'International Organizations', type: 'NGO', logo: '🌍' }
    ]
  }
};

// "Is this department for you?" self-check indicators
export const DEPARTMENT_FIT_CHECKLIST = {
  CS: [
    'You enjoy solving complex mathematical and logical problems',
    'You're curious about how algorithms and systems work at a fundamental level',
    'You want to pursue graduate studies or research in computing',
    'You're interested in artificial intelligence and machine learning',
    'You don't mind heavy theoretical coursework and proofs',
    'You prefer understanding "why" things work, not just "how"'
  ],
  
  SWE: [
    'You love building things and seeing your code come to life',
    'You enjoy working on team projects and collaboration',
    'You want to work in the software industry immediately after graduation',
    'You prefer practical, hands-on learning over theory',
    'You're excited about modern frameworks and development tools',
    'You want to create apps and websites people actually use'
  ],
  
  IT: [
    'You enjoy troubleshooting and fixing technical problems',
    'You're interested in networks, servers, and infrastructure',
    'You want a stable career with clear certification paths',
    'You prefer hands-on work with hardware and systems',
    'You like helping people solve technology issues',
    'You're organized and detail-oriented'
  ],
  
  IS: [
    'You're interested in both business and technology',
    'You enjoy analyzing processes and finding improvements',
    'You like working with databases and data management',
    'You want to bridge the gap between IT and business teams',
    'You're good at communication and stakeholder management',
    'You prefer working in structured, organizational environments'
  ],
  
  ISC: [
    'You're passionate about organizing and curating information',
    'You enjoy research and information retrieval',
    'You care about user experience and accessibility',
    'You like working with digital libraries and archives',
    'You're detail-oriented and enjoy metadata work',
    'You want to help people find and access information easily'
  ],
  
  STAT: [
    'You enjoy working with numbers and data',
    'You're comfortable with mathematics and probability',
    'You like discovering patterns and insights in data',
    'You want a versatile degree applicable to many fields',
    'You're interested in research methodology',
    'You enjoy critical thinking and evidence-based reasoning'
  ]
};

// Key traits for each department
export const KEY_TRAITS = {
  CS: {
    strengths: ['Mathematical thinking', 'Problem-solving', 'Logical reasoning', 'Research mindset'],
    interests: ['Algorithms', 'AI/ML', 'Theory', 'Research'],
    personality: ['Analytical', 'Detail-oriented', 'Patient', 'Curious']
  },
  
  SWE: {
    strengths: ['Programming', 'Teamwork', 'Practical thinking', 'Adaptability'],
    interests: ['Building apps', 'Web development', 'New technologies', 'User experience'],
    personality: ['Collaborative', 'Creative', 'Pragmatic', 'Fast learner']
  },
  
  IT: {
    strengths: ['Troubleshooting', 'Technical skills', 'Attention to detail', 'Patience'],
    interests: ['Networks', 'Security', 'Infrastructure', 'Hardware'],
    personality: ['Organized', 'Methodical', 'Helpful', 'Reliable']
  },
  
  IS: {
    strengths: ['Business analysis', 'Communication', 'Data management', 'Organization'],
    interests: ['Business processes', 'Databases', 'ERP systems', 'Management'],
    personality: ['Strategic', 'Communicative', 'Organized', 'Diplomatic']
  },
  
  ISC: {
    strengths: ['Organization', 'Research', 'Attention to detail', 'User focus'],
    interests: ['Information architecture', 'Libraries', 'UX design', 'Content'],
    personality: ['Meticulous', 'Helpful', 'Organized', 'User-centered']
  },
  
  STAT: {
    strengths: ['Mathematical skills', 'Analytical thinking', 'Data interpretation', 'Research'],
    interests: ['Data analysis', 'Statistics', 'Research', 'Patterns'],
    personality: ['Analytical', 'Methodical', 'Curious', 'Precise']
  }
};
