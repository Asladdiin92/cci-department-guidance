import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  School,
  MenuBook,
  Timer,
  TrendingUp,
  CheckCircle,
  Download,
  Computer,
  Engineering,
  NetworkCheck,
  Business,
  LibraryBooks,
  Analytics
} from '@mui/icons-material';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function ExitExamUnified() {
  const [selectedDept, setSelectedDept] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedDept(newValue);
  };

  const departments = [
    {
      code: 'SWE',
      name: 'Software Engineering',
      icon: <Engineering />,
      color: '#ea580c',
      subjects: [
        {
          category: 'Problem Analysis and Programming',
          lessonNumber: 1,
          subjects: [
            {
              name: 'Computer Programming',
              topics: ['Programming Fundamentals', 'Control Structures', 'Functions & Procedures', 'Arrays & Strings', 'File I/O', 'Debugging'],
              hasTextLesson: true
            },
            {
              name: 'Fundamental of Data Structure and Analysis',
              topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Hash Tables', 'Graphs', 'Algorithm Analysis'],
              hasTextLesson: true,
              lessonNumber: 2
            },
            {
              name: 'Object Oriented Programming',
              topics: ['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction', 'Design Patterns'],
              hasTextLesson: true,
              lessonNumber: 3
            },
            {
              name: 'Web Design and Programming',
              topics: ['HTML5 & CSS3', 'JavaScript & jQuery', 'Responsive Design', 'Bootstrap', 'Web Standards', 'Accessibility'],
              hasTextLesson: true,
              lessonNumber: 4
            },
            {
              name: 'Mobile Application Development',
              topics: ['Mobile Platforms', 'Android Development', 'iOS Development', 'Mobile UI/UX', 'App Deployment', 'Mobile Testing'],
              hasTextLesson: true,
              lessonNumber: 5
            },
            {
              name: 'Fundamentals of Database',
              topics: ['ER Modeling', 'Relational Model', 'SQL', 'Normalization', 'Database Design', 'Transactions'],
              hasTextLesson: true,
              lessonNumber: 6
            }
          ]
        },
        {
          category: 'Networking and Software Security',
          lessonNumber: 7,
          subjects: [
            {
              name: 'Fundamentals of Networking',
              topics: ['OSI Model', 'TCP/IP', 'Network Protocols', 'IP Addressing', 'Routing', 'Network Devices'],
              hasTextLesson: true
            },
            {
              name: 'Software and Information Security',
              topics: ['Security Fundamentals', 'Cryptography', 'Secure Coding', 'Web Security', 'Security Testing', 'Threat Modeling'],
              hasTextLesson: true,
              lessonNumber: 8
            }
          ]
        },
        {
          category: 'Software Requirement, Design, and Construction',
          lessonNumber: 9,
          subjects: [
            {
              name: 'Fundamentals of Software Engineering',
              topics: ['SDLC Models', 'Software Processes', 'Agile Methodologies', 'Software Metrics', 'Software Quality', 'Best Practices'],
              hasTextLesson: true
            },
            {
              name: 'Requirement Engineering, Architecture and Design',
              topics: ['Requirements Elicitation', 'Requirements Analysis', 'Software Architecture', 'Design Patterns', 'Architectural Styles', 'UML Diagrams'],
              hasTextLesson: true,
              lessonNumber: 10
            }
          ]
        },
        {
          category: 'Software Project Management and Quality Assurance',
          lessonNumber: 11,
          subjects: [
            {
              name: 'Software Project Management',
              topics: ['Project Planning', 'Scheduling', 'Risk Management', 'Team Management', 'Cost Estimation', 'Project Tracking'],
              hasTextLesson: true
            },
            {
              name: 'Software Testing, Verification and Quality Assurance',
              topics: ['Testing Fundamentals', 'Test Design', 'Unit Testing', 'Integration Testing', 'System Testing', 'Test Automation', 'Quality Standards'],
              hasTextLesson: true,
              lessonNumber: 12
            }
          ]
        },
        {
          category: 'Operating System and Computer Organization',
          lessonNumber: 13,
          subjects: [
            {
              name: 'Operating System and System Programming',
              topics: ['Process Management', 'Memory Management', 'File Systems', 'I/O Systems', 'Concurrency', 'System Calls'],
              hasTextLesson: true
            }
          ]
        },
        {
          category: 'Miscellaneous',
          lessonNumber: 14,
          subjects: [
            {
              name: 'Artificial Intelligence',
              topics: ['AI Fundamentals', 'Search Algorithms', 'Knowledge Representation', 'Machine Learning Basics', 'Neural Networks', 'Expert Systems'],
              hasTextLesson: true
            },
            {
              name: 'Big Data Modeling',
              topics: ['Big Data Fundamentals', 'Data Processing', 'MapReduce', 'NoSQL Databases', 'Data Analytics', 'Hadoop Ecosystem'],
              hasTextLesson: true,
              lessonNumber: 15
            }
          ]
        }
      ],
      description: 'Complete curriculum covering software development, quality assurance, and modern application development'
    },
    {
      code: 'CS',
      name: 'Computer Science',
      icon: <Computer />,
      color: '#4f46e5',
      subjects: [
        {
          category: 'System Development',
          lessonNumber: 1,
          subjects: [
            {
              name: 'Software Engineering',
              topics: ['SDLC Models', 'Requirements Engineering', 'Software Design', 'Testing & QA', 'Project Management', 'Maintenance'],
              hasTextLesson: true
            }
          ]
        },
        {
          category: 'Web Programming',
          lessonNumber: 2,
          subjects: [
            {
              name: 'Web Programming',
              topics: ['HTML5 & CSS3', 'JavaScript & DOM', 'Frontend Frameworks', 'Backend Development', 'RESTful APIs', 'Web Security'],
              hasTextLesson: true
            }
          ]
        },
        {
          category: 'Database Systems',
          lessonNumber: 3,
          subjects: [
            {
              name: 'Fundamental of Database Systems',
              topics: ['ER Modeling', 'Relational Model', 'SQL Queries', 'Normalization', 'Database Design', 'Relational Algebra'],
              hasTextLesson: true
            },
            {
              name: 'Advance Database Systems',
              topics: ['Transaction Management', 'Concurrency Control', 'Recovery Techniques', 'Distributed Databases', 'Query Optimization', 'NoSQL'],
              hasTextLesson: true,
              lessonNumber: 4
            }
          ]
        },
        {
          category: 'Programming and Algorithms',
          lessonNumber: 5,
          subjects: [
            {
              name: 'Computer Programming',
              topics: ['Programming Fundamentals', 'Control Structures', 'Functions', 'Arrays & Strings', 'File I/O', 'Debugging'],
              hasTextLesson: true
            },
            {
              name: 'Object Oriented Programming',
              topics: ['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Design Patterns'],
              hasTextLesson: true,
              lessonNumber: 6
            },
            {
              name: 'Design and Analysis of Algorithms',
              topics: ['Algorithm Complexity', 'Divide & Conquer', 'Dynamic Programming', 'Greedy Algorithms', 'Graph Algorithms', 'NP-Completeness'],
              hasTextLesson: true,
              lessonNumber: 7
            },
            {
              name: 'Data Structure and Algorithms',
              topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees & BST', 'Hash Tables', 'Graphs', 'Sorting & Searching'],
              hasTextLesson: true,
              lessonNumber: 8
            }
          ]
        },
        {
          category: 'Computer Networking and Security',
          lessonNumber: 9,
          subjects: [
            {
              name: 'Data Communication and Computer Networking',
              topics: ['OSI Model', 'TCP/IP Protocol Suite', 'Network Layer', 'Transport Layer', 'Application Layer', 'Routing Protocols'],
              hasTextLesson: true
            },
            {
              name: 'Computer Security',
              topics: ['Cryptography', 'Network Security', 'Security Protocols', 'Firewalls & IDS', 'Security Policies', 'Threat Analysis'],
              hasTextLesson: true,
              lessonNumber: 10
            },
            {
              name: 'Network and System Administration',
              topics: ['Server Administration', 'User Management', 'Network Configuration', 'System Monitoring', 'Backup & Recovery', 'Security Hardening'],
              hasTextLesson: true,
              lessonNumber: 11
            }
          ]
        },
        {
          category: 'Intelligent Systems',
          lessonNumber: 12,
          subjects: [
            {
              name: 'Introduction to Artificial Intelligence',
              topics: ['AI Fundamentals', 'Search Algorithms', 'Knowledge Representation', 'Machine Learning Basics', 'Neural Networks', 'Expert Systems'],
              hasTextLesson: true
            }
          ]
        },
        {
          category: 'Computer Architecture and Operating Systems',
          lessonNumber: 13,
          subjects: [
            {
              name: 'Operating System',
              topics: ['Process Management', 'Memory Management', 'File Systems', 'I/O Systems', 'Deadlock Handling', 'Virtual Memory'],
              hasTextLesson: true
            },
            {
              name: 'Computer Organization and Architecture',
              topics: ['Digital Logic', 'CPU Architecture', 'Memory Hierarchy', 'I/O Organization', 'Instruction Set Architecture', 'Pipeline'],
              hasTextLesson: true,
              lessonNumber: 14
            }
          ]
        },
        {
          category: 'Compiler and Complexity',
          lessonNumber: 15,
          subjects: [
            {
              name: 'Automata and Complexity Theory',
              topics: ['Finite Automata', 'Regular Expressions', 'Context-Free Grammars', 'Turing Machines', 'Decidability', 'Complexity Classes'],
              hasTextLesson: true
            },
            {
              name: 'Compiler Design',
              topics: ['Lexical Analysis', 'Syntax Analysis', 'Semantic Analysis', 'Code Generation', 'Code Optimization', 'Symbol Table'],
              hasTextLesson: true,
              lessonNumber: 16
            }
          ]
        }
      ],
      description: 'Comprehensive curriculum in algorithms, theory, and computational thinking'
    },
    {
      code: 'IT',
      name: 'Information Technology',
      icon: <NetworkCheck />,
      color: '#0d9488',
      subjects: [
        {
          category: 'Core Programming',
          subjects: [
            {
              name: 'Advanced Programming (Java)',
              topics: ['OOP Pillars', 'Exception Handling', 'File I/O & Streams', 'JDBC', 'Multithreading', 'RMI', 'Network Programming'],
              chapters: 8,
              hasWorksheet: true
            },
            {
              name: 'Event-Driven Programming (VB.NET/C#)',
              topics: ['Windows Forms', 'Event Handling', 'Exception Handling', 'File Manipulation', 'Database Programming', 'ASP.NET'],
              chapters: 7,
              hasWorksheet: true
            },
            {
              name: 'Data Structures & Algorithms',
              topics: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees & Graphs', 'Searching & Sorting', 'Recursion', 'Algorithm Analysis'],
              chapters: 6,
              hasWorksheet: false
            }
          ]
        },
        {
          category: 'Database Systems',
          subjects: [
            {
              name: 'Fundamentals of Database',
              topics: ['ER Modeling', 'Relational Model', 'SQL', 'Normalization', 'Relational Algebra', 'Database Design'],
              chapters: 6,
              hasWorksheet: true
            },
            {
              name: 'Advanced Database Management',
              topics: ['Transaction Management', 'Concurrency Control', 'Recovery Techniques', 'Database Security', 'Query Optimization', 'Distributed Databases'],
              chapters: 6,
              hasWorksheet: true
            }
          ]
        },
        {
          category: 'Networking & Systems',
          subjects: [
            {
              name: 'Fundamentals of Networking',
              topics: ['OSI Model', 'TCP/IP', 'Network Topologies', 'Transmission Media', 'LAN Switching', 'IP Addressing', 'Routing Protocols'],
              chapters: 7,
              hasWorksheet: false
            },
            {
              name: 'Data Communication & Computer Networks',
              topics: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer', 'Application Layer'],
              chapters: 5,
              hasWorksheet: false
            },
            {
              name: 'Network Device & Configuration',
              topics: ['Router Configuration', 'Switch Configuration', 'VLAN Setup', 'Network Troubleshooting', 'Cisco IOS'],
              chapters: 4,
              hasWorksheet: true
            },
            {
              name: 'System Administration',
              topics: ['Windows Server', 'Active Directory', 'Linux Administration', 'User Management', 'Network Services', 'Security'],
              chapters: 7,
              hasWorksheet: false
            }
          ]
        },
        {
          category: 'Web & Internet Technologies',
          subjects: [
            {
              name: 'Internet Programming I (HTML/CSS/JavaScript)',
              topics: ['HTML5 Fundamentals', 'CSS Styling', 'JavaScript Basics', 'DOM Manipulation', 'Form Validation', 'Event Handling'],
              chapters: 5,
              hasWorksheet: false
            },
            {
              name: 'Internet Programming II (PHP)',
              topics: ['PHP Basics', 'Forms & Validation', 'Sessions & Cookies', 'File Handling', 'MySQL Integration', 'Web Security'],
              chapters: 5,
              hasWorksheet: true
            }
          ]
        },
        {
          category: 'Software Engineering',
          subjects: [
            {
              name: 'System Analysis & Design',
              topics: ['SDLC Models', 'Requirements Analysis', 'UML Diagrams', 'System Design', 'Implementation', 'Testing', 'Maintenance'],
              chapters: 9,
              hasWorksheet: true
            },
            {
              name: 'IT Project Management',
              topics: ['Project Initiation', 'Planning', 'Scheduling', 'Resource Management', 'Risk Management', 'Quality Management', 'Project Closure'],
              chapters: 9,
              hasWorksheet: true
            },
            {
              name: 'Object-Oriented Analysis & Design',
              topics: ['OO Concepts', 'Use Case Modeling', 'Class Diagrams', 'Sequence Diagrams', 'Design Patterns', 'UML'],
              chapters: 8,
              hasWorksheet: false
            }
          ]
        },
        {
          category: 'Security & Maintenance',
          subjects: [
            {
              name: 'Information Assurance & Security',
              topics: ['Security Fundamentals', 'Cryptography', 'Network Security', 'Access Control', 'Security Policies', 'Risk Management'],
              chapters: 5,
              hasWorksheet: true
            },
            {
              name: 'Computer Maintenance & Troubleshooting',
              topics: ['Hardware Components', 'Motherboard Architecture', 'CPU & Memory', 'Storage Devices', 'Troubleshooting', 'System Assembly'],
              chapters: 6,
              hasWorksheet: true
            }
          ]
        },
        {
          category: 'Mobile & Distributed Systems',
          subjects: [
            {
              name: 'Mobile Application Development (Android)',
              topics: ['Android Architecture', 'Activities & Intents', 'UI Design', 'Data Storage', 'Networking', 'Services'],
              chapters: 4,
              hasWorksheet: true
            },
            {
              name: 'Distributed Systems',
              topics: ['DS Fundamentals', 'Processes', 'Communication', 'Naming', 'Synchronization', 'Consistency', 'Fault Tolerance'],
              chapters: 8,
              hasWorksheet: false
            }
          ]
        }
      ],
      description: 'Practical training in networking, system administration, and IT infrastructure'
    },
    {
      code: 'ISC',
      name: 'Information Science',
      icon: <LibraryBooks />,
      color: '#7c3aed',
      subjects: [
        {
          category: 'Foundation of Information Science',
          lessonNumber: 1,
          subjects: [
            {
              name: 'Introduction to Information Science',
              topics: ['Information Fundamentals', 'Information Lifecycle', 'Information Society', 'Information Professionals', 'Information Ethics', 'Information Policy'],
              hasTextLesson: true
            },
            {
              name: 'Information Storage & Retrieval System',
              topics: ['Storage Systems', 'Information Retrieval Models', 'Search Algorithms', 'Indexing Techniques', 'Query Processing', 'IR Evaluation'],
              hasTextLesson: true,
              lessonNumber: 2
            }
          ]
        },
        {
          category: 'Programming',
          lessonNumber: 3,
          subjects: [
            {
              name: 'Fundamental of Programming I',
              topics: ['Programming Basics', 'Variables & Data Types', 'Control Structures', 'Functions', 'Arrays', 'Problem Solving'],
              hasTextLesson: true
            },
            {
              name: 'Fundamental of Programming II',
              topics: ['Advanced Programming', 'Object-Oriented Concepts', 'File Handling', 'Data Structures', 'Algorithm Design', 'Debugging'],
              hasTextLesson: true,
              lessonNumber: 4
            },
            {
              name: 'Visual Basic Programming',
              topics: ['VB.NET Fundamentals', 'Windows Forms', 'Event-Driven Programming', 'Database Connectivity', 'Controls & UI', 'Application Development'],
              hasTextLesson: true,
              lessonNumber: 5
            },
            {
              name: 'Internet Programming',
              topics: ['HTML & CSS', 'JavaScript', 'PHP Programming', 'Web Development', 'Client-Server Model', 'Web Applications'],
              hasTextLesson: true,
              lessonNumber: 6
            }
          ]
        },
        {
          category: 'Data Management & Networking',
          lessonNumber: 7,
          subjects: [
            {
              name: 'Fundamental of Database',
              topics: ['Database Concepts', 'ER Modeling', 'Relational Model', 'SQL', 'Normalization', 'Database Design'],
              hasTextLesson: true
            },
            {
              name: 'Data Communication and Networking',
              topics: ['Network Fundamentals', 'OSI Model', 'TCP/IP', 'Network Protocols', 'Data Transmission', 'Network Devices'],
              hasTextLesson: true,
              lessonNumber: 8
            }
          ]
        },
        {
          category: 'Knowledge Management',
          lessonNumber: 9,
          subjects: [
            {
              name: 'Knowledge Organization and Representation',
              topics: ['Classification Systems', 'Cataloging', 'Metadata Standards', 'Ontologies', 'Taxonomies', 'Knowledge Structures'],
              hasTextLesson: true
            },
            {
              name: 'Automating of Libraries and Information Systems',
              topics: ['Library Automation', 'Integrated Library Systems', 'Digital Libraries', 'Library Software', 'Automation Standards', 'System Implementation'],
              hasTextLesson: true,
              lessonNumber: 10
            },
            {
              name: 'Multimedia System',
              topics: ['Multimedia Fundamentals', 'Audio & Video', 'Image Processing', 'Multimedia Authoring', 'Compression Techniques', 'Multimedia Applications'],
              hasTextLesson: true,
              lessonNumber: 11
            }
          ]
        },
        {
          category: 'Scientific Studies & Communication',
          lessonNumber: 12,
          subjects: [
            {
              name: 'Scholarly Communication',
              topics: ['Academic Publishing', 'Peer Review', 'Research Dissemination', 'Open Access', 'Citation Analysis', 'Scientific Writing'],
              hasTextLesson: true
            }
          ]
        }
      ],
      description: 'Specialized training in information organization, digital libraries, and knowledge management'
    },
    {
      code: 'IS',
      name: 'Information Systems',
      icon: <Business />,
      color: '#db2777',
      subjects: [
        {
          category: 'Computer Programming and Web Technology',
          lessonNumber: 1,
          subjects: [
            {
              name: 'Basic Computer Programming',
              topics: ['Programming Fundamentals', 'Variables & Data Types', 'Control Structures', 'Functions', 'Arrays', 'Problem Solving'],
              hasTextLesson: true
            },
            {
              name: 'Object Oriented Programming',
              topics: ['OOP Concepts', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
              hasTextLesson: true,
              lessonNumber: 2
            },
            {
              name: 'Internet Programming',
              topics: ['HTML & CSS', 'JavaScript', 'PHP Programming', 'Web Development', 'Client-Server Architecture', 'Web Applications'],
              hasTextLesson: true,
              lessonNumber: 3
            }
          ]
        },
        {
          category: 'Computer Networking and Information Security',
          lessonNumber: 4,
          subjects: [
            {
              name: 'Data Communication and Computer Networks',
              topics: ['Network Fundamentals', 'OSI Model', 'TCP/IP', 'Network Protocols', 'Network Topologies', 'Data Transmission'],
              hasTextLesson: true
            },
            {
              name: 'Information System Security',
              topics: ['Security Fundamentals', 'Cryptography', 'Access Control', 'Security Policies', 'Risk Management', 'Security Threats'],
              hasTextLesson: true,
              lessonNumber: 5
            }
          ]
        },
        {
          category: 'Database and Information Management',
          lessonNumber: 6,
          subjects: [
            {
              name: 'Database Systems',
              topics: ['Database Concepts', 'ER Modeling', 'Relational Model', 'SQL', 'Normalization', 'Database Design'],
              hasTextLesson: true
            },
            {
              name: 'Introduction to Information Storage and Retrieval',
              topics: ['Storage Systems', 'Information Retrieval', 'Indexing', 'Search Algorithms', 'Query Processing', 'IR Models'],
              hasTextLesson: true,
              lessonNumber: 7
            },
            {
              name: 'Multimedia Information Systems',
              topics: ['Multimedia Fundamentals', 'Audio & Video', 'Image Processing', 'Multimedia Databases', 'Compression', 'Multimedia Apps'],
              hasTextLesson: true,
              lessonNumber: 8
            }
          ]
        },
        {
          category: 'Intelligent Systems',
          lessonNumber: 9,
          subjects: [
            {
              name: 'Fundamentals of Artificial Intelligence',
              topics: ['AI Fundamentals', 'Search Algorithms', 'Knowledge Representation', 'Machine Learning', 'Neural Networks', 'Expert Systems'],
              hasTextLesson: true
            },
            {
              name: 'Knowledge Management',
              topics: ['KM Fundamentals', 'Knowledge Creation', 'Knowledge Sharing', 'KM Systems', 'Organizational Learning', 'KM Technologies'],
              hasTextLesson: true,
              lessonNumber: 10
            }
          ]
        },
        {
          category: 'Introduction to Machine Learning',
          lessonNumber: 11,
          subjects: [
            {
              name: 'Introduction to Machine Learning',
              topics: ['ML Fundamentals', 'Supervised Learning', 'Unsupervised Learning', 'Classification', 'Regression', 'Model Evaluation'],
              hasTextLesson: true
            }
          ]
        },
        {
          category: 'Information Systems Development and Management',
          lessonNumber: 12,
          subjects: [
            {
              name: 'Management Information Systems and Strategy',
              topics: ['MIS Fundamentals', 'Strategic Planning', 'IT Strategy', 'Business Alignment', 'Decision Support Systems', 'Executive Information Systems'],
              hasTextLesson: true
            },
            {
              name: 'Information Systems/Project',
              topics: ['IS Project Management', 'Project Planning', 'Requirements Analysis', 'System Design', 'Implementation', 'Project Evaluation'],
              hasTextLesson: true,
              lessonNumber: 13
            },
            {
              name: 'Enterprise Systems',
              topics: ['ERP Systems', 'SCM Systems', 'CRM Systems', 'Enterprise Architecture', 'Business Process Integration', 'ERP Implementation'],
              hasTextLesson: true,
              lessonNumber: 14
            },
            {
              name: 'System Analysis and Design',
              topics: ['SDLC Models', 'Requirements Engineering', 'System Modeling', 'UML Diagrams', 'System Design', 'Implementation Strategies'],
              hasTextLesson: true,
              lessonNumber: 15
            }
          ]
        }
      ],
      description: 'Bridge between business and technology with enterprise systems and strategic IT management'
    },
    {
      code: 'STAT',
      name: 'Statistics',
      icon: <Analytics />,
      color: '#eab308',
      subjects: [
        {
          category: 'Fundamental of Statistics',
          lessonNumber: 1,
          subjects: [
            {
              name: 'Basic Statistics',
              topics: ['Descriptive Statistics', 'Measures of Central Tendency', 'Measures of Dispersion', 'Probability Basics', 'Data Visualization', 'Statistical Graphs'],
              hasTextLesson: true
            },
            {
              name: 'Statistical Methods',
              topics: ['Sampling Methods', 'Hypothesis Testing', 'Confidence Intervals', 'T-tests', 'Chi-Square Tests', 'ANOVA'],
              hasTextLesson: true,
              lessonNumber: 2
            }
          ]
        },
        {
          category: 'Statistical Computing and Research Method',
          lessonNumber: 3,
          subjects: [
            {
              name: 'Statistical Computing I',
              topics: ['R Programming', 'Data Manipulation', 'Statistical Functions', 'Data Visualization in R', 'Statistical Analysis', 'R Packages'],
              hasTextLesson: true
            },
            {
              name: 'Statistical Computing II',
              topics: ['Advanced R Programming', 'Data Mining', 'Statistical Modeling', 'Machine Learning in R', 'Big Data Analytics', 'R Markdown'],
              hasTextLesson: true,
              lessonNumber: 4
            },
            {
              name: 'Research Method and Sample Survey Practice',
              topics: ['Research Design', 'Survey Methodology', 'Questionnaire Design', 'Sampling Techniques', 'Data Collection', 'Survey Analysis'],
              hasTextLesson: true,
              lessonNumber: 5
            }
          ]
        },
        {
          category: 'Statistical Modeling',
          lessonNumber: 6,
          subjects: [
            {
              name: 'Regression Analysis',
              topics: ['Simple Linear Regression', 'Multiple Regression', 'Model Diagnostics', 'Variable Selection', 'Logistic Regression', 'Regression Applications'],
              hasTextLesson: true
            },
            {
              name: 'Time Series Analysis',
              topics: ['Time Series Concepts', 'Trend Analysis', 'Seasonal Decomposition', 'ARIMA Models', 'Forecasting', 'Time Series Applications'],
              hasTextLesson: true,
              lessonNumber: 7
            },
            {
              name: 'Design and Analysis of Experiments',
              topics: ['Experimental Design', 'Factorial Designs', 'Randomized Block Design', 'Latin Square Design', 'ANOVA', 'Multiple Comparisons'],
              hasTextLesson: true,
              lessonNumber: 8
            },
            {
              name: 'Categorical Data Analysis',
              topics: ['Contingency Tables', 'Chi-Square Tests', 'Loglinear Models', 'Logistic Regression', 'Ordinal Data Analysis', 'Multinomial Models'],
              hasTextLesson: true,
              lessonNumber: 9
            },
            {
              name: 'Statistical Quality Control',
              topics: ['Quality Control Basics', 'Control Charts', 'Process Capability', 'Acceptance Sampling', 'Six Sigma', 'Quality Improvement'],
              hasTextLesson: true,
              lessonNumber: 10
            }
          ]
        },
        {
          category: 'Statistical Theories',
          lessonNumber: 11,
          subjects: [
            {
              name: 'Statistical Theory of Distribution',
              topics: ['Probability Distributions', 'Normal Distribution', 'Binomial Distribution', 'Poisson Distribution', 'Continuous Distributions', 'Distribution Theory'],
              hasTextLesson: true
            },
            {
              name: 'Statistical Inference',
              topics: ['Point Estimation', 'Interval Estimation', 'Maximum Likelihood', 'Hypothesis Testing', 'Bayesian Inference', 'Inference Theory'],
              hasTextLesson: true,
              lessonNumber: 12
            }
          ]
        },
        {
          category: 'Social Statistics',
          lessonNumber: 13,
          subjects: [
            {
              name: 'Demography',
              topics: ['Population Studies', 'Vital Statistics', 'Fertility Analysis', 'Mortality Analysis', 'Migration Studies', 'Population Projections'],
              hasTextLesson: true
            },
            {
              name: 'Social and Economic Statistics',
              topics: ['Economic Indicators', 'Index Numbers', 'National Accounts', 'Labor Statistics', 'Price Statistics', 'Social Indicators'],
              hasTextLesson: true,
              lessonNumber: 14
            }
          ]
        }
      ],
      description: 'Complete training in statistical theory, data analysis, and quantitative research methods'
    }
  ];

  const examInfo = [
    { icon: <Timer />, label: 'Duration', value: '3 Hours' },
    { icon: <MenuBook />, label: 'Total Questions', value: '100' },
    { icon: <TrendingUp />, label: 'Pass Mark', value: '50%' },
    { icon: <School />, label: 'Exam Date', value: 'End of Semester 8' }
  ];

  const currentDept = departments[selectedDept];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Chip label="Exit Exam Preparation" color="primary" sx={{ mb: 2 }} />
        <Typography variant="h3" gutterBottom fontWeight={700}>
          CCI Exit Exam Guide
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          Comprehensive exit exam information and study materials for all CCI departments
        </Typography>
      </Box>

      {/* Department Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs
          value={selectedDept}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: 72,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600
            }
          }}
        >
          {departments.map((dept, idx) => (
            <Tab
              key={dept.code}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {dept.icon}
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      {dept.name}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Exam Info Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {examInfo.map((item, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ color: 'primary.main', mr: 1 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {item.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {departments.map((dept, deptIdx) => (
        <TabPanel key={dept.code} value={selectedDept} index={deptIdx}>
          {/* Department Alert */}
          <Alert severity="info" sx={{ mb: 4 }} icon={dept.icon}>
            <strong>{dept.name} Exit Exam:</strong> {dept.description}
          </Alert>

          {/* Study Materials by Category */}
          <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
            {dept.name} Exit Exam Coverage
          </Typography>

          {dept.subjects.map((category, idx) => (
            <Box key={idx} sx={{ mb: 4 }}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} sx={{ color: dept.color }}>
                  {category.category}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  {category.subjects.map((subject, sidx) => (
                    <Grid item xs={12} md={category.subjects.length === 1 ? 12 : 6} key={sidx}>
                      <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {subject.name}
                            </Typography>
                            {subject.hasTextLesson && (
                              <Chip label="Text Lesson" size="small" color="success" />
                            )}
                            {subject.hasWorksheet && (
                              <Chip label="MCQ Available" size="small" color="success" />
                            )}
                          </Box>

                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                            {subject.topics.slice(0, 4).map((topic, tidx) => (
                              <Chip
                                key={tidx}
                                label={topic}
                                size="small"
                                variant="outlined"
                                sx={{ mb: 1, fontSize: '0.7rem' }}
                              />
                            ))}
                            {subject.topics.length > 4 && (
                              <Chip
                                label={`+${subject.topics.length - 4} more`}
                                size="small"
                                sx={{ mb: 1, fontSize: '0.7rem' }}
                              />
                            )}
                          </Stack>

                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Download />}
                            href="https://drive.google.com/drive/folders/1dcKPCbP2L8nxq7sLbmXCGd-6_t_xjuoH"
                            target="_blank"
                            rel="noopener noreferrer"
                            fullWidth
                            sx={{ mt: 1 }}
                          >
                            Download Materials
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Box>
          ))}

          {/* Preparation Tips */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={700}>
              Preparation Strategy
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Review all core courses from your department curriculum" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Practice past exam papers (available in CCI library)" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Form study groups with classmates" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Focus on understanding concepts, not just memorization" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary="Manage your time effectively during preparation" />
              </ListItem>
            </List>

            <Alert severity="success" sx={{ mt: 3 }}>
              <strong>Pro Tip:</strong> Download all study materials from Google Drive and organize your study 
              schedule by category. Focus on subjects marked with "MCQ Available" for practice questions.
            </Alert>
          </Paper>

          {/* Download All Materials */}
          <Paper elevation={3} sx={{ p: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
            <Typography variant="h5" gutterBottom fontWeight={700}>
              📚 Complete Study Materials Package
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Access all {dept.name} exit exam materials, past papers, MCQ worksheets, and study guides.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Download />}
              href="https://drive.google.com/drive/folders/1dcKPCbP2L8nxq7sLbmXCGd-6_t_xjuoH"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }}
            >
              Download All {dept.name} Materials
            </Button>
          </Paper>
        </TabPanel>
      ))}

      {/* Contact Info */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          For more information about exit exams, contact the CCI Academic Affairs Office
        </Typography>
        <Typography variant="body2" color="primary.main" fontWeight={600}>
          📧 academic@cci.haramaya.edu.et | 📞 +251 91 234 5678
        </Typography>
      </Box>
    </Container>
  );
}

export default ExitExamUnified;
