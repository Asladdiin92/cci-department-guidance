// Questions data structure
// Each question has scoring weights for each department (CS, SWE, IT, IS, ISC, STAT)

export const questions = [
  {
      "id": 1,
      "text": "How do you most naturally approach a new difficult problem?",
      "options": [
          {
              "text": "By understanding the underlying computational theory and formal model before solving it",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "By designing and building a working software solution, then refining it through testing",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "By diagnosing the environment, tools, or infrastructure so the system can run reliably",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "By clarifying stakeholder needs and mapping the business process before choosing the technology",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "By identifying what information users need, organizing the sources, and making them easy to access",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "By defining the variables, collecting data, and testing what the evidence says",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 2,
      "text": "Which course challenge sounds most interesting to you?",
      "options": [
          {
              "text": "Algorithm analysis, automata, or another core computation problem",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "A software design, testing, and maintenance project",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "A networking, systems administration, cloud, or security lab",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "A systems analysis, ERP, or management information systems case",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "An information organization, indexing, digital library, or records-management task",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "A probability, inference, regression, or experimental-design problem",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 3,
      "text": "Which output would make you feel proudest?",
      "options": [
          {
              "text": "An efficient algorithm or elegant computational solution",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "A high-quality application that real people can use",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "A stable network, lab, or service platform with minimal downtime",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "A workflow or information system that improves organizational performance",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "A well-organized archive or repository that helps users find trustworthy information quickly",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "A statistical report that guides a real decision with evidence",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 4,
      "text": "When a topic is confusing, what do you usually do first?",
      "options": [
          {
              "text": "Go back to the principles and derive the logic carefully",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Prototype a small version and learn by building",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Check the setup, configuration, and system behavior step by step",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Ask what problem the organization or user is actually trying to solve",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Classify the sources, define terms clearly, and trace how information should flow",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Inspect the data, assumptions, and possible sources of variation",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 5,
      "text": "How do you learn best?",
      "options": [
          {
              "text": "Conceptual lectures and problems that develop rigorous reasoning",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Projects, code reviews, and iterative feedback",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Hands-on labs with real devices, platforms, or administration tasks",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Case studies about organizations, requirements, and technology use",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Guided practice organizing, retrieving, preserving, and serving information for users",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Worked examples with datasets, statistical software, and interpretation",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 6,
      "text": "Which kind of reading material do you enjoy most?",
      "options": [
          {
              "text": "Technical theory and foundational computing concepts",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Software documentation, design patterns, and engineering best practices",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Vendor manuals, setup guides, and operational procedures",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Business requirements, policy documents, and process models",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Metadata standards, information-service guidelines, cataloging rules, or archival practices",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Research reports, survey results, and statistical analyses",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 7,
      "text": "Which toolset sounds most appealing?",
      "options": [
          {
              "text": "Core programming, algorithmic problem-solving, and systems-level computing tools",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Frameworks, version control, testing tools, and CI/CD workflows",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Routers, server dashboards, system monitors, and security tools",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "ERP or reporting tools, requirements models, and organizational databases",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Digital library or repository systems, metadata tools, and records-management platforms",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "R, SPSS, Stata, Python analytics, and data-visualization tools",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 8,
      "text": "Which assignment would you volunteer for first?",
      "options": [
          {
              "text": "Explaining why an algorithm is correct and comparing its complexity",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Leading the design and implementation of an application module",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Configuring the lab environment and ensuring all services work",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Interviewing stakeholders and documenting functional requirements",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Creating an organized index or repository so users can retrieve materials quickly",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Designing the data collection plan and analyzing the results",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 9,
      "text": "Which role fits you best in a team?",
      "options": [
          {
              "text": "The one who handles the most abstract technical reasoning",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "The one who turns ideas into working software",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "The one who keeps the environment, tools, and services running",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "The one who coordinates requirements, process, and stakeholder understanding",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "The one who organizes documents, knowledge, or resources so the team can find what it needs",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "The one who evaluates data and checks whether conclusions are valid",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 10,
      "text": "What motivates you most in your future work?",
      "options": [
          {
              "text": "Understanding how computing works at a fundamental level",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Engineering reliable software that solves real user problems",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Making technology dependable, secure, and usable in practice",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Helping an organization use technology more effectively",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Improving access to useful, accurate, and well-organized information",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Producing trustworthy evidence for decisions and research",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 11,
      "text": "Where would you most like to work?",
      "options": [
          {
              "text": "A computing research lab or advanced technical team",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "A software company or product development team",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "An ICT operations, support, security, or infrastructure team",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "A bank, enterprise, or public organization improving systems and processes",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "A library, archive, documentation center, school resource center, or knowledge-service unit",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "A statistical office, research center, NGO, or analytics unit",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 12,
      "text": "Which internship sounds best to you?",
      "options": [
          {
              "text": "Optimizing a computation-heavy program or intelligent system",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Building and testing a campus or business application",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Deploying and troubleshooting networked systems",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Analyzing and redesigning an office information workflow",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Digitizing, cataloging, and improving access to institutional records or learning resources",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Collecting and analyzing survey or socioeconomic data",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 13,
      "text": "Which long-term goal is most attractive to you?",
      "options": [
          {
              "text": "Become a computing specialist, researcher, or advanced technical expert",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Become a software architect, quality engineer, or engineering lead",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Become an infrastructure, security, or ICT service leader",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Become an information systems manager, consultant, or CIO bridging management and technology",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Become an information professional, archivist, knowledge manager, or resource-center leader",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Become a statistician, biostatistician, econometrician, or quantitative researcher",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 14,
      "text": "Which kind of reasoning comes most naturally to you?",
      "options": [
          {
              "text": "Formal, logical, and computational reasoning",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Design-oriented reasoning about how components should work together",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Procedural reasoning about configuration, troubleshooting, and maintenance",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Organizational reasoning about people, process, and system fit",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Classificatory reasoning about sources, metadata, access, and information use",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Quantitative reasoning about uncertainty, trends, and evidence",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 15,
      "text": "Which statement sounds most like you?",
      "options": [
          {
              "text": "I enjoy hard problems even when the solution is highly abstract",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "I like turning ideas into maintainable products people can actually use",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "I like being the person who can fix, configure, and support the technical environment",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "I like understanding how technology should support organizational goals",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "I like making information findable, usable, preserved, and meaningful for different users",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "I like checking whether numbers and conclusions are really justified",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 16,
      "text": "What kind of mistake bothers you most?",
      "options": [
          {
              "text": "An inefficient or logically flawed algorithm",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Poorly designed or untested software",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Unstable configuration, downtime, or weak security practice",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Unclear requirements or a system that does not fit the organization",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Disorganized records, missing metadata, or information people cannot retrieve",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Weak sampling, biased data, or invalid statistical conclusions",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 17,
      "text": "Haramaya-specific scenario: the university wants to improve student services. Which task would you choose?",
      "options": [
          {
              "text": "Design the core algorithm for scheduling, allocation, or optimization",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Build the web or mobile system students will directly use",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Set up the infrastructure, deployment, and access control",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Analyze the service workflow and define system requirements with offices",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Organize notices, records, and learning resources so students can easily find reliable information",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Analyze student survey data to identify patterns and measure improvement",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 18,
      "text": "A college unit has years of mixed paper and digital materials. What sounds most interesting?",
      "options": [
          {
              "text": "Model the underlying search or retrieval problem computationally",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Build the software interface for searching and updating the collection",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Install and maintain the storage, network, and backup environment",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Define how the unit's work process and users should interact with the system",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Classify, preserve, describe, and retrieve the materials as an information resource center",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Study usage patterns and evaluate the collection with data",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 19,
      "text": "A community project needs evidence and communication. Where do you contribute most?",
      "options": [
          {
              "text": "Solving the technically hardest computational part",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Developing the application or tool used in the project",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Managing the platforms, devices, and connectivity needed to run it",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Coordinating requirements and translating between users and the technical team",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Curating information resources, documentation, and access for stakeholders",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Designing the study, analyzing results, and presenting statistical findings",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  },
  {
      "id": 20,
      "text": "If you had to choose one capstone project today, which would it be?",
      "options": [
          {
              "text": "Build an intelligent algorithm or computational model for a complex problem",
              "scores": {
                  "CS": 3,
                  "SWE": 1,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 0,
                  "STAT": 2
              }
          },
          {
              "text": "Engineer a complete software system with a testing and maintenance plan",
              "scores": {
                  "CS": 1,
                  "SWE": 3,
                  "IT": 1,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Design and manage a secure campus network or service environment",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 3,
                  "IS": 1,
                  "ISC": 0,
                  "STAT": 0
              }
          },
          {
              "text": "Analyze and improve a university or business information-system process",
              "scores": {
                  "CS": 0,
                  "SWE": 1,
                  "IT": 1,
                  "IS": 3,
                  "ISC": 1,
                  "STAT": 0
              }
          },
          {
              "text": "Create a digital library, archive, or records-management solution for real users",
              "scores": {
                  "CS": 0,
                  "SWE": 0,
                  "IT": 1,
                  "IS": 2,
                  "ISC": 3,
                  "STAT": 1
              }
          },
          {
              "text": "Conduct a full statistical study from data collection to interpretation",
              "scores": {
                  "CS": 1,
                  "SWE": 0,
                  "IT": 0,
                  "IS": 0,
                  "ISC": 1,
                  "STAT": 3
              }
          }
      ]
  }
];

// Department information for results display
export const departments = {
  CS: {
      name: "Computer Science",
      fullName: "Computer Science",
      color: "#3b82f6",
      description: "Focuses on theoretical foundations, algorithms, and computational problem-solving. Best for those who enjoy mathematics, abstract thinking, and understanding how computers work at a fundamental level.",
      careers: ["Algorithm Developer", "Research Scientist", "AI/ML Engineer", "Compiler Engineer", "Computer Scientist"],
      strengths: ["Strong mathematical foundation", "Algorithm design", "Theoretical knowledge", "Research skills"],
      // Extended information for detail page
      overview: "The Department of Computer Science at Haramaya University was officially opened in 2003 and has since expanded into eight computer laboratories, growing into a College of Computing and Informatics department. The program concentrates on the scientific aspects of computing, giving students a thorough understanding of the underlying concepts and principles of the field so they can adapt as computing rapidly evolves \u2014 with strong emphasis on algorithms, data structures, artificial intelligence, and theoretical computer science, alongside practical skills for real-world systems. The department is a local Cisco Networking Academy and offers BSc, MSc, and MSc in Artificial Intelligence programs.",
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
      curriculum: {
          "Core Computer Science Theory": [
              "Data structures and algorithms design",
              "Theory of computation and formal languages",
              "Discrete mathematics and logic",
              "Algorithm analysis and complexity theory"
          ],
          "Artificial Intelligence & Machine Learning": [
              "Machine learning fundamentals",
              "Neural networks and deep learning",
              "Natural language processing",
              "Computer vision"
          ],
          "Systems & Architecture": [
              "Computer architecture and organization",
              "Operating systems design",
              "Compiler design and construction",
              "Database management systems"
          ],
          "Mathematics & Theoretical Foundations": [
              "Advanced calculus and linear algebra",
              "Probability and statistics",
              "Numerical methods",
              "Mathematical modeling"
          ],
          "Research & Advanced Topics": [
              "Research methodology",
              "Computational biology",
              "Distributed systems",
              "Advanced algorithms"
          ]
      },
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
      overview: "The Department of Software Engineering at Haramaya University was established in 2008 in direct response to national demand for skilled, professional software development manpower. It runs a harmonized four-year curriculum focused on the systematic design, development, testing, and maintenance of software systems \u2014 with practical skills, modern frameworks, and industry best practices reinforced through the college's other departments (Computer Science, Information System, Information Science, and Statistics).",
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
      curriculum: {
          "Software Development Lifecycle": [
              "Software requirements analysis and specification",
              "Software design patterns and architecture",
              "Agile and Scrum methodologies",
              "Software project management"
          ],
          "Full-Stack Development": [
              "Frontend development (HTML, CSS, JavaScript, React)",
              "Backend development (Node.js, Python, Java)",
              "RESTful API design and development",
              "Database design and management (SQL, NoSQL)"
          ],
          "Mobile & Web Applications": [
              "Mobile app development (Android/iOS)",
              "Progressive web applications",
              "Responsive design principles",
              "Cross-platform development"
          ],
          "Quality Assurance & Testing": [
              "Software testing strategies (unit, integration, system)",
              "Test automation tools and frameworks",
              "Quality assurance best practices",
              "Continuous integration and deployment"
          ],
          "DevOps & Cloud": [
              "DevOps principles and practices",
              "CI/CD pipeline setup and management",
              "Cloud platforms (AWS, Azure, Google Cloud)",
              "Containerization (Docker, Kubernetes)"
          ]
      },
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
      overview: "The Department of Information Technology at Haramaya University exists because Computer Science programs alone could not produce enough graduates capable of meeting organizations' practical technology needs \u2014 troubleshooting, administration, integration, and customization of IT systems. Graduates are trained to select, integrate, install, and maintain an organization's hardware and software (networks, servers, websites, email systems) and to plan and manage the full technology life cycle: maintenance, upgrades, and replacement. The department offers BSc and BEd programs in Information Technology.",
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
      curriculum: {
          "Mobile Application Development": [
              "Graphics and multimedia support in Android",
              "Android Studio and SDK fundamentals",
              "Simple Android application development"
          ],
          "Data Communication and Computer Networks": [
              "Data transmission and transmission media",
              "Network protocols",
              "Seven layers of the OSI Model",
              "TCP/IP protocol suite and OSI Model comparison"
          ],
          "System & Network Administration": [
              "Network and device management",
              "User and group management",
              "Disk and file management",
              "Backup and restore procedures",
              "Remote network administration"
          ],
          "Network Device and Configuration": [
              "Foundry network devices",
              "Advanced network device configuration",
              "VLAN creation and configuration",
              "Network device monitoring and change tracking",
              "Network event storage and retrieval",
              "Router and switch configuration and management",
              "Network protocol implementation and configuration",
              "Comprehensive network management"
          ],
          "Information Assurance and Security": [
              "Threats, risks, and vulnerabilities in information systems",
              "Data security policies and administration security",
              "Secure systems design",
              "Information systems security concepts"
          ]
      },
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
      overview: "The Department of Information System at Haramaya University trains specialists who focus on integrating computing technologies and business processes to meet organizational needs. Graduates must understand both technical and organizational factors well enough to bridge the gap between technical teams and management \u2014 helping organizations use technology to achieve their goals efficiently and effectively. The Management Information Systems (MIS) emphasis covers project management, business functional areas, systems analysis and design, database design, network management, and organizational controls, preparing graduates for roles as information technology managers or professionals with potential for executive positions.",
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
      curriculum: {
          "Business-IT Integration": [
              "Management information systems fundamentals",
              "Business process analysis and optimization",
              "IT strategy and organizational alignment",
              "Business intelligence and analytics"
          ],
          "Enterprise Systems": [
              "Enterprise resource planning (SAP, Oracle)",
              "Customer relationship management (CRM)",
              "Supply chain management systems",
              "Enterprise architecture"
          ],
          "Systems Analysis & Development": [
              "Systems analysis and design methodologies",
              "Requirements engineering",
              "Business process modeling",
              "Decision support systems"
          ],
          "Project & Change Management": [
              "IT project management (PMI, PRINCE2)",
              "Change management in organizations",
              "Risk management and governance",
              "IT service management (ITIL)"
          ],
          "Digital Business": [
              "E-commerce platforms and strategies",
              "Digital transformation",
              "Business analytics and data-driven decisions",
              "IT consulting and advisory"
          ]
      },
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
  ISC: {
      name: "Information Science",
      fullName: "Information Science",
      color: "#06b6d4",
      description: "Combines library and information science with ICT, focusing on how information is generated, organized, stored, retrieved, disseminated, and used in libraries, archives, information centers, and digital environments.",
      careers: ["Information Specialist", "Professional Librarian", "Archivist", "Knowledge Manager", "Record Manager"],
      strengths: ["Information organization", "Information retrieval", "Knowledge and records management", "Client-centered information services"],
      overview: "Haramaya University developed its Information Science curriculum in 2007, originally as the Department of Information Studies before being renamed, following national curriculum review, to the Department of Information Science. The program prepares information professionals with a client-centered perspective \u2014 designing and adapting information products and services that respond to user needs rather than forcing users to adapt to the service. It provides professional education in librarianship for careers in libraries, information agencies, the information industry, and any organization where information is a vital resource, while also building ICT-supported skills for information systems, multimedia resources, and digital information resource centers. Programs include BSc and MSc in Information Science, plus an MSc in Data Science.",
      idealFor: [
          "Students who enjoy organizing knowledge and making information easy to find",
          "Those interested in libraries, archives, information centers, and digital information services",
          "People who like user-centered work, documentation, classification, and research support",
          "Future information professionals who want to combine service, management, and ICT"
      ],
      keySubjects: [
          "Information Organization & Classification",
          "Information Retrieval",
          "Knowledge Management",
          "Records and Archives Management",
          "Digital Libraries & Information Services",
          "Information Systems Analysis & Design",
          "Database and Multimedia Information Resources",
          "Research Methods"
      ],
      curriculum: {
          "Information Organization": [
              "Information classification and cataloging",
              "Metadata standards and schemas",
              "Knowledge organization systems",
              "Indexing and abstracting"
          ],
          "Information Retrieval & Access": [
              "Information retrieval systems",
              "Search algorithms and techniques",
              "Information architecture",
              "User interface design for information systems"
          ],
          "Library & Archives Management": [
              "Digital library systems",
              "Archives and records management",
              "Collection development and management",
              "Preservation of digital and physical resources"
          ],
          "Knowledge & Content Management": [
              "Knowledge management systems",
              "Content management systems (CMS)",
              "Information policy and ethics",
              "Intellectual property and copyright"
          ],
          "Research & Information Services": [
              "Research methodology and data analysis",
              "Information needs assessment",
              "Reference and information services",
              "Data curation and data science fundamentals"
          ]
      },
      careerPaths: [
          {
              title: "Information Specialist",
              salary: "Varies by organization",
              demand: "Medium"
          },
          {
              title: "Professional Librarian / Archivist",
              salary: "Varies by institution",
              demand: "Medium"
          },
          {
              title: "Knowledge or Records Manager",
              salary: "Varies by sector",
              demand: "Medium"
          }
      ],
      mathRequirement: "Low-Moderate - basic statistics, research methods, and applied information analysis",
      practiceRatio: "50% Practical, 50% Theoretical",
      jobMarket: "Most directly aligned with libraries, universities, schools, archives, documentation centers, NGOs, public institutions, and ICT-supported information management roles. Exact local demand should be validated with the department head.",
      localCompanies: ["University Libraries", "School Libraries", "Archives & Documentation Centers", "Government Agencies", "NGOs & Research Institutes"],
      studyTips: [
          "Develop strong habits in documentation, classification, and careful information handling",
          "Practice organizing digital and physical information resources for real users",
          "Learn database, retrieval, and records-management tools alongside service principles",
          "Pay attention to user needs, access, preservation, and information ethics"
      ]
  },
  STAT: {
      name: "Statistics",
      fullName: "Statistics",
      color: "#ef4444",
      description: "Centers on data analysis, probability, and statistical modeling. Excellent for those who love working with data and mathematical methods to derive insights.",
      careers: ["Data Scientist", "Statistical Analyst", "Quantitative Analyst", "Data Engineer", "Research Statistician"],
      strengths: ["Statistical methods", "Data analysis", "Probability theory", "Predictive modeling"],
      overview: "The Department of Statistics at Haramaya University was established in the 2008/09 academic year with the objective of providing statistical training, research, and consultancy services \u2014 one of the college's fastest-growing departments. Beyond the BSc in Statistics, it runs a postgraduate program in Econometrics. The department aims to promote statistical education in Ethiopia by developing critical statistical reasoning (with strong computational, mathematical, and communication skills), providing statistical consultancy services, and leading socioeconomic and other studies where statistical methods apply.",
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
      curriculum: {
          "Probability & Statistical Theory": [
              "Probability theory and distributions",
              "Statistical inference (estimation and hypothesis testing)",
              "Mathematical statistics",
              "Sampling theory and methods"
          ],
          "Applied Statistics & Modeling": [
              "Linear and nonlinear regression analysis",
              "Time series analysis and forecasting",
              "Multivariate statistical methods",
              "Experimental design and ANOVA"
          ],
          "Data Science & Machine Learning": [
              "Statistical machine learning",
              "Data mining techniques",
              "Big data analytics",
              "Predictive modeling"
          ],
          "Statistical Computing": [
              "R programming for statistics",
              "Python for data analysis",
              "Statistical software (SPSS, SAS, STATA)",
              "Data visualization techniques"
          ],
          "Specialized Applications": [
              "Econometrics and economic analysis",
              "Biostatistics and health data",
              "Quality control and process improvement",
              "Survey methodology and analysis"
          ]
      },
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