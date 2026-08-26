# 20-Question Assessment Strategy
## CCI Department Choice Guidance System

**Purpose:** Updated six-department assessment aligned more closely with Haramaya University CCI department profiles, with explicit signals for `ISC` (Information Science) and `STAT` (Statistics).

---

## Design Principles

- Every question now includes a **clear primary signal for each of the six departments**: `CS`, `SWE`, `IT`, `IS`, `ISC`, `STAT`.
- The assessment uses **Haramaya-oriented language** where appropriate, especially for:
  - `ISC`: libraries, archives, documentation centers, information organization, retrieval, records, digital resources, user access
  - `STAT`: statistical reasoning, data collection, consultancy, survey analysis, socioeconomic research
- `IS` is kept distinct from `ISC`:
  - `IS` = organizational workflows, stakeholder requirements, management and business-process alignment
  - `ISC` = information resources, metadata, access, preservation, libraries/archives, knowledge and records management
- The app now normalizes match percentages using each department's own maximum possible score, avoiding earlier bias from a fixed denominator.
- **Source of truth:** `src/data/questions.js`

---

## Department Anchors Used

- **Computer Science (CS):** scientific and theoretical aspects of computing, algorithms, formal reasoning, computational modeling
- **Software Engineering (SWE):** software design, implementation, testing, maintenance, software quality, engineering practice
- **Information Technology (IT):** ICT infrastructure, administration, troubleshooting, configuration, operations, support
- **Information System (IS):** business-process analysis, organizational needs, management-facing systems, stakeholder alignment
- **Information Science (ISC):** library and information science, information organization, retrieval, dissemination, records/archives, client-centered information services
- **Statistics (STAT):** statistical reasoning, data collection and analysis, consultancy, reporting, research and evidence-based decision making

---

## Question Categories

| Category | Questions | Main purpose |
|---|---|---|
| Thinking & Problem-Solving | Q1-Q4 | Reveal core intellectual orientation |
| Learning & Coursework | Q5-Q8 | Differentiate course and learning preferences |
| Work Preferences & Roles | Q9-Q12 | Surface natural roles, environments, and motivation |
| Career Direction & Identity | Q13-Q16 | Clarify long-term fit and professional identity |
| Haramaya-Oriented Applied Scenarios | Q17-Q20 | Test department fit through realistic local scenarios |

---

## Complete 20 Questions

### Thinking & Problem-Solving (Q1-Q4)

#### Q1. How do you most naturally approach a new difficult problem?

- A) By understanding the underlying computational theory and formal model before solving it  
  **Primary signal:** `CS`
- B) By designing and building a working software solution, then refining it through testing  
  **Primary signal:** `SWE`
- C) By diagnosing the environment, tools, or infrastructure so the system can run reliably  
  **Primary signal:** `IT`
- D) By clarifying stakeholder needs and mapping the business process before choosing the technology  
  **Primary signal:** `IS`
- E) By identifying what information users need, organizing the sources, and making them easy to access  
  **Primary signal:** `ISC`
- F) By defining the variables, collecting data, and testing what the evidence says  
  **Primary signal:** `STAT`

#### Q2. Which course challenge sounds most interesting to you?

- A) Algorithm analysis, automata, or another core computation problem  
  **Primary signal:** `CS`
- B) A software design, testing, and maintenance project  
  **Primary signal:** `SWE`
- C) A networking, systems administration, cloud, or security lab  
  **Primary signal:** `IT`
- D) A systems analysis, ERP, or management information systems case  
  **Primary signal:** `IS`
- E) An information organization, indexing, digital library, or records-management task  
  **Primary signal:** `ISC`
- F) A probability, inference, regression, or experimental-design problem  
  **Primary signal:** `STAT`

#### Q3. Which output would make you feel proudest?

- A) An efficient algorithm or elegant computational solution  
  **Primary signal:** `CS`
- B) A high-quality application that real people can use  
  **Primary signal:** `SWE`
- C) A stable network, lab, or service platform with minimal downtime  
  **Primary signal:** `IT`
- D) A workflow or information system that improves organizational performance  
  **Primary signal:** `IS`
