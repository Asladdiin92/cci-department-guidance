// Department comparison intensity metrics and key differentiators

export const INTENSITY_METRICS = {
  CS: {
    math: 95,          // 0-100 scale
    coding: 85,
    business: 10,
    hardware: 30,
    theory: 90,
    practical: 40
  },
  SWE: {
    math: 55,
    coding: 95,
    business: 30,
    hardware: 20,
    theory: 35,
    practical: 95
  },
  IT: {
    math: 25,
    coding: 50,
    business: 40,
    hardware: 90,
    theory: 20,
    practical: 95
  },
  IS: {
    math: 30,
    coding: 50,
    business: 90,
    hardware: 15,
    theory: 40,
    practical: 85
  },
  ISC: {
    math: 20,
    coding: 35,
    business: 60,
    hardware: 10,
    theory: 60,
    practical: 70
  },
  STAT: {
    math: 98,
    coding: 60,
    business: 45,
    hardware: 5,
    theory: 85,
    practical: 60
  }
};

export const KEY_DIFFERENTIATORS = {
  'CS_vs_SWE': {
    title: 'Computer Science vs. Software Engineering',
    cs: {
      focus: 'Algorithms & Theory',
      strengths: [
        'Deep mathematical and theoretical foundations',
        'Algorithm design and optimization',
        'Research and graduate school preparation',
        'Artificial Intelligence and Machine Learning theory',
        'Computational complexity and formal methods'
      ],
      bestFor: 'Students who love math, theory, and want research careers or graduate studies'
    },
    swe: {
      focus: 'Software Architecture & Development Lifecycle',
      strengths: [
        'Practical software development skills',
        'Modern frameworks and industry tools',
        'Agile methodologies and team collaboration',
        'DevOps and deployment automation',
        'Full-stack development and project management'
      ],
      bestFor: 'Students who want to build applications and work in software industry immediately'
    }
  },
  
  'IT_vs_IS': {
    title: 'Information Technology vs. Information Systems',
    it: {
      focus: 'Hardware/Networking Infrastructure',
      strengths: [
        'Network administration and security',
        'Systems administration and troubleshooting',
        'Cloud infrastructure and virtualization',
        'Hands-on hardware and server management',
        'Cybersecurity and ethical hacking'
      ],
      bestFor: 'Students who enjoy hands-on tech work, fixing problems, and managing infrastructure'
    },
    is: {
      focus: 'Enterprise Process Optimization',
      strengths: [
        'Business process analysis and improvement',
        'Enterprise systems (ERP, CRM)',
        'Database design and business intelligence',
        'IT project management',
        'Bridging business and technology needs'
      ],
      bestFor: 'Students who like both business and technology, and want to work in organizational settings'
    }
  },
  
  'STAT_vs_CS': {
    title: 'Statistics vs. Computer Science',
    stat: {
      focus: 'Mathematical Modeling & Data Analysis',
      strengths: [
        'Statistical theory and probability',
        'Data analysis and interpretation',
        'Research methodology and experimental design',
        'Applicable across all fields (business, health, science)',
        'Evidence-based decision making'
      ],
      bestFor: 'Students who love math, data, and want versatility across industries'
    },
    cs: {
      focus: 'Computational Engineering',
      strengths: [
        'Algorithm design and implementation',
        'Software systems development',
        'AI and machine learning engineering',
        'Computer systems and architecture',
        'Computational problem solving'
      ],
      bestFor: 'Students who want to build intelligent systems and software solutions'
    }
  },
  
  'STAT_vs_IS': {
    title: 'Statistics vs. Information Systems',
    stat: {
      focus: 'Mathematical Modeling',
      strengths: [
        'Pure statistical analysis',
        'Mathematical rigor',
        'Research and academia focus',
        'Data science foundations',
        'Probability and inference'
      ],
      bestFor: 'Math lovers who want analytical careers in any field'
    },
    is: {
      focus: 'Business Technology Integration',
      strengths: [
        'Applied business analytics',
        'Organizational systems',
        'Process automation',
        'Less math, more business context',
        'Project and people management'
      ],
      bestFor: 'Students who prefer business applications over pure math'
    }
  }
};

export const COMPARISON_CATEGORIES = [
  {
    id: 'focus',
    name: 'Primary Focus',
    icon: '🎯',
    description: 'What the program emphasizes most'
  },
  {
    id: 'math',
    name: 'Math Intensity',
    icon: '📐',
    description: 'Level of mathematical rigor required'
  },
  {
    id: 'coding',
    name: 'Coding Level',
    icon: '💻',
    description: 'Amount of programming work'
  },
  {
    id: 'business',
    name: 'Business Focus',
    icon: '📊',
    description: 'Business and organizational emphasis'
  },
  {
    id: 'hardware',
    name: 'Hardware/Infrastructure',
    icon: '🖥️',
    description: 'Physical systems and infrastructure work'
  },
  {
    id: 'theory',
    name: 'Theory vs Practice',
    icon: '📚',
    description: 'Theoretical vs hands-on balance'
  }
];

// Quick comparison snippets for common combos
export const QUICK_COMPARISONS = {
  'CS-SWE': 'CS: Theory & Algorithms | SWE: Building & Deployment',
  'CS-STAT': 'CS: Algorithms & Systems | STAT: Data & Statistics',
  'IT-IS': 'IT: Infrastructure & Networks | IS: Business & Processes',
  'SWE-IT': 'SWE: Application Development | IT: System Administration',
  'IS-ISC': 'IS: Enterprise Systems | ISC: Information Architecture',
  'CS-IS': 'CS: Computing Theory | IS: Business Technology',
  'SWE-IS': 'SWE: Software Products | IS: Business Solutions',
  'STAT-IS': 'STAT: Mathematical Analysis | IS: Business Analytics'
};

// Department full names for dropdown
export const DEPARTMENT_OPTIONS = [
  { code: 'CS', name: 'Computer Science', color: 'blue' },
  { code: 'SWE', name: 'Software Engineering', color: 'green' },
  { code: 'IT', name: 'Information Technology', color: 'orange' },
  { code: 'IS', name: 'Information Systems', color: 'yellow' },
  { code: 'ISC', name: 'Information Science', color: 'purple' },
  { code: 'STAT', name: 'Statistics', color: 'cyan' }
];
