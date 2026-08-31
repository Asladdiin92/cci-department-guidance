-- ================================================================
-- CCI Department Guidance System - Seed Departments Data
-- Version: 1.0
-- Date: September 1, 2026
-- Description: Insert 6 CCI departments with full information
-- ================================================================

-- Insert Computer Science Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'CS',
    'Computer Science',
    'Concentrates on the scientific and theoretical aspects of computing, focusing on underlying concepts, principles, algorithms, and computational thinking. Develops rigorous reasoning about computation, complexity, and formal methods.',
    ARRAY[
        'Theoretical foundations and computational thinking',
        'Algorithm design and complexity analysis',
        'Artificial intelligence and machine learning',
        'Systems programming and operating systems',
        'Research and academic excellence',
        'Mathematical and logical reasoning'
    ],
    '{
        "overview": "Computer Science provides deep understanding of computation, algorithms, data structures, and theoretical foundations of computing. Students develop strong analytical and problem-solving skills with emphasis on innovation and research.",
        "core_courses": [
            {"code": "CS201", "name": "Data Structures", "credits": 3},
            {"code": "CS202", "name": "Algorithm Analysis", "credits": 3},
            {"code": "CS301", "name": "Theory of Computation", "credits": 3},
            {"code": "CS302", "name": "Operating Systems", "credits": 3},
            {"code": "CS303", "name": "Computer Architecture", "credits": 3},
            {"code": "CS401", "name": "Artificial Intelligence", "credits": 3},
            {"code": "CS402", "name": "Machine Learning", "credits": 3},
            {"code": "CS403", "name": "Compiler Design", "credits": 3}
        ],
        "elective_areas": [
            "Advanced Algorithms",
            "Computational Complexity",
            "Natural Language Processing",
            "Computer Vision",
            "Quantum Computing",
            "Distributed Systems"
        ],
        "research_areas": [
            "Machine Learning and AI",
            "Algorithms and Complexity",
            "Computer Graphics",
            "Bioinformatics",
            "Theory of Computation"
        ],
        "typical_projects": [
            "Algorithm optimization research",
            "Machine learning model development",
            "Compiler implementation",
            "Operating system kernel modifications"
        ]
    }'::jsonb,
    ARRAY[
        'Software Developer / Engineer',
        'Machine Learning Engineer',
        'Research Scientist',
        'Data Scientist',
        'University Lecturer / Professor',
        'Algorithm Engineer',
        'AI Specialist',
        'Systems Programmer'
    ],
    'HIGH',
    '#4f46e5',
    '💻'
);

-- Insert Software Engineering Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'SWE',
    'Software Engineering',
    'Focuses on the systematic, disciplined, and quantifiable approach to software development, operation, and maintenance. Emphasizes engineering principles, software lifecycle, quality assurance, and practical application development.',
    ARRAY[
        'Software development lifecycle mastery',
        'Design patterns and architecture',
        'Quality assurance and testing',
        'Agile and DevOps practices',
        'Team collaboration and project management',
        'Real-world application development'
    ],
    '{
        "overview": "Software Engineering prepares students to build high-quality software systems through systematic approaches, best practices, and engineering principles. Strong focus on practical skills and industry-ready competencies.",
        "core_courses": [
            {"code": "SWE201", "name": "Software Design Principles", "credits": 3},
            {"code": "SWE202", "name": "Software Requirements Engineering", "credits": 3},
            {"code": "SWE301", "name": "Software Architecture", "credits": 3},
            {"code": "SWE302", "name": "Software Testing & QA", "credits": 3},
            {"code": "SWE303", "name": "Software Project Management", "credits": 3},
            {"code": "SWE401", "name": "DevOps and CI/CD", "credits": 3},
            {"code": "SWE402", "name": "Software Maintenance", "credits": 3},
            {"code": "SWE403", "name": "Agile Development", "credits": 3}
        ],
        "elective_areas": [
            "Mobile App Development",
            "Web Engineering",
            "Cloud Computing",
            "Microservices Architecture",
            "Software Security",
            "UI/UX Engineering"
        ],
        "practical_focus": [
            "Team-based software projects",
            "Industry internships",
            "Code reviews and pair programming",
            "Version control and collaboration tools",
            "Continuous integration pipelines"
        ],
        "typical_projects": [
            "Full-stack web applications",
            "Mobile applications (iOS/Android)",
            "Enterprise software systems",
            "E-commerce platforms",
            "Content management systems"
        ]
    }'::jsonb,
    ARRAY[
        'Software Engineer',
        'Full Stack Developer',
        'Frontend / Backend Developer',
        'DevOps Engineer',
        'Quality Assurance Engineer',
        'Software Architect',
        'Technical Lead',
        'Scrum Master / Agile Coach'
    ],
    'HIGH',
    '#ea580c',
    '⚙️'
);

-- Insert Information Technology Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'IT',
    'Information Technology',
    'Emphasizes the practical application of computing technology to meet organizational needs. Focuses on infrastructure, networking, system administration, security, and user support with hands-on technical skills.',
    ARRAY[
        'Network design and administration',
        'System configuration and management',
        'Cloud infrastructure and services',
        'Cybersecurity and risk management',
        'Technical support and troubleshooting',
        'Enterprise technology solutions'
    ],
    '{
        "overview": "Information Technology prepares students to deploy, manage, and secure organizational computing infrastructure. Strong emphasis on practical skills, certifications, and operational excellence.",
        "core_courses": [
            {"code": "IT201", "name": "Network Fundamentals", "credits": 3},
            {"code": "IT202", "name": "System Administration", "credits": 3},
            {"code": "IT301", "name": "Network Security", "credits": 3},
            {"code": "IT302", "name": "Cloud Computing", "credits": 3},
            {"code": "IT303", "name": "Database Administration", "credits": 3},
            {"code": "IT401", "name": "IT Service Management", "credits": 3},
            {"code": "IT402", "name": "Cybersecurity", "credits": 3},
            {"code": "IT403", "name": "Enterprise Architecture", "credits": 3}
        ],
        "elective_areas": [
            "Wireless Networks",
            "Server Virtualization",
            "IT Forensics",
            "IoT Systems",
            "IT Project Management",
            "Help Desk Management"
        ],
        "certifications": [
            "CompTIA A+, Network+, Security+",
            "Cisco CCNA / CCNP",
            "Microsoft MCSA / Azure Administrator",
            "AWS Solutions Architect",
            "Linux Professional Institute",
            "ITIL Foundation"
        ],
        "lab_activities": [
            "Network configuration labs",
            "Server deployment exercises",
            "Security simulation labs",
            "Cloud platform hands-on"
        ],
        "typical_projects": [
            "Campus network design",
            "Server infrastructure setup",
            "Security audit and hardening",
            "Help desk system implementation"
        ]
    }'::jsonb,
    ARRAY[
        'Network Administrator',
        'System Administrator',
        'Cloud Engineer',
        'Cybersecurity Analyst',
        'IT Support Specialist',
        'Database Administrator',
        'IT Consultant',
        'DevOps Engineer'
    ],
    'HIGH',
    '#0d9488',
    '🌐'
);

-- Insert Information System Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'IS',
    'Information System',
    'Focuses on the integration of information technology solutions with business processes and organizational goals. Bridges the gap between technical teams and management, emphasizing systems analysis, business intelligence, and strategic IT planning.',
    ARRAY[
        'Business process analysis and modeling',
        'Enterprise resource planning (ERP)',
        'Business intelligence and analytics',
        'Requirements engineering',
        'Strategic IT management',
        'Organizational change management'
    ],
    '{
        "overview": "Information Systems prepares students to design and manage information systems that support organizational decision-making and operations. Combines technical knowledge with business acumen.",
        "core_courses": [
            {"code": "IS201", "name": "Management Information Systems", "credits": 3},
            {"code": "IS202", "name": "Systems Analysis and Design", "credits": 3},
            {"code": "IS301", "name": "Business Intelligence", "credits": 3},
            {"code": "IS302", "name": "Enterprise Resource Planning", "credits": 3},
            {"code": "IS303", "name": "IT Strategy and Governance", "credits": 3},
            {"code": "IS401", "name": "Business Process Management", "credits": 3},
            {"code": "IS402", "name": "Data Warehousing", "credits": 3},
            {"code": "IS403", "name": "E-Business Systems", "credits": 3}
        ],
        "elective_areas": [
            "Supply Chain Management Systems",
            "Customer Relationship Management",
            "Decision Support Systems",
            "Knowledge Management",
            "IT Audit and Compliance",
            "Digital Transformation"
        ],
        "business_focus": [
            "Case study analysis",
            "Stakeholder interviews",
            "Requirements documentation",
            "Business process modeling",
            "Cost-benefit analysis"
        ],
        "typical_projects": [
            "ERP system implementation",
            "Business process redesign",
            "Dashboard and reporting systems",
            "Organizational IT strategy",
            "Requirements analysis case studies"
        ]
    }'::jsonb,
    ARRAY[
        'Business Analyst',
        'Systems Analyst',
        'IT Project Manager',
        'Business Intelligence Analyst',
        'ERP Consultant',
        'Data Analyst',
        'IT Strategy Consultant',
        'Chief Information Officer (CIO)'
    ],
    'MEDIUM',
    '#db2777',
    '📱'
);

-- Insert Information Science Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'ISC',
    'Information Science',
    'Deals with the collection, classification, storage, retrieval, and dissemination of recorded knowledge. Focuses on information organization, digital libraries, knowledge management, and user information needs.',
    ARRAY[
        'Information architecture and organization',
        'Digital library systems',
        'Metadata standards and cataloging',
        'Knowledge management',
        'Information retrieval systems',
        'User information behavior'
    ],
    '{
        "overview": "Information Science prepares students to organize, preserve, and provide access to information resources. Combines technology with library science, archival studies, and information management.",
        "core_courses": [
            {"code": "ISC201", "name": "Information Organization", "credits": 3},
            {"code": "ISC202", "name": "Cataloging and Classification", "credits": 3},
            {"code": "ISC301", "name": "Digital Libraries", "credits": 3},
            {"code": "ISC302", "name": "Information Retrieval", "credits": 3},
            {"code": "ISC303", "name": "Knowledge Management", "credits": 3},
            {"code": "ISC401", "name": "Metadata and Standards", "credits": 3},
            {"code": "ISC402", "name": "Digital Preservation", "credits": 3},
            {"code": "ISC403", "name": "Information Policy", "credits": 3}
        ],
        "elective_areas": [
            "Digital Asset Management",
            "Records Management",
            "Archival Science",
            "Information Literacy",
            "Search Engine Optimization",
            "Content Management Systems"
        ],
        "specialized_skills": [
            "Dublin Core and MARC standards",
            "XML and metadata schemas",
            "Repository management",
            "Classification systems",
            "Digital preservation tools"
        ],
        "typical_projects": [
            "Digital library development",
            "Metadata schema design",
            "Information architecture planning",
            "Repository system implementation",
            "Knowledge base organization"
        ]
    }'::jsonb,
    ARRAY[
        'Information Architect',
        'Digital Librarian',
        'Knowledge Manager',
        'Records Manager',
        'Data Curator',
        'Information Specialist',
        'Content Manager',
        'Archivist'
    ],
    'MEDIUM',
    '#7c3aed',
    '📚'
);

-- Insert Statistics Department
INSERT INTO departments (code, name, description, strengths, curriculum, career_paths, industry_demand, color, icon)
VALUES (
    'STAT',
    'Statistics',
    'Focuses on the collection, analysis, interpretation, presentation, and organization of data. Emphasizes statistical theory, methods, probability, and quantitative research with applications across many fields.',
    ARRAY[
        'Statistical theory and methods',
        'Data analysis and visualization',
        'Probability and inference',
        'Experimental design',
        'Quantitative research methods',
        'Statistical software proficiency'
    ],
    '{
        "overview": "Statistics prepares students to extract meaningful insights from data using mathematical and computational methods. Strong foundation in probability, inference, and applied statistics across domains.",
        "core_courses": [
            {"code": "STAT201", "name": "Probability Theory", "credits": 3},
            {"code": "STAT202", "name": "Statistical Inference", "credits": 3},
            {"code": "STAT301", "name": "Regression Analysis", "credits": 3},
            {"code": "STAT302", "name": "Experimental Design", "credits": 3},
            {"code": "STAT303", "name": "Time Series Analysis", "credits": 3},
            {"code": "STAT401", "name": "Multivariate Statistics", "credits": 3},
            {"code": "STAT402", "name": "Biostatistics", "credits": 3},
            {"code": "STAT403", "name": "Statistical Computing", "credits": 3}
        ],
        "elective_areas": [
            "Machine Learning for Statistics",
            "Survey Methodology",
            "Econometrics",
            "Survival Analysis",
            "Bayesian Statistics",
            "Nonparametric Methods"
        ],
        "software_tools": [
            "R and RStudio",
            "Python (NumPy, Pandas, SciPy)",
            "SPSS",
            "SAS",
            "Stata",
            "Excel for Analytics"
        ],
        "typical_projects": [
            "Survey data analysis",
            "Clinical trial design",
            "Economic forecasting",
            "Quality control studies",
            "Social science research"
        ]
    }'::jsonb,
    ARRAY[
        'Data Analyst',
        'Statistician',
        'Biostatistician',
        'Market Research Analyst',
        'Quantitative Researcher',
        'Actuary',
        'Econometrician',
        'Survey Statistician'
    ],
    'MEDIUM',
    '#eab308',
    '📈'
);

-- ================================================================
-- Verification Query
-- ================================================================

SELECT 
    code,
    name,
    LEFT(description, 50) || '...' as description_preview,
    array_length(strengths, 1) as strength_count,
    array_length(career_paths, 1) as career_count,
    industry_demand,
    color,
    icon
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

-- ================================================================
-- COMPLETION MESSAGE
-- ================================================================

DO $$
DECLARE
    dept_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO dept_count FROM departments;
    
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Departments Seeded Successfully!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Departments Inserted: %', dept_count;
    RAISE NOTICE 'Expected: 6 (CS, SWE, IT, IS, ISC, STAT)';
    RAISE NOTICE '==================================================';
    
    IF dept_count = 6 THEN
        RAISE NOTICE 'Status: ✅ All departments seeded correctly';
    ELSE
        RAISE WARNING 'Status: ⚠️ Department count mismatch!';
    END IF;
    
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Next Step: Run 003_seed_questions.sql';
    RAISE NOTICE '==================================================';
END $$;
