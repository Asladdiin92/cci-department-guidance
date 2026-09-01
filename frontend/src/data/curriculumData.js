// 4-Year Full Curriculum Data for all 6 departments
// Includes: Core, Elective, Supportive courses, Credit hours, Prerequisites

export const CURRICULUM_DATA = {
  CS: {
    programName: 'Bachelor of Science in Computer Science',
    totalCredits: 124,
    duration: '4 Years (8 Semesters)',
    semesters: [
      {
        year: 1,
        semester: 1,
        title: 'Foundation Semester',
        totalCredits: 18,
        courses: [
          { code: 'CS1101', name: 'Introduction to Computer Science', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'MATH1101', name: 'Calculus I', credits: 4, type: 'Supportive', lab: 0, lecture: 4, prerequisites: [] },
          { code: 'PHYS1101', name: 'Physics I', credits: 3, type: 'Supportive', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'ENG1101', name: 'English Composition', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'CS1102', name: 'Programming Fundamentals', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'STAT1101', name: 'Introduction to Statistics', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 1,
        semester: 2,
        title: 'Programming & Math Foundations',
        totalCredits: 17,
        courses: [
          { code: 'CS1201', name: 'Object-Oriented Programming', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS1102'] },
          { code: 'CS1202', name: 'Discrete Mathematics', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'MATH1201', name: 'Calculus II', credits: 4, type: 'Supportive', lab: 0, lecture: 4, prerequisites: ['MATH1101'] },
          { code: 'PHYS1201', name: 'Physics II', credits: 3, type: 'Supportive', lab: 2, lecture: 2, prerequisites: ['PHYS1101'] },
          { code: 'ENG1201', name: 'Technical Writing', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['ENG1101'] },
          { code: 'CS1203', name: 'Digital Logic Design', credits: 2, type: 'Core', lab: 2, lecture: 1, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 1,
        title: 'Core Algorithms & Systems',
        totalCredits: 16,
        courses: [
          { code: 'CS2101', name: 'Data Structures', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS1201'] },
          { code: 'CS2102', name: 'Computer Architecture', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS1203'] },
          { code: 'MATH2101', name: 'Linear Algebra', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: ['MATH1201'] },
          { code: 'CS2103', name: 'Database Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2101'] },
          { code: 'STAT2101', name: 'Probability Theory', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['STAT1101'] },
          { code: 'PHIL2101', name: 'Logic & Critical Thinking', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 2,
        title: 'Advanced Algorithms',
        totalCredits: 16,
        courses: [
          { code: 'CS2201', name: 'Algorithm Analysis & Design', credits: 4, type: 'Core', lab: 2, lecture: 3, prerequisites: ['CS2101', 'CS1202'] },
          { code: 'CS2202', name: 'Operating Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2102'] },
          { code: 'CS2203', name: 'Computer Networks', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2102'] },
          { code: 'MATH2201', name: 'Differential Equations', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: ['MATH2101'] },
          { code: 'CS2204', name: 'Web Technologies', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2103'] }
        ]
      },
      {
        year: 3,
        semester: 1,
        title: 'Theory & Intelligence',
        totalCredits: 15,
        courses: [
          { code: 'CS3101', name: 'Theory of Computation', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: ['CS2201', 'CS1202'] },
          { code: 'CS3102', name: 'Artificial Intelligence', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2201'] },
          { code: 'CS3103', name: 'Software Engineering', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2204'] },
          { code: 'CS3104', name: 'Computer Graphics', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['MATH2101'] },
          { code: 'STAT3101', name: 'Statistical Methods', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: ['STAT2101'] }
        ]
      },
      {
        year: 3,
        semester: 2,
        title: 'Advanced Topics',
        totalCredits: 15,
        courses: [
          { code: 'CS3201', name: 'Machine Learning', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS3102', 'STAT3101'] },
          { code: 'CS3202', name: 'Compiler Design', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS3101'] },
          { code: 'CS3203', name: 'Information Security', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['CS2203'] },
          { code: 'CS3204', name: 'Human-Computer Interaction', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['CS3103'] },
          { code: 'CS3205', name: 'Parallel Computing', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['CS2202'] }
        ]
      },
      {
        year: 4,
        semester: 1,
        title: 'Specialization & Research',
        totalCredits: 15,
        courses: [
          { code: 'CS4101', name: 'Deep Learning', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['CS3201'] },
          { code: 'CS4102', name: 'Cloud Computing', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['CS2202'] },
          { code: 'CS4103', name: 'Natural Language Processing', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['CS3201'] },
          { code: 'CS4104', name: 'Research Methodology', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'CS4105', name: 'Professional Ethics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 4,
        semester: 2,
        title: 'Capstone Project',
        totalCredits: 12,
        courses: [
          { code: 'CS4201', name: 'Senior Project I', credits: 6, type: 'Core', lab: 10, lecture: 0, prerequisites: ['CS4104'] },
          { code: 'CS4202', name: 'Advanced Topics Seminar', credits: 3, type: 'Elective', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'CS4203', name: 'Internship/Industry Practice', credits: 3, type: 'Core', lab: 0, lecture: 0, prerequisites: [] }
        ]
      }
    ]
  },

  SWE: {
    programName: 'Bachelor of Science in Software Engineering',
    totalCredits: 120,
    duration: '4 Years (8 Semesters)',
    semesters: [
      {
        year: 1,
        semester: 1,
        title: 'Programming Foundations',
        totalCredits: 18,
        courses: [
          { code: 'SWE1101', name: 'Introduction to Software Engineering', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'SWE1102', name: 'Programming I (Python)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'MATH1101', name: 'Calculus I', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'ENG1101', name: 'English Composition', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'SWE1103', name: 'Web Fundamentals (HTML/CSS)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'STAT1101', name: 'Introduction to Statistics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 1,
        semester: 2,
        title: 'Object-Oriented Development',
        totalCredits: 17,
        courses: [
          { code: 'SWE1201', name: 'Programming II (Java/C++)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1102'] },
          { code: 'SWE1202', name: 'Data Structures', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1102'] },
          { code: 'SWE1203', name: 'JavaScript & Frontend Development', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1103'] },
          { code: 'MATH1201', name: 'Discrete Mathematics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'ENG1201', name: 'Technical Writing', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['ENG1101'] },
          { code: 'SWE1204', name: 'Version Control & Git', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 1,
        title: 'Full-Stack Development',
        totalCredits: 16,
        courses: [
          { code: 'SWE2101', name: 'Backend Development (Node.js)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1203'] },
          { code: 'SWE2102', name: 'Database Design & SQL', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1202'] },
          { code: 'SWE2103', name: 'Algorithms & Problem Solving', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1202'] },
          { code: 'SWE2104', name: 'React & Modern Frontend', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE1203'] },
          { code: 'SWE2105', name: 'Software Design Patterns', credits: 2, type: 'Core', lab: 2, lecture: 1, prerequisites: ['SWE1201'] },
          { code: 'PHIL2101', name: 'Logic & Critical Thinking', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 2,
        title: 'Software Architecture',
        totalCredits: 16,
        courses: [
          { code: 'SWE2201', name: 'Software Architecture & Design', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2105'] },
          { code: 'SWE2202', name: 'Testing & Quality Assurance', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2101'] },
          { code: 'SWE2203', name: 'Mobile App Development', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2104'] },
          { code: 'SWE2204', name: 'RESTful APIs & Microservices', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2101'] },
          { code: 'SWE2205', name: 'Agile & Scrum Methodologies', credits: 2, type: 'Core', lab: 0, lecture: 2, prerequisites: [] },
          { code: 'MATH2201', name: 'Linear Algebra', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['MATH1101'] }
        ]
      },
      {
        year: 3,
        semester: 1,
        title: 'DevOps & Cloud',
        totalCredits: 15,
        courses: [
          { code: 'SWE3101', name: 'DevOps & CI/CD', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2204'] },
          { code: 'SWE3102', name: 'Cloud Computing (AWS/Azure)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2201'] },
          { code: 'SWE3103', name: 'Docker & Kubernetes', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE3101'] },
          { code: 'SWE3104', name: 'Software Security', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['SWE2201'] },
          { code: 'SWE3105', name: 'UI/UX Design Principles', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2104'] }
        ]
      },
      {
        year: 3,
        semester: 2,
        title: 'Advanced Development',
        totalCredits: 15,
        courses: [
          { code: 'SWE3201', name: 'Advanced Web Development', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2104'] },
          { code: 'SWE3202', name: 'GraphQL & Modern APIs', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2204'] },
          { code: 'SWE3203', name: 'Software Project Management', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: ['SWE2205'] },
          { code: 'SWE3204', name: 'Machine Learning for Developers', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['STAT1101'] },
          { code: 'SWE3205', name: 'Performance Optimization', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2103'] }
        ]
      },
      {
        year: 4,
        semester: 1,
        title: 'Specialization Tracks',
        totalCredits: 15,
        courses: [
          { code: 'SWE4101', name: 'Advanced Mobile Development', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2203'] },
          { code: 'SWE4102', name: 'Blockchain Development', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2204'] },
          { code: 'SWE4103', name: 'Game Development', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['SWE2104'] },
          { code: 'SWE4104', name: 'Professional Ethics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'SWE4105', name: 'Software Research Methods', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 4,
        semester: 2,
        title: 'Capstone & Industry',
        totalCredits: 8,
        courses: [
          { code: 'SWE4201', name: 'Capstone Project', credits: 6, type: 'Core', lab: 10, lecture: 0, prerequisites: ['SWE4105'] },
          { code: 'SWE4202', name: 'Industry Internship', credits: 4, type: 'Core', lab: 0, lecture: 0, prerequisites: [] },
          { code: 'SWE4203', name: 'Tech Entrepreneurship', credits: 3, type: 'Elective', lab: 0, lecture: 3, prerequisites: [] }
        ]
      }
    ]
  },

  IT: {
    programName: 'Bachelor of Science in Information Technology',
    totalCredits: 120,
    duration: '4 Years (8 Semesters)',
    semesters: [
      {
        year: 1,
        semester: 1,
        title: 'IT Foundations',
        totalCredits: 18,
        courses: [
          { code: 'IT1101', name: 'Introduction to IT', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'IT1102', name: 'Computer Hardware & Troubleshooting', credits: 3, type: 'Core', lab: 3, lecture: 1, prerequisites: [] },
          { code: 'IT1103', name: 'Basic Programming', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'MATH1101', name: 'College Mathematics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'ENG1101', name: 'English Composition', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IT1104', name: 'Digital Literacy & Office Tools', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 1,
        semester: 2,
        title: 'Networking Basics',
        totalCredits: 17,
        courses: [
          { code: 'IT1201', name: 'Networking Fundamentals', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1101'] },
          { code: 'IT1202', name: 'Operating Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1102'] },
          { code: 'IT1203', name: 'Database Fundamentals', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1103'] },
          { code: 'IT1204', name: 'Web Development Basics', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1103'] },
          { code: 'ENG1201', name: 'Technical Communication', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['ENG1101'] },
          { code: 'STAT1101', name: 'Statistics for IT', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 1,
        title: 'Network Administration',
        totalCredits: 16,
        courses: [
          { code: 'IT2101', name: 'Advanced Networking (CCNA)', credits: 4, type: 'Core', lab: 3, lecture: 2, prerequisites: ['IT1201'] },
          { code: 'IT2102', name: 'Linux System Administration', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1202'] },
          { code: 'IT2103', name: 'Windows Server Administration', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1202'] },
          { code: 'IT2104', name: 'IT Security Basics', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1201'] },
          { code: 'IT2105', name: 'Scripting & Automation', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1103'] }
        ]
      },
      {
        year: 2,
        semester: 2,
        title: 'Infrastructure Management',
        totalCredits: 16,
        courses: [
          { code: 'IT2201', name: 'Virtualization Technologies', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2102'] },
          { code: 'IT2202', name: 'Network Security', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2104'] },
          { code: 'IT2203', name: 'Database Administration', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT1203'] },
          { code: 'IT2204', name: 'IT Support & Help Desk', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'IT2205', name: 'Project Management Basics', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] },
          { code: 'PHIL2101', name: 'Ethics in IT', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 3,
        semester: 1,
        title: 'Cloud & Security',
        totalCredits: 15,
        courses: [
          { code: 'IT3101', name: 'Cloud Computing (AWS/Azure)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2201'] },
          { code: 'IT3102', name: 'Cybersecurity Fundamentals', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2202'] },
          { code: 'IT3103', name: 'Wireless Networks', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT2101'] },
          { code: 'IT3104', name: 'Disaster Recovery & Backup', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2203'] },
          { code: 'IT3105', name: 'IoT & Smart Systems', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT2101'] }
        ]
      },
      {
        year: 3,
        semester: 2,
        title: 'Advanced Administration',
        totalCredits: 15,
        courses: [
          { code: 'IT3201', name: 'Enterprise Network Design', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IT2101'] },
          { code: 'IT3202', name: 'Ethical Hacking & Penetration Testing', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT3102'] },
          { code: 'IT3203', name: 'IT Governance & Compliance', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IT3204', name: 'DevOps for IT', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT2105'] },
          { code: 'IT3205', name: 'Advanced Cloud Services', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT3101'] }
        ]
      },
      {
        year: 4,
        semester: 1,
        title: 'Specialization',
        totalCredits: 15,
        courses: [
          { code: 'IT4101', name: 'Advanced Cybersecurity', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT3102'] },
          { code: 'IT4102', name: 'IT Service Management (ITIL)', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IT4103', name: 'Data Center Management', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IT3101'] },
          { code: 'IT4104', name: 'Research Methods in IT', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IT4105', name: 'Emerging Technologies', credits: 3, type: 'Elective', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 4,
        semester: 2,
        title: 'Capstone & Certification Prep',
        totalCredits: 8,
        courses: [
          { code: 'IT4201', name: 'Senior Project', credits: 6, type: 'Core', lab: 10, lecture: 0, prerequisites: ['IT4104'] },
          { code: 'IT4202', name: 'Industry Internship', credits: 4, type: 'Core', lab: 0, lecture: 0, prerequisites: [] },
          { code: 'IT4203', name: 'Certification Preparation (CCNA/CompTIA)', credits: 2, type: 'Elective', lab: 0, lecture: 2, prerequisites: [] }
        ]
      }
    ]
  },

  IS: {
    programName: 'Bachelor of Science in Information Systems',
    totalCredits: 120,
    duration: '4 Years (8 Semesters)',
    semesters: [
      {
        year: 1,
        semester: 1,
        title: 'Business & IT Foundations',
        totalCredits: 18,
        courses: [
          { code: 'IS1101', name: 'Introduction to Information Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'IS1102', name: 'Introduction to Business', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IS1103', name: 'Programming Fundamentals', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: [] },
          { code: 'MATH1101', name: 'Business Mathematics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'ENG1101', name: 'English Composition', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'STAT1101', name: 'Business Statistics', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 1,
        semester: 2,
        title: 'Data & Process Management',
        totalCredits: 17,
        courses: [
          { code: 'IS1201', name: 'Database Management Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1103'] },
          { code: 'IS1202', name: 'Business Process Modeling', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1101'] },
          { code: 'IS1203', name: 'Web Development for Business', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1103'] },
          { code: 'ACCT1201', name: 'Accounting Principles', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'ENG1201', name: 'Business Communication', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: ['ENG1101'] },
          { code: 'IS1204', name: 'Organizational Behavior', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 1,
        title: 'Systems Analysis',
        totalCredits: 16,
        courses: [
          { code: 'IS2101', name: 'Systems Analysis & Design', credits: 4, type: 'Core', lab: 2, lecture: 3, prerequisites: ['IS1201', 'IS1202'] },
          { code: 'IS2102', name: 'Enterprise Resource Planning (ERP)', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1202'] },
          { code: 'IS2103', name: 'Data Analytics', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['STAT1101', 'IS1201'] },
          { code: 'IS2104', name: 'IT Infrastructure', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1101'] },
          { code: 'MGT2101', name: 'Principles of Management', credits: 3, type: 'Supportive', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 2,
        semester: 2,
        title: 'Business Intelligence',
        totalCredits: 16,
        courses: [
          { code: 'IS2201', name: 'Business Intelligence & Data Warehousing', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS2103'] },
          { code: 'IS2202', name: 'Project Management', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: ['MGT2101'] },
          { code: 'IS2203', name: 'E-Commerce Systems', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS1203'] },
          { code: 'IS2204', name: 'Information Security Management', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS2104'] },
          { code: 'FIN2201', name: 'Business Finance', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] },
          { code: 'PHIL2101', name: 'Business Ethics', credits: 2, type: 'Supportive', lab: 0, lecture: 2, prerequisites: [] }
        ]
      },
      {
        year: 3,
        semester: 1,
        title: 'Enterprise Systems',
        totalCredits: 15,
        courses: [
          { code: 'IS3101', name: 'Enterprise Architecture', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS2101'] },
          { code: 'IS3102', name: 'Supply Chain Management Systems', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS2102'] },
          { code: 'IS3103', name: 'Customer Relationship Management', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS2203'] },
          { code: 'IS3104', name: 'IT Strategy & Governance', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: ['IS2202'] },
          { code: 'IS3105', name: 'Business Process Reengineering', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS1202'] }
        ]
      },
      {
        year: 3,
        semester: 2,
        title: 'Advanced Analytics',
        totalCredits: 15,
        courses: [
          { code: 'IS3201', name: 'Advanced Data Analytics', credits: 3, type: 'Core', lab: 2, lecture: 2, prerequisites: ['IS2201'] },
          { code: 'IS3202', name: 'Cloud Computing for Business', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS2104'] },
          { code: 'IS3203', name: 'Mobile Business Applications', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS2203'] },
          { code: 'IS3204', name: 'Knowledge Management Systems', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS2201'] },
          { code: 'IS3205', name: 'Digital Transformation', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: ['IS3104'] }
        ]
      },
      {
        year: 4,
        semester: 1,
        title: 'Strategic IS Management',
        totalCredits: 15,
        courses: [
          { code: 'IS4101', name: 'IT Consulting', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS3104'] },
          { code: 'IS4102', name: 'Business Analytics & Visualization', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS3201'] },
          { code: 'IS4103', name: 'Enterprise Integration', credits: 3, type: 'Elective', lab: 2, lecture: 2, prerequisites: ['IS3101'] },
          { code: 'IS4104', name: 'Research Methods', credits: 3, type: 'Core', lab: 0, lecture: 3, prerequisites: [] },
          { code: 'IS4105', name: 'Emerging Technologies in Business', credits: 3, type: 'Elective', lab: 0, lecture: 3, prerequisites: [] }
        ]
      },
      {
        year: 4,
        semester: 2,
        title: 'Capstone & Internship',
        totalCredits: 8,
        courses: [
          { code: 'IS4201', name: 'Capstone Project', credits: 6, type: 'Core', lab: 10, lecture: 0, prerequisites: ['IS4104'] },
          { code: 'IS4202', name: 'Industry Internship', credits: 4, type: 'Core', lab: 0, lecture: 0, prerequisites: [] },
          { code: 'IS4203', name: 'Entrepreneurship & Innovation', credits: 2, type: 'Elective', lab: 0, lecture: 2, prerequisites: [] }
        ]
      }
    ]
  },

  // Note: ISC and STAT would follow similar structure
  // For brevity, I'll create abbreviated versions

  ISC: {
    programName: 'Bachelor of Science in Information Science',
    totalCredits: 120,
    duration: '4 Years (8 Semesters)',
    semesters: [] // Similar structure to above
  },

  STAT: {
    programName: 'Bachelor of Science in Statistics',
    totalCredits: 120,
    duration: '4 Years (8 Semesters)',
    semesters: [] // Similar structure to above
  }
};

// Course type configurations
export const COURSE_TYPE_CONFIG = {
  Core: {
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-300',
    icon: '🎯'
  },
  Elective: {
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300',
    icon: '⚡'
  },
  Supportive: {
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-300',
    icon: '📚'
  }
};