- E) A well-organized archive or repository that helps users find trustworthy information quickly  
  **Primary signal:** `ISC`
- F) A statistical report that guides a real decision with evidence  
  **Primary signal:** `STAT`

#### Q4. When a topic is confusing, what do you usually do first?

- A) Go back to the principles and derive the logic carefully  
  **Primary signal:** `CS`
- B) Prototype a small version and learn by building  
  **Primary signal:** `SWE`
- C) Check the setup, configuration, and system behavior step by step  
  **Primary signal:** `IT`
- D) Ask what problem the organization or user is actually trying to solve  
  **Primary signal:** `IS`
- E) Classify the sources, define terms clearly, and trace how information should flow  
  **Primary signal:** `ISC`
- F) Inspect the data, assumptions, and possible sources of variation  
  **Primary signal:** `STAT`

### Learning & Coursework (Q5-Q8)

#### Q5. How do you learn best?

- A) Conceptual lectures and problems that develop rigorous reasoning  
  **Primary signal:** `CS`
- B) Projects, code reviews, and iterative feedback  
  **Primary signal:** `SWE`
- C) Hands-on labs with real devices, platforms, or administration tasks  
  **Primary signal:** `IT`
- D) Case studies about organizations, requirements, and technology use  
  **Primary signal:** `IS`
- E) Guided practice organizing, retrieving, preserving, and serving information for users  
  **Primary signal:** `ISC`
- F) Worked examples with datasets, statistical software, and interpretation  
  **Primary signal:** `STAT`

#### Q6. Which kind of reading material do you enjoy most?

- A) Technical theory and foundational computing concepts  
  **Primary signal:** `CS`
- B) Software documentation, design patterns, and engineering best practices  
  **Primary signal:** `SWE`
- C) Vendor manuals, setup guides, and operational procedures  
  **Primary signal:** `IT`
- D) Business requirements, policy documents, and process models  
  **Primary signal:** `IS`
- E) Metadata standards, information-service guidelines, cataloging rules, or archival practices  
  **Primary signal:** `ISC`
- F) Research reports, survey results, and statistical analyses  
  **Primary signal:** `STAT`

#### Q7. Which toolset sounds most appealing?

- A) Core programming, algorithmic problem-solving, and systems-level computing tools  
  **Primary signal:** `CS`
- B) Frameworks, version control, testing tools, and CI/CD workflows  
  **Primary signal:** `SWE`
- C) Routers, server dashboards, system monitors, and security tools  
  **Primary signal:** `IT`
- D) ERP or reporting tools, requirements models, and organizational databases  
  **Primary signal:** `IS`
- E) Digital library or repository systems, metadata tools, and records-management platforms  
  **Primary signal:** `ISC`
- F) R, SPSS, Stata, Python analytics, and data-visualization tools  
  **Primary signal:** `STAT`

#### Q8. Which assignment would you volunteer for first?

- A) Explaining why an algorithm is correct and comparing its complexity  
  **Primary signal:** `CS`
- B) Leading the design and implementation of an application module  
  **Primary signal:** `SWE`
- C) Configuring the lab environment and ensuring all services work  
  **Primary signal:** `IT`
- D) Interviewing stakeholders and documenting functional requirements  
  **Primary signal:** `IS`
- E) Creating an organized index or repository so users can retrieve materials quickly  
  **Primary signal:** `ISC`
- F) Designing the data collection plan and analyzing the results  
  **Primary signal:** `STAT`

### Work Preferences & Roles (Q9-Q12)

#### Q9. Which role fits you best in a team?

- A) The one who handles the most abstract technical reasoning  
  **Primary signal:** `CS`
- B) The one who turns ideas into working software  
  **Primary signal:** `SWE`
- C) The one who keeps the environment, tools, and services running  
  **Primary signal:** `IT`
- D) The one who coordinates requirements, process, and stakeholder understanding  
  **Primary signal:** `IS`
- E) The one who organizes documents, knowledge, or resources so the team can find what it needs  
  **Primary signal:** `ISC`
