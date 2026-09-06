-- ================================================================
-- CCI Department Guidance System - UPDATE Departments Data
-- Version: 2.0 (Update existing departments with accurate curriculum)
-- Date: September 1, 2026
-- Description: Update 6 CCI departments with real exit exam curriculum data
-- ================================================================

-- Update Computer Science Department
UPDATE departments 
SET 
    description = 'Concentrates on the scientific and theoretical aspects of computing, focusing on underlying concepts, principles, algorithms, and computational thinking. Develops rigorous reasoning about computation, complexity, and formal methods.',
    strengths = ARRAY[
        'Theoretical foundations and computational thinking',
        'Algorithm design and complexity analysis',
        'Artificial intelligence and machine learning',
        'Systems programming and operating systems',
        'Research and academic excellence',
        'Mathematical and logical reasoning'
    ],
    curriculum = '{
        "overview": "Computer Science provides deep understanding of computation, algorithms, data structures, and theoretical foundations of computing. The 16-lesson curriculum emphasizes rigorous reasoning, formal methods, and computational theory with strong focus on algorithms and theoretical computer science.",
        "core_courses": [
            {"lesson": 1, "name": "Software Engineering", "category": "System Development"},
            {"lesson": 2, "name": "Web Programming", "category": "Web Programming"},
            {"lesson": 3, "name": "Fundamental of Database Systems", "category": "Database Systems"},
            {"lesson": 4, "name": "Advance Database Systems", "category": "Database Systems"},
            {"lesson": 5, "name": "Computer Programming", "category": "Programming and Algorithms"},
            {"lesson": 6, "name": "Object Oriented Programming", "category": "Programming and Algorithms"},
            {"lesson": 7, "name": "Design and Analysis of Algorithms", "category": "Programming and Algorithms"},
            {"lesson": 8, "name": "Data Structure and Algorithms", "category": "Programming and Algorithms"},
            {"lesson": 9, "name": "Data Communication and Computer Networking", "category": "Networking and Security"},
            {"lesson": 10, "name": "Computer Security", "category": "Networking and Security"},
            {"lesson": 11, "name": "Network and System Administration", "category": "Networking and Security"},
            {"lesson": 12, "name": "Introduction to Artificial Intelligence", "category": "Intelligent Systems"},
            {"lesson": 13, "name": "Operating System", "category": "Architecture and OS"},
            {"lesson": 14, "name": "Computer Organization and Architecture", "category": "Architecture and OS"},
            {"lesson": 15, "name": "Automata and Complexity Theory", "category": "Compiler and Complexity"},
            {"lesson": 16, "name": "Compiler Design", "category": "Compiler and Complexity"}
        ],
        "unique_courses": [
            "Automata and Complexity Theory (unique to CS)",
            "Compiler Design (unique to CS)",
            "Four dedicated algorithms and data structures courses",
            "Design and Analysis of Algorithms"
        ],
        "distinguishing_features": [
            "Strongest theoretical foundation among all departments",
            "Only department with Automata and Complexity Theory",
            "Only department with Compiler Design",
            "Four courses dedicated to algorithms and data structures",
            "Emphasis on formal methods and computational thinking",
            "Research-oriented curriculum"
        ],
        "exit_exam_coverage": "16 comprehensive lessons covering theoretical CS, algorithms, systems programming, and computational theory"
    }'::jsonb
WHERE code = 'CS';

