// Questions data structure
// Each question has scoring weights for each department (CS, SWE, IT, IS, STAT)

const questions = [
    {
        id: 1,
        text: "How do you prefer to solve problems?",
        options: [
            {
                text: "By understanding theoretical concepts and proving correctness",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "By building working prototypes and iterating on solutions",
                scores: { CS: 1, SWE: 3, IT: 2, IS: 1, STAT: 0 }
            },
            {
                text: "By following established procedures and best practices",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 1 }
            },
            {
                text: "By analyzing requirements and designing process flows",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 0 }
            }
        ]
    },
    {
        id: 2,
        text: "Which type of work appeals to you most?",
        options: [
            {
                text: "Designing algorithms and optimizing performance",
                scores: { CS: 3, SWE: 2, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Building complete software applications from scratch",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 0, STAT: 0 }
            },
            {
                text: "Managing networks, servers, and IT infrastructure",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Analyzing business needs and designing information systems",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Working with data analysis and statistical modeling",
                scores: { CS: 1, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 3,
        text: "How do you learn best?",
        options: [
            {
                text: "Reading research papers and understanding theoretical foundations",
                scores: { CS: 3, SWE: 0, IT: 0, IS: 1, STAT: 2 }
            },
            {
                text: "Building projects and learning through experimentation",
                scores: { CS: 1, SWE: 3, IT: 2, IS: 1, STAT: 1 }
            },
            {
                text: "Following tutorials and structured courses step-by-step",
                scores: { CS: 0, SWE: 2, IT: 3, IS: 2, STAT: 1 }
            },
            {
                text: "Analyzing case studies and real-world examples",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 2 }
            }
        ]
    },
    {
        id: 4,
        text: "What type of role interests you after graduation?",
        options: [
            {
                text: "Research Scientist or Algorithm Developer",
                scores: { CS: 3, SWE: 0, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Software Engineer or Full-Stack Developer",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 0, STAT: 0 }
            },
            {
                text: "Network Engineer or Systems Administrator",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Business Analyst or IT Consultant",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Data Scientist or Statistical Analyst",
                scores: { CS: 1, SWE: 1, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 5,
        text: "How comfortable are you with advanced mathematics?",
        options: [
            {
                text: "Very comfortable - I enjoy mathematical proofs and abstract theory",
                scores: { CS: 3, SWE: 0, IT: 0, IS: 0, STAT: 3 }
            },
            {
                text: "Comfortable - I can handle math when needed for practical applications",
                scores: { CS: 2, SWE: 2, IT: 1, IS: 1, STAT: 2 }
            },
            {
                text: "Moderate - I prefer when theory is minimal and focus is on practice",
                scores: { CS: 0, SWE: 2, IT: 2, IS: 2, STAT: 0 }
            },
            {
                text: "Prefer minimal math - I focus on implementation and practical skills",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 0 }
            }
        ]
    },
    {
        id: 6,
        text: "Which programming aspect interests you most?",
        options: [
            {
                text: "Understanding how programming languages work internally",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 0 }
            },
            {
                text: "Writing clean, maintainable code for large applications",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 1, STAT: 1 }
            },
            {
                text: "Scripting and automation for system administration",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Using code to solve business problems and create reports",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 2 }
            },
            {
                text: "Statistical programming and data analysis",
                scores: { CS: 1, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 7,
        text: "What kind of courses would you prefer?",
        options: [
            {
                text: "Theory-heavy courses like Algorithms, Automata Theory, Artificial Intelligence",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Project-based courses like Web Development, Mobile Apps, Software Design",
                scores: { CS: 1, SWE: 3, IT: 2, IS: 1, STAT: 0 }
            },
            {
                text: "Infrastructure courses like Networking, Security, Cloud Computing",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Business-focused courses like Database Management, ERP Systems, IT Strategy",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Data-focused courses like Probability, Statistical Methods, Machine Learning",
                scores: { CS: 2, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 8,
        text: "How do you approach a new technology or tool?",
        options: [
            {
                text: "I read the documentation to understand the underlying principles first",
                scores: { CS: 3, SWE: 1, IT: 1, IS: 1, STAT: 2 }
            },
            {
                text: "I dive in and start building something immediately",
                scores: { CS: 0, SWE: 3, IT: 2, IS: 1, STAT: 0 }
            },
            {
                text: "I follow installation guides and configuration best practices",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 1 }
            },
            {
                text: "I evaluate how it fits business needs and use cases",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            }
        ]
    },
    {
        id: 9,
        text: "What type of projects excite you?",
        options: [
            {
                text: "Optimizing algorithms or solving complex computational problems",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Building end-to-end applications that users will interact with",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 2, STAT: 0 }
            },
            {
                text: "Setting up networks, servers, or security systems",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Designing systems that improve business processes",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Analyzing data to find patterns and make predictions",
                scores: { CS: 1, SWE: 1, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 10,
        text: "Which work environment appeals to you?",
        options: [
            {
                text: "Research labs or tech companies working on cutting-edge problems",
                scores: { CS: 3, SWE: 2, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Software development teams building products",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 1, STAT: 0 }
            },
            {
                text: "IT departments managing organizational infrastructure",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 2, STAT: 0 }
            },
            {
                text: "Consulting firms helping businesses with technology strategy",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Data analytics teams or research institutions",
                scores: { CS: 1, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 11,
        text: "When working on a team project, what role do you naturally take?",
        options: [
            {
                text: "The problem solver who figures out complex technical challenges",
                scores: { CS: 3, SWE: 2, IT: 1, IS: 0, STAT: 2 }
            },
            {
                text: "The developer who writes most of the code",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 1, STAT: 1 }
            },
            {
                text: "The infrastructure person who sets up environments and tools",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "The organizer who coordinates tasks and ensures requirements are met",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "The analyst who evaluates results and provides insights",
                scores: { CS: 1, SWE: 0, IT: 0, IS: 2, STAT: 3 }
            }
        ]
    },
    {
        id: 12,
        text: "What motivates you most in technology work?",
        options: [
            {
                text: "Discovering elegant solutions to difficult problems",
                scores: { CS: 3, SWE: 2, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Creating software that people actually use and love",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 2, STAT: 0 }
            },
            {
                text: "Keeping systems running smoothly and securely",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Helping organizations work more efficiently through technology",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Uncovering insights from data that drive decisions",
                scores: { CS: 1, SWE: 1, IT: 0, IS: 2, STAT: 3 }
            }
        ]
    },
    {
        id: 13,
        text: "How do you feel about hardware and physical computing systems?",
        options: [
            {
                text: "Interested mainly in how hardware constraints affect algorithm design",
                scores: { CS: 3, SWE: 1, IT: 1, IS: 0, STAT: 0 }
            },
            {
                text: "Not particularly interested - I prefer focusing on software",
                scores: { CS: 1, SWE: 2, IT: 0, IS: 2, STAT: 2 }
            },
            {
                text: "Very interested - I enjoy working with hardware, networks, and infrastructure",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 0, STAT: 0 }
            },
            {
                text: "Somewhat interested as it relates to system performance and capacity",
                scores: { CS: 1, SWE: 1, IT: 2, IS: 2, STAT: 1 }
            }
        ]
    },
    {
        id: 14,
        text: "How important is direct interaction with end users or clients to you?",
        options: [
            {
                text: "Not very important - I prefer focusing on technical challenges",
                scores: { CS: 3, SWE: 1, IT: 1, IS: 0, STAT: 2 }
            },
            {
                text: "Somewhat important - I want feedback to improve the software",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 2, STAT: 1 }
            },
            {
                text: "Important - I need to understand their technical support needs",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 0 }
            },
            {
                text: "Very important - understanding business needs is central to my work",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            }
        ]
    },
    {
        id: 15,
        text: "Which skills do you most want to develop?",
        options: [
            {
                text: "Deep understanding of computer science fundamentals (algorithms, complexity, AI)",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Modern software development skills (frameworks, design patterns, testing)",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 1, STAT: 0 }
            },
            {
                text: "IT infrastructure skills (networking, security, cloud, DevOps)",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Business and systems analysis skills (requirements, process design, ERP)",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Statistical and data science skills (probability, modeling, machine learning)",
                scores: { CS: 2, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 16,
        text: "How do you handle repetitive tasks?",
        options: [
            {
                text: "I enjoy optimizing them algorithmically",
                scores: { CS: 3, SWE: 2, IT: 1, IS: 0, STAT: 1 }
            },
            {
                text: "I write scripts or tools to automate them",
                scores: { CS: 1, SWE: 3, IT: 2, IS: 1, STAT: 1 }
            },
            {
                text: "I standardize them into documented procedures",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 0 }
            },
            {
                text: "I question whether they're necessary and optimize the process",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            }
        ]
    },
    {
        id: 17,
        text: "What aspect of problem-solving do you find most satisfying?",
        options: [
            {
                text: "Proving that my solution is theoretically optimal",
                scores: { CS: 3, SWE: 0, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Seeing my solution work in a real application",
                scores: { CS: 1, SWE: 3, IT: 2, IS: 2, STAT: 1 }
            },
            {
                text: "Having a robust, reliable solution that won't break",
                scores: { CS: 1, SWE: 2, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Solving a problem that delivers clear business value",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Discovering insights that weren't obvious before",
                scores: { CS: 2, SWE: 0, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 18,
        text: "How do you stay updated with technology trends?",
        options: [
            {
                text: "Reading academic papers and attending conferences",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 2 }
            },
            {
                text: "Following developer blogs, trying new frameworks and tools",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 1, STAT: 1 }
            },
            {
                text: "Getting certifications and studying vendor documentation",
                scores: { CS: 0, SWE: 1, IT: 3, IS: 2, STAT: 0 }
            },
            {
                text: "Reading industry reports and case studies",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 2 }
            }
        ]
    },
    {
        id: 19,
        text: "What type of thinking comes most naturally to you?",
        options: [
            {
                text: "Abstract, mathematical, and theoretical thinking",
                scores: { CS: 3, SWE: 0, IT: 0, IS: 0, STAT: 3 }
            },
            {
                text: "Creative problem-solving and designing solutions",
                scores: { CS: 1, SWE: 3, IT: 1, IS: 2, STAT: 1 }
            },
            {
                text: "Systematic, methodical, and detail-oriented thinking",
                scores: { CS: 1, SWE: 1, IT: 3, IS: 2, STAT: 1 }
            },
            {
                text: "Strategic, big-picture, and business-oriented thinking",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Analytical, pattern-recognition, and data-driven thinking",
                scores: { CS: 2, SWE: 1, IT: 0, IS: 1, STAT: 3 }
            }
        ]
    },
    {
        id: 20,
        text: "Finally, if you could work on any ONE of these projects right now, which would you choose?",
        options: [
            {
                text: "Implementing a new machine learning algorithm from a research paper",
                scores: { CS: 3, SWE: 1, IT: 0, IS: 0, STAT: 3 }
            },
            {
                text: "Building a mobile app that thousands of people will use",
                scores: { CS: 0, SWE: 3, IT: 1, IS: 1, STAT: 0 }
            },
            {
                text: "Designing and securing a company's network infrastructure",
                scores: { CS: 0, SWE: 0, IT: 3, IS: 1, STAT: 0 }
            },
            {
                text: "Analyzing business processes and recommending an ERP system",
                scores: { CS: 0, SWE: 1, IT: 1, IS: 3, STAT: 1 }
            },
            {
                text: "Analyzing large datasets to predict customer behavior",
                scores: { CS: 1, SWE: 1, IT: 0, IS: 2, STAT: 3 }
            }
        ]
    }
];

// Department information for results display
const departments = {
    CS: {
        name: "Computer Science",
        fullName: "Computer Science",
        color: "#3b82f6",
        description: "Focuses on theoretical foundations, algorithms, and computational problem-solving. Best for those who enjoy mathematics, abstract thinking, and understanding how computers work at a fundamental level.",
        careers: ["Algorithm Developer", "Research Scientist", "AI/ML Engineer", "Compiler Engineer", "Computer Scientist"],
        strengths: ["Strong mathematical foundation", "Algorithm design", "Theoretical knowledge", "Research skills"],
        // Extended information for detail page
        overview: "Computer Science is the study of computation, information processing, and the theoretical foundations of computing. This program provides deep knowledge in algorithms, data structures, artificial intelligence, and theoretical computer science.",
        idealFor: [
            "Students who love mathematics and logic",
            "Those interested in research and innovation",
            "People who enjoy solving complex theoretical problems",
            "Future PhD candidates or academic researchers"
        ],
        keySubjects: [
            "Data Structures & Algorithms",
            "Theory of Computation",
            "Artificial Intelligence",
            "Machine Learning",
            "Compiler Design",
            "Computer Architecture",
            "Discrete Mathematics",
            "Advanced Calculus"
        ],
        careerPaths: [
            {
                title: "AI/ML Research Scientist",
                salary: "80,000 - 150,000 ETB/month",
                demand: "Very High"
            },
            {
                title: "Algorithm Developer",
                salary: "60,000 - 120,000 ETB/month",
                demand: "High"
            },
            {
                title: "Computer Scientist (PhD)",
                salary: "70,000 - 140,000 ETB/month",
                demand: "Medium"
            }
        ],
        mathRequirement: "Very High - Advanced calculus, discrete math, linear algebra",
        practiceRatio: "30% Practical, 70% Theoretical",
        jobMarket: "Growing rapidly in AI/ML fields, especially internationally",
        localCompanies: ["iCog Labs", "Gebeya", "International Tech Companies"],
        studyTips: [
            "Master discrete mathematics early",
            "Practice algorithmic problem-solving daily",
            "Participate in competitive programming",
            "Read academic papers regularly"
        ]
    },
    SWE: {
        name: "Software Engineering",
        fullName: "Software Engineering",
        color: "#10b981",
        description: "Emphasizes practical software development, design patterns, and building reliable applications. Ideal for those who want to create software products and enjoy hands-on coding.",
        careers: ["Software Developer", "Full-Stack Engineer", "Mobile App Developer", "DevOps Engineer", "Solutions Architect"],
        strengths: ["Software development lifecycle", "Coding best practices", "Project-based learning", "Team collaboration"],
        overview: "Software Engineering focuses on the systematic design, development, testing, and maintenance of software systems. This program emphasizes practical skills, modern frameworks, and industry best practices.",
        idealFor: [
            "Students who love building things",
            "Those who enjoy hands-on coding",
            "People interested in product development",
            "Future software developers and engineers"
        ],
        keySubjects: [
            "Software Design Patterns",
            "Web Development (Frontend & Backend)",
            "Mobile Application Development",
            "Software Testing & Quality Assurance",
            "DevOps & CI/CD",
            "Agile Methodologies",
            "Database Design",
            "Cloud Computing"
        ],
        careerPaths: [
            {
                title: "Full-Stack Developer",
                salary: "50,000 - 100,000 ETB/month",
                demand: "Very High"
            },
            {
                title: "Mobile App Developer",
                salary: "45,000 - 95,000 ETB/month",
                demand: "Very High"
            },
            {
                title: "Software Architect",
                salary: "80,000 - 150,000 ETB/month",
                demand: "High"
            }
        ],
        mathRequirement: "Moderate - Basic calculus and statistics",
        practiceRatio: "60% Practical, 40% Theoretical",
        jobMarket: "Highest demand in Ethiopia, many startups hiring",
        localCompanies: ["Gebeya", "Gebeta Maps", "Ride", "ZayRide", "Local Startups"],
        studyTips: [
            "Build projects consistently",
            "Learn modern frameworks (React, Node.js)",
            "Contribute to open source",
            "Create a strong GitHub portfolio"
        ]
    },
    IT: {
        name: "Information Technology",
        fullName: "Information Technology",
        color: "#f59e0b",
        description: "Concentrates on infrastructure, networking, security, and system administration. Perfect for those interested in hardware, networks, and keeping systems running smoothly.",
        careers: ["Network Administrator", "Systems Administrator", "IT Security Specialist", "Cloud Engineer", "IT Support Manager"],
        strengths: ["Infrastructure management", "Network configuration", "Security implementation", "Technical support"],
        overview: "Information Technology focuses on the implementation, management, and support of computer systems and networks. This program emphasizes hands-on skills in networking, security, and infrastructure management.",
        idealFor: [
            "Students interested in hardware and networks",
            "Those who enjoy troubleshooting and problem-solving",
            "People who like hands-on technical work",
            "Future network engineers and system administrators"
        ],
        keySubjects: [
            "Computer Networks",
            "Network Security & Cryptography",
            "Server Administration (Linux/Windows)",
            "Cloud Computing (AWS, Azure)",
            "Virtualization & Containerization",
            "IT Service Management",
            "Cybersecurity",
            "Hardware & System Architecture"
        ],
        careerPaths: [
            {
                title: "Network Engineer",
                salary: "40,000 - 85,000 ETB/month",
                demand: "High"
            },
            {
                title: "System Administrator",
                salary: "35,000 - 75,000 ETB/month",
                demand: "High"
            },
            {
                title: "Cloud Engineer",
                salary: "55,000 - 110,000 ETB/month",
                demand: "Very High"
            }
        ],
        mathRequirement: "Low - Basic mathematics",
        practiceRatio: "70% Practical, 30% Theoretical",
        jobMarket: "Stable demand in banks, telecoms, government",
        localCompanies: ["Ethio Telecom", "Banks (CBE, Awash, etc.)", "Safaricom Ethiopia", "Government IT"],
        studyTips: [
            "Get hands-on with hardware early",
            "Set up home lab for practice",
            "Pursue industry certifications (CCNA, CompTIA)",
            "Practice with real network scenarios"
        ]
    },
    IS: {
        name: "Information System",
        fullName: "Information System",
        color: "#8b5cf6",
        description: "Bridges technology and business, focusing on how information systems support organizational goals. Great for those interested in business analysis and strategic technology use.",
        careers: ["Business Analyst", "IT Consultant", "Systems Analyst", "ERP Specialist", "IT Project Manager"],
        strengths: ["Business-IT alignment", "Requirements analysis", "Process optimization", "Stakeholder management"],
        overview: "Information Systems combines technology knowledge with business acumen. This program focuses on how organizations use information systems to achieve strategic objectives and improve operations.",
        idealFor: [
            "Students who enjoy both tech and business",
            "Those interested in consulting",
            "People with strong communication skills",
            "Future business analysts and IT managers"
        ],
        keySubjects: [
            "Management Information Systems",
            "Business Process Analysis",
            "Enterprise Resource Planning (ERP)",
            "IT Strategy & Governance",
            "Database Management Systems",
            "Systems Analysis & Design",
            "IT Project Management",
            "E-Commerce & Digital Business"
        ],
        careerPaths: [
            {
                title: "Business Analyst",
                salary: "45,000 - 90,000 ETB/month",
                demand: "Very High"
            },
            {
                title: "IT Consultant",
                salary: "50,000 - 110,000 ETB/month",
                demand: "High"
            },
            {
                title: "ERP Specialist",
                salary: "55,000 - 100,000 ETB/month",
                demand: "High"
            }
        ],
        mathRequirement: "Low-Moderate - Statistics and business math",
        practiceRatio: "50% Practical, 50% Theoretical",
        jobMarket: "Growing demand in consulting and large organizations",
        localCompanies: ["Banks", "Consulting Firms", "Large Enterprises", "Government Organizations"],
        studyTips: [
            "Develop strong communication skills",
            "Learn popular ERP systems (SAP, Oracle)",
            "Understand business fundamentals",
            "Practice requirements gathering"
        ]
    },
    STAT: {
        name: "Statistics",
        fullName: "Statistics",
        color: "#ef4444",
        description: "Centers on data analysis, probability, and statistical modeling. Excellent for those who love working with data and mathematical methods to derive insights.",
        careers: ["Data Scientist", "Statistical Analyst", "Quantitative Analyst", "Data Engineer", "Research Statistician"],
        strengths: ["Statistical methods", "Data analysis", "Probability theory", "Predictive modeling"],
        overview: "Statistics focuses on collecting, analyzing, and interpreting data to make informed decisions. This program provides strong mathematical foundations and modern data science skills.",
        idealFor: [
            "Students who love mathematics and data",
            "Those interested in research and analysis",
            "People who enjoy finding patterns",
            "Future data scientists and analysts"
        ],
        keySubjects: [
            "Probability Theory",
            "Statistical Inference",
            "Regression Analysis",
            "Machine Learning",
            "Data Mining",
            "Time Series Analysis",
            "Bayesian Statistics",
            "R & Python Programming"
        ],
        careerPaths: [
            {
                title: "Data Scientist",
                salary: "60,000 - 130,000 ETB/month",
                demand: "Very High"
            },
            {
                title: "Statistical Analyst",
                salary: "40,000 - 85,000 ETB/month",
                demand: "High"
            },
            {
                title: "Quantitative Analyst",
                salary: "70,000 - 140,000 ETB/month",
                demand: "Medium"
            }
        ],
        mathRequirement: "Very High - Advanced calculus, probability, linear algebra",
        practiceRatio: "40% Practical, 60% Theoretical",
        jobMarket: "Rapidly growing, especially in data science",
        localCompanies: ["Banks (Risk Analysis)", "Research Institutions", "Tech Companies", "NGOs"],
        studyTips: [
            "Master probability and calculus",
            "Learn R and Python early",
            "Work on real datasets",
            "Participate in Kaggle competitions"
        ]
    }
};