- F) The one who evaluates data and checks whether conclusions are valid  
  **Primary signal:** `STAT`

#### Q10. What motivates you most in your future work?

- A) Understanding how computing works at a fundamental level  
  **Primary signal:** `CS`
- B) Engineering reliable software that solves real user problems  
  **Primary signal:** `SWE`
- C) Making technology dependable, secure, and usable in practice  
  **Primary signal:** `IT`
- D) Helping an organization use technology more effectively  
  **Primary signal:** `IS`
- E) Improving access to useful, accurate, and well-organized information  
  **Primary signal:** `ISC`
- F) Producing trustworthy evidence for decisions and research  
  **Primary signal:** `STAT`

#### Q11. Where would you most like to work?

- A) A computing research lab or advanced technical team  
  **Primary signal:** `CS`
- B) A software company or product development team  
  **Primary signal:** `SWE`
- C) An ICT operations, support, security, or infrastructure team  
  **Primary signal:** `IT`
- D) A bank, enterprise, or public organization improving systems and processes  
  **Primary signal:** `IS`
- E) A library, archive, documentation center, school resource center, or knowledge-service unit  
  **Primary signal:** `ISC`
- F) A statistical office, research center, NGO, or analytics unit  
  **Primary signal:** `STAT`

#### Q12. Which internship sounds best to you?

- A) Optimizing a computation-heavy program or intelligent system  
  **Primary signal:** `CS`
- B) Building and testing a campus or business application  
  **Primary signal:** `SWE`
- C) Deploying and troubleshooting networked systems  
  **Primary signal:** `IT`
- D) Analyzing and redesigning an office information workflow  
  **Primary signal:** `IS`
- E) Digitizing, cataloging, and improving access to institutional records or learning resources  
  **Primary signal:** `ISC`
- F) Collecting and analyzing survey or socioeconomic data  
  **Primary signal:** `STAT`

### Career Direction & Identity (Q13-Q16)

#### Q13. Which long-term goal is most attractive to you?

- A) Become a computing specialist, researcher, or advanced technical expert  
  **Primary signal:** `CS`
- B) Become a software architect, quality engineer, or engineering lead  
  **Primary signal:** `SWE`
- C) Become an infrastructure, security, or ICT service leader  
  **Primary signal:** `IT`
- D) Become an information systems manager, consultant, or CIO bridging management and technology  
  **Primary signal:** `IS`
- E) Become an information professional, archivist, knowledge manager, or resource-center leader  
  **Primary signal:** `ISC`
- F) Become a statistician, biostatistician, econometrician, or quantitative researcher  
  **Primary signal:** `STAT`

#### Q14. Which kind of reasoning comes most naturally to you?

- A) Formal, logical, and computational reasoning  
  **Primary signal:** `CS`
- B) Design-oriented reasoning about how components should work together  
  **Primary signal:** `SWE`
- C) Procedural reasoning about configuration, troubleshooting, and maintenance  
  **Primary signal:** `IT`
- D) Organizational reasoning about people, process, and system fit  
  **Primary signal:** `IS`
- E) Classificatory reasoning about sources, metadata, access, and information use  
  **Primary signal:** `ISC`
- F) Quantitative reasoning about uncertainty, trends, and evidence  
  **Primary signal:** `STAT`

#### Q15. Which statement sounds most like you?

- A) I enjoy hard problems even when the solution is highly abstract  
  **Primary signal:** `CS`
- B) I like turning ideas into maintainable products people can actually use  
  **Primary signal:** `SWE`
- C) I like being the person who can fix, configure, and support the technical environment  
  **Primary signal:** `IT`
- D) I like understanding how technology should support organizational goals  
  **Primary signal:** `IS`
- E) I like making information findable, usable, preserved, and meaningful for different users  
  **Primary signal:** `ISC`
- F) I like checking whether numbers and conclusions are really justified  
  **Primary signal:** `STAT`

#### Q16. What kind of mistake bothers you most?

- A) An inefficient or logically flawed algorithm  
  **Primary signal:** `CS`
- B) Poorly designed or untested software  
  **Primary signal:** `SWE`