-- Update Software Engineering Department
UPDATE departments 
SET 
    description = 'Focuses on the systematic, disciplined, and quantifiable approach to software development, operation, and maintenance. Emphasizes engineering principles, software lifecycle, quality assurance, and practical application development.',
    strengths = ARRAY[
        'Software development lifecycle mastery',
        'Design patterns and architecture',
        'Quality assurance and testing',
        'Agile and DevOps practices',
        'Team collaboration and project management',
        'Real-world application development'
    ],
    curriculum = '{
        "overview": "Software Engineering prepares students to build high-quality software systems through systematic approaches, engineering principles, and best practices. The 15-lesson curriculum emphasizes full software development lifecycle, quality assurance, project management, and modern development practices including mobile and web development.",
        "core_courses": [
            {"lesson": 1, "name": "Computer Programming", "category": "Problem Analysis and Programming"},
            {"lesson": 2, "name": "Fundamental of Data Structure and Analysis", "category": "Problem Analysis and Programming"},
            {"lesson": 3, "name": "Object Oriented Programming", "category": "Problem Analysis and Programming"},
            {"lesson": 4, "name": "Web Design and Programming", "category": "Problem Analysis and Programming"},
            {"lesson": 5, "name": "Mobile Application Development", "category": "Problem Analysis and Programming"},
            {"lesson": 6, "name": "Fundamentals of Database", "category": "Problem Analysis and Programming"},
            {"lesson": 7, "name": "Fundamentals of Networking", "category": "Networking and Security"},
            {"lesson": 8, "name": "Software and Information Security", "category": "Networking and Security"},
            {"lesson": 9, "name": "Fundamentals of Software Engineering", "category": "Requirement, Design and Construction"},
            {"lesson": 10, "name": "Requirement Engineering, Architecture and Design", "category": "Requirement, Design and Construction"},
            {"lesson": 11, "name": "Software Project Management", "category": "Project Management and QA"},
            {"lesson": 12, "name": "Software Testing, Verification and Quality Assurance", "category": "Project Management and QA"},
            {"lesson": 13, "name": "Operating System and System Programming", "category": "Operating System"},
            {"lesson": 14, "name": "Artificial Intelligence", "category": "Miscellaneous"},
            {"lesson": 15, "name": "Big Data Modeling", "category": "Miscellaneous"}
        ],
        "unique_courses": [
            "Software Requirements Engineering and Architecture (unique depth)",
            "Software Testing, Verification and Quality Assurance (dedicated course)",
            "Software Project Management (unique to SWE)",
            "Mobile Application Development (explicit course)",
            "Big Data Modeling (emerging field)"
        ],
        "distinguishing_features": [
            "Only department with complete SDLC coverage",
            "Dedicated software quality assurance and testing course",
            "Software project management unique to SWE",
            "Explicit mobile application development",
            "Strong emphasis on engineering principles and best practices",
            "Most comprehensive software development curriculum"
        ],
        "exit_exam_coverage": "15 comprehensive lessons covering full software lifecycle, from requirements to deployment and maintenance"
    }'::jsonb
WHERE code = 'SWE';

-- Update Information Technology Department
UPDATE departments 
SET 
    description = 'Emphasizes the practical application of computing technology to meet organizational needs. Focuses on infrastructure, networking, system administration, security, and user support with hands-on technical skills.',
    strengths = ARRAY[
        'Network design and administration',
        'System configuration and management',
        'Cloud infrastructure and services',
        'Cybersecurity and risk management',
        'Technical support and troubleshooting',
        'Enterprise technology solutions'
    ],
    curriculum = '{
        "overview": "Information Technology prepares students to deploy, manage, and secure organizational computing infrastructure with hands-on technical skills. The 18+ subject curriculum emphasizes practical networking, system administration, security, and infrastructure management with strong certification-oriented training.",
        "core_subjects": [
            {"name": "Advanced Programming (Java)", "chapters": 8, "category": "Core Programming", "has_mcq": true},
            {"name": "Event-Driven Programming (VB.NET/C#)", "chapters": 7, "category": "Core Programming", "has_mcq": true},
            {"name": "Data Structures & Algorithms", "chapters": 6, "category": "Core Programming", "has_mcq": false},
            {"name": "Fundamentals of Database", "chapters": 6, "category": "Database Systems", "has_mcq": true},
            {"name": "Advanced Database Management", "chapters": 6, "category": "Database Systems", "has_mcq": true},
            {"name": "Fundamentals of Networking", "chapters": 7, "category": "Networking & Systems", "has_mcq": false},
            {"name": "Data Communication & Computer Networks", "chapters": 5, "category": "Networking & Systems", "has_mcq": false},
            {"name": "Network Device & Configuration", "chapters": 4, "category": "Networking & Systems", "has_mcq": true},
            {"name": "System Administration", "chapters": 7, "category": "Networking & Systems", "has_mcq": false},
            {"name": "Internet Programming I (HTML/CSS/JavaScript)", "chapters": 5, "category": "Web & Internet", "has_mcq": false},
            {"name": "Internet Programming II (PHP)", "chapters": 5, "category": "Web & Internet", "has_mcq": true},
            {"name": "System Analysis & Design", "chapters": 9, "category": "Software Engineering", "has_mcq": true},
            {"name": "IT Project Management", "chapters": 9, "category": "Software Engineering", "has_mcq": true},
            {"name": "Object-Oriented Analysis & Design", "chapters": 8, "category": "Software Engineering", "has_mcq": false},
            {"name": "Information Assurance & Security", "chapters": 5, "category": "Security & Maintenance", "has_mcq": true},
            {"name": "Computer Maintenance & Troubleshooting", "chapters": 6, "category": "Security & Maintenance", "has_mcq": true},
            {"name": "Mobile Application Development (Android)", "chapters": 4, "category": "Mobile & Distributed", "has_mcq": true},
            {"name": "Distributed Systems", "chapters": 8, "category": "Mobile & Distributed", "has_mcq": false}
        ],
        "unique_courses": [
            "Network Device & Configuration (Cisco/Router - unique to IT)",
            "Computer Maintenance & Troubleshooting (Hardware - unique to IT)",
            "System Administration (most comprehensive coverage)",
            "Four networking courses (most of any department)"
        ],
        "distinguishing_features": [
            "Most comprehensive infrastructure and networking curriculum",
            "Only department with hardware maintenance course",
            "Network device configuration (Cisco, routers, switches)",
            "Four dedicated networking and systems courses",
            "Strong hands-on lab emphasis with MCQ worksheets",
            "Industry certification preparation (CompTIA, Cisco, Microsoft)"
        ],
        "exit_exam_coverage": "18+ subjects covering practical IT infrastructure, networking, system administration, security, and hands-on technical skills"
    }'::jsonb
WHERE code = 'IT';