- C) Unstable configuration, downtime, or weak security practice  
  **Primary signal:** `IT`
- D) Unclear requirements or a system that does not fit the organization  
  **Primary signal:** `IS`
- E) Disorganized records, missing metadata, or information people cannot retrieve  
  **Primary signal:** `ISC`
- F) Weak sampling, biased data, or invalid statistical conclusions  
  **Primary signal:** `STAT`

### Haramaya-Oriented Applied Scenarios (Q17-Q20)

#### Q17. Haramaya-specific scenario: the university wants to improve student services. Which task would you choose?

- A) Design the core algorithm for scheduling, allocation, or optimization  
  **Primary signal:** `CS`
- B) Build the web or mobile system students will directly use  
  **Primary signal:** `SWE`
- C) Set up the infrastructure, deployment, and access control  
  **Primary signal:** `IT`
- D) Analyze the service workflow and define system requirements with offices  
  **Primary signal:** `IS`
- E) Organize notices, records, and learning resources so students can easily find reliable information  
  **Primary signal:** `ISC`
- F) Analyze student survey data to identify patterns and measure improvement  
  **Primary signal:** `STAT`

#### Q18. A college unit has years of mixed paper and digital materials. What sounds most interesting?

- A) Model the underlying search or retrieval problem computationally  
  **Primary signal:** `CS`
- B) Build the software interface for searching and updating the collection  
  **Primary signal:** `SWE`
- C) Install and maintain the storage, network, and backup environment  
  **Primary signal:** `IT`
- D) Define how the unit's work process and users should interact with the system  
  **Primary signal:** `IS`
- E) Classify, preserve, describe, and retrieve the materials as an information resource center  
  **Primary signal:** `ISC`
- F) Study usage patterns and evaluate the collection with data  
  **Primary signal:** `STAT`

#### Q19. A community project needs evidence and communication. Where do you contribute most?

- A) Solving the technically hardest computational part  
  **Primary signal:** `CS`
- B) Developing the application or tool used in the project  
  **Primary signal:** `SWE`
- C) Managing the platforms, devices, and connectivity needed to run it  
  **Primary signal:** `IT`
- D) Coordinating requirements and translating between users and the technical team  
  **Primary signal:** `IS`
- E) Curating information resources, documentation, and access for stakeholders  
  **Primary signal:** `ISC`
- F) Designing the study, analyzing results, and presenting statistical findings  
  **Primary signal:** `STAT`

#### Q20. If you had to choose one capstone project today, which would it be?

- A) Build an intelligent algorithm or computational model for a complex problem  
  **Primary signal:** `CS`
- B) Engineer a complete software system with a testing and maintenance plan  
  **Primary signal:** `SWE`
- C) Design and manage a secure campus network or service environment  
  **Primary signal:** `IT`
- D) Analyze and improve a university or business information-system process  
  **Primary signal:** `IS`
- E) Create a digital library, archive, or records-management solution for real users  
  **Primary signal:** `ISC`
- F) Conduct a full statistical study from data collection to interpretation  
  **Primary signal:** `STAT`

---

## Scoring Model

- Each question has **six options**, one with strongest alignment to each department.
- The strongest matching department for an option receives `+3`.
- Closely related departments receive smaller supporting scores (`+1` or `+2`) where appropriate.
- Unrelated departments receive `0` for that option.
- Because every department has one primary option per question, the **maximum possible raw score is balanced at 60 for all six departments**.

---

## Validation Recommendation

Before treating the assessment as high-stakes advising logic, validate it with:

1. **Department-head review** for all six departments
2. **Pilot testing** with current students from each department
3. **Result comparison** between actual department, top recommendation, and student satisfaction
4. **Special review of ISC vs IS** and **ISC vs STAT** boundary cases

---

## Reference Basis for ISC/STAT Tuning

- Haramaya University Department of Information Science page
- Haramaya University MSc in Information Science profile
- Haramaya University Department of Information System page
- Haramaya University Department of Information Technology / BSc in IT page
- Haramaya University Department / BSc in Statistics pages
- Haramaya University Department / BSc in Software Engineering and Computer Science pages