-- Update Information Systems Department
UPDATE departments 
SET 
    description = 'Focuses on the integration of information technology solutions with business processes and organizational goals. Bridges the gap between technical teams and management, emphasizing systems analysis, business intelligence, and strategic IT planning.',
    strengths = ARRAY[
        'Business process analysis and modeling',
        'Enterprise resource planning (ERP)',
        'Business intelligence and analytics',
        'Requirements engineering',
        'Strategic IT management',
        'Organizational change management'
    ],
    curriculum = '{
        "overview": "Information Systems prepares students to bridge business and technology by designing and managing information systems that support organizational decision-making and operations. The 15-lesson curriculum combines technical knowledge with business acumen, emphasizing enterprise systems, strategic IT management, and business process integration.",
        "core_courses": [
            {"lesson": 1, "name": "Basic Computer Programming", "category": "Programming and Web Technology"},
            {"lesson": 2, "name": "Object Oriented Programming", "category": "Programming and Web Technology"},
            {"lesson": 3, "name": "Internet Programming", "category": "Programming and Web Technology"},
            {"lesson": 4, "name": "Data Communication and Computer Networks", "category": "Networking and Security"},
            {"lesson": 5, "name": "Information System Security", "category": "Networking and Security"},
            {"lesson": 6, "name": "Database Systems", "category": "Database and Information Management"},
            {"lesson": 7, "name": "Introduction to Information Storage and Retrieval", "category": "Database and Information Management"},
            {"lesson": 8, "name": "Multimedia Information Systems", "category": "Database and Information Management"},
            {"lesson": 9, "name": "Fundamentals of Artificial Intelligence", "category": "Intelligent Systems"},
            {"lesson": 10, "name": "Knowledge Management", "category": "Intelligent Systems"},
            {"lesson": 11, "name": "Introduction to Machine Learning", "category": "Machine Learning"},
            {"lesson": 12, "name": "Management Information Systems and Strategy", "category": "IS Development and Management"},
            {"lesson": 13, "name": "Information Systems/Project", "category": "IS Development and Management"},
            {"lesson": 14, "name": "Enterprise Systems", "category": "IS Development and Management"},
            {"lesson": 15, "name": "System Analysis and Design", "category": "IS Development and Management"}
        ],
        "unique_courses": [
            "Management Information Systems and Strategy (unique to IS)",
            "Enterprise Systems - ERP/SCM/CRM (unique to IS)",
            "Knowledge Management (organizational focus)",
            "Strongest business-technology alignment among all departments"
        ],
        "distinguishing_features": [
            "Only department focused on business-technology bridge",
            "Enterprise systems (ERP, SCM, CRM) unique to IS",
            "Strategic IT management and business alignment",
            "Management Information Systems with strategic focus",
            "Organizational knowledge management",
            "Decision support and business intelligence emphasis"
        ],
        "exit_exam_coverage": "15 lessons bridging business and technology with focus on enterprise systems, MIS strategy, and organizational IT management"
    }'::jsonb
WHERE code = 'IS';

-- Update Information Science Department
UPDATE departments 
SET 
    description = 'Deals with the collection, classification, storage, retrieval, and dissemination of recorded knowledge. Focuses on information organization, digital libraries, knowledge management, and user information needs.',
    strengths = ARRAY[
        'Information architecture and organization',
        'Digital library systems',
        'Metadata standards and cataloging',
        'Knowledge management',
        'Information retrieval systems',
        'User information behavior'
    ],
    curriculum = '{
        "overview": "Information Science prepares students to organize, preserve, and provide access to information resources through systematic approaches. The 12-lesson curriculum combines technology with library science, knowledge organization, and information management, focusing on digital libraries, metadata standards, and scholarly communication.",
        "core_courses": [
            {"lesson": 1, "name": "Introduction to Information Science", "category": "Foundation of Information Science"},
            {"lesson": 2, "name": "Information Storage & Retrieval System", "category": "Foundation of Information Science"},
            {"lesson": 3, "name": "Fundamental of Programming I", "category": "Programming"},
            {"lesson": 4, "name": "Fundamental of Programming II", "category": "Programming"},
            {"lesson": 5, "name": "Visual Basic Programming", "category": "Programming"},
            {"lesson": 6, "name": "Internet Programming", "category": "Programming"},
            {"lesson": 7, "name": "Fundamental of Database", "category": "Data Management & Networking"},
            {"lesson": 8, "name": "Data Communication and Networking", "category": "Data Management & Networking"},
            {"lesson": 9, "name": "Knowledge Organization and Representation", "category": "Knowledge Management"},
            {"lesson": 10, "name": "Automating of Libraries and Information Systems", "category": "Knowledge Management"},
            {"lesson": 11, "name": "Multimedia System", "category": "Knowledge Management"},
            {"lesson": 12, "name": "Scholarly Communication", "category": "Scientific Studies & Communication"}
        ],
        "unique_courses": [
            "Information Organization and Representation (unique to ISC)",
            "Library Automation and Information Systems (unique to ISC)",
            "Knowledge Organization (unique to ISC)",
            "Scholarly Communication (unique to ISC)"
        ],
        "distinguishing_features": [
            "Only department focused on information organization and classification",
            "Library automation and digital library systems",
            "Metadata standards, cataloging, and taxonomies",
            "Scholarly communication and academic publishing",
            "Knowledge representation and organization",
            "Information retrieval and search systems"
        ],
        "exit_exam_coverage": "12 lessons covering information organization, digital libraries, knowledge management, and scholarly communication systems"
    }'::jsonb
WHERE code = 'ISC';

-- Update Statistics Department
UPDATE departments 
SET 
    description = 'Focuses on the collection, analysis, interpretation, presentation, and organization of data. Emphasizes statistical theory, methods, probability, and quantitative research with applications across many fields.',
    strengths = ARRAY[
        'Statistical theory and methods',
        'Data analysis and visualization',
        'Probability and inference',
        'Experimental design',
        'Quantitative research methods',
        'Statistical software proficiency'
    ],
    curriculum = '{
        "overview": "Statistics prepares students to extract meaningful insights from data using mathematical and computational methods. The 14-lesson curriculum provides strong foundation in probability, statistical theory, inference, and applied statistics with emphasis on R programming, research methods, and quantitative analysis across domains.",
        "core_courses": [
            {"lesson": 1, "name": "Basic Statistics", "category": "Fundamental of Statistics"},
            {"lesson": 2, "name": "Statistical Methods", "category": "Fundamental of Statistics"},
            {"lesson": 3, "name": "Statistical Computing I", "category": "Statistical Computing and Research"},
            {"lesson": 4, "name": "Statistical Computing II", "category": "Statistical Computing and Research"},
            {"lesson": 5, "name": "Research Method and Sample Survey Practice", "category": "Statistical Computing and Research"},
            {"lesson": 6, "name": "Regression Analysis", "category": "Statistical Modeling"},
            {"lesson": 7, "name": "Time Series Analysis", "category": "Statistical Modeling"},
            {"lesson": 8, "name": "Design and Analysis of Experiments", "category": "Statistical Modeling"},
            {"lesson": 9, "name": "Categorical Data Analysis", "category": "Statistical Modeling"},
            {"lesson": 10, "name": "Statistical Quality Control", "category": "Statistical Modeling"},
            {"lesson": 11, "name": "Statistical Theory of Distribution", "category": "Statistical Theories"},
            {"lesson": 12, "name": "Statistical Inference", "category": "Statistical Theories"},
            {"lesson": 13, "name": "Demography", "category": "Social Statistics"},
            {"lesson": 14, "name": "Social and Economic Statistics", "category": "Social Statistics"}
        ],
        "unique_courses": [
            "R Programming - Statistical Computing I & II (unique to STAT)",
            "Research Method and Sample Survey Practice (unique to STAT)",
            "Regression and Time Series Analysis (unique depth)",
            "Categorical Data Analysis (unique to STAT)",
            "Statistical Quality Control (unique to STAT)",
            "Demography and Social Statistics (unique to STAT)"
        ],
        "distinguishing_features": [
            "Only department with comprehensive statistical theory and methods",
            "Dedicated R programming and statistical computing courses",
            "Research methodology and survey practice",
            "Five statistical modeling courses (regression, time series, experiments, categorical, QC)",
            "Theoretical depth in probability and statistical inference",
            "Social science applications (demography, economic statistics)"
        ],
        "exit_exam_coverage": "14 lessons covering statistical theory, methods, R computing, modeling, and applications in research and social sciences"
    }'::jsonb
WHERE code = 'STAT';

-- Verification Query
SELECT 
    code,
    name,
    LEFT(description, 60) || '...' as description_preview,
    jsonb_array_length(curriculum->'core_courses') as course_count
FROM departments
ORDER BY 
    CASE code
        WHEN 'CS' THEN 1
        WHEN 'SWE' THEN 2
        WHEN 'IT' THEN 3
        WHEN 'IS' THEN 4
        WHEN 'ISC' THEN 5
        WHEN 'STAT' THEN 6
    END;
