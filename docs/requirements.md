# Requirements Document

## Introduction

The Department Choice Guidance System is a web-based platform designed to assist prospective students at Haramaya University's College of Computing and Informatics (CCI) in making informed decisions about their department selection. The system will provide an interactive assessment mechanism, comprehensive department information, and personalized recommendations to match students with departments (Computer Science, Software Engineering, Information Technology, Information System, Statistics) based on their interests, skills, and career goals.

The system addresses the current challenge where students lack structured guidance in understanding the differences between departments and making optimal choices aligned with their capabilities and aspirations. Based on survey data from 29 CCI students, the system aims to improve student satisfaction and reduce department transfer rates by providing evidence-based guidance.

## Glossary

- **System**: The Department Choice Guidance System
- **Student**: A prospective or current CCI student seeking department selection guidance
- **Admin**: A system administrator responsible for managing content and viewing analytics
- **Assessment**: An interactive questionnaire that evaluates student interests, skills, and goals
- **Department**: One of five CCI academic programs (Computer Science, Software Engineering, Information Technology, Information System, Statistics)
- **Recommendation_Engine**: The algorithmic component that matches student responses to suitable departments
- **Department_Profile**: Comprehensive information about a department including courses, career paths, and required skills
- **Response_Data**: Student answers collected during the assessment process
- **Analytics_Dashboard**: Administrative interface displaying system usage and student response statistics
- **Comparison_Report**: A side-by-side view of multiple departments showing their differences
- **Match_Score**: A numerical value (0-100) indicating how well a student profile aligns with a department

## Requirements

### Requirement 1: Student Assessment System

**User Story:** As a student, I want to complete an interactive assessment about my interests and skills, so that I can receive personalized department recommendations.

#### Acceptance Criteria

1. WHEN a student accesses the assessment, THE System SHALL present a questionnaire with questions designed to reveal:
   - Core working preferences (theory vs hands-on building vs systems management vs business analysis)
   - Mathematical/analytical appetite and comfort level
   - Interest in software creation vs hardware/networking vs data analysis vs process optimization
   - Preferred learning style (conceptual understanding vs practical experimentation)
   - Career aspirations (developer, analyst, architect, data scientist, IT manager, consultant)
   - Current skill indicators (coding experience, problem-solving approach, technical exposure)
2. WHILE completing the assessment, THE System SHALL allow students to navigate between questions (previous/next)
3. THE System SHALL validate each response before allowing progression to the next question
4. WHEN a student submits incomplete responses, THE System SHALL display validation messages indicating required fields
5. THE System SHALL save assessment progress automatically at each question completion
6. WHEN a student exits mid-assessment, THE System SHALL allow resumption from the last saved question upon return
7. THE System SHALL complete the assessment within 10-15 minutes for typical student interaction
8. THE Assessment SHALL include 20-25 questions strategically designed to distinguish between commonly confused departments (CS/SWE, IT/IS, etc.)
9. THE Assessment SHALL include scenario-based questions reflecting real department course challenges (e.g., "Would you rather debug code, design network infrastructure, analyze business requirements, or prove mathematical theorems?")
10. THE System SHALL ask at least one question directly borrowed from each department head's decision-guiding questions

### Requirement 2: Department Information Repository

**User Story:** As a student, I want to access comprehensive information about each department, so that I can understand what each program offers.

#### Acceptance Criteria

1. THE System SHALL maintain Department_Profiles for all five CCI departments (Computer Science, Software Engineering, Information Technology, Information System, Statistics)
2. FOR EACH Department_Profile, THE System SHALL store:
   - **Distinguishing Identity**: Core focus, what students are trained to do, key differentiators from other departments, common confusion points, and student success profiles
   - **Curriculum & Skill Signals**: 2-3 defining/hardest courses, required thinking styles (math/theory vs hands-on vs systems vs business-process), theory-to-practice balance ratio
   - **Career Outcomes**: Common job roles and career paths (local and international), current job market demand in Ethiopia, typical employment sectors
   - **Common Misconceptions**: What students misunderstand before choosing, decision-guiding questions used by advisors
3. WHEN a student requests department information, THE System SHALL display the Department_Profile within 2 seconds
4. THE System SHALL organize department information into categories (Core Focus, Key Differentiators, Curriculum Overview, Career Paths, Thriving Student Profile, Common Misconceptions)
5. THE System SHALL include visual elements (icons, images, infographics) for each Department_Profile
6. THE System SHALL provide searchable department information allowing keyword-based filtering
7. THE System SHALL highlight the "kind of student who thrives here" section prominently to help students self-assess fit

### Requirement 3: Recommendation Engine

**User Story:** As a student, I want to receive personalized department recommendations based on my assessment responses, so that I can identify the best-fit programs for me.

#### Acceptance Criteria

1. WHEN a student completes the assessment, THE Recommendation_Engine SHALL analyze Response_Data and generate Match_Scores for all five departments
2. THE Recommendation_Engine SHALL base matching logic on department-head-defined criteria:
   - Student skills, interests, and mindset alignment with "thriving student profile"
   - Preference for thinking styles (theory/math vs hands-on building vs systems/infrastructure vs business-process)
   - Theory-to-practice balance preferences matching department curriculum
   - Career goal alignment with department's common job roles
   - Learning style compatibility with defining/hardest courses
3. THE Recommendation_Engine SHALL rank departments by Match_Score in descending order
4. THE System SHALL display the top 3 recommended departments with their respective Match_Scores
5. FOR EACH recommendation, THE System SHALL provide an explanation describing:
   - Why the department matches the student profile (specific alignment points)
   - What makes this department different from commonly confused alternatives
   - What kind of work graduates typically do
   - Warning flags if student shows traits that typically struggle in this department
6. THE Recommendation_Engine SHALL use weighted scoring where core identity factors (40%), curriculum fit (30%), career alignment (20%), and misconception awareness (10%) determine final match
7. THE System SHALL compute recommendations within 3 seconds of assessment completion
8. WHEN two departments have identical Match_Scores, THE System SHALL apply consistent tiebreaker logic based on current enrollment data
9. THE System SHALL present the advisor's decision-guiding question for each recommended department to help students self-reflect

### Requirement 4: Department Comparison Feature

**User Story:** As a student, I want to compare multiple departments side-by-side, so that I can understand their differences clearly.

#### Acceptance Criteria

1. THE System SHALL allow students to select 2-5 departments for comparison
2. WHEN a student requests comparison, THE System SHALL generate a Comparison_Report displaying selected departments in parallel columns
3. THE Comparison_Report SHALL include comparison criteria (core courses, career outcomes, required skills, difficulty level, job market demand)
4. THE System SHALL highlight key differences between departments using visual indicators (color coding, icons)
5. THE System SHALL allow students to export the Comparison_Report as a PDF document
6. WHILE viewing comparisons, THE System SHALL maintain responsive layout for mobile and desktop devices

### Requirement 5: Administrative Content Management

**User Story:** As an admin, I want to manage department information and assessment questions, so that I can keep the system content current and accurate.

#### Acceptance Criteria

1. THE System SHALL provide an administrative authentication mechanism requiring username and password
2. WHEN an admin logs in successfully, THE System SHALL display the Analytics_Dashboard
3. THE System SHALL allow admins to create, update, and delete Department_Profiles through a content management interface structured by:
   - Section A: Distinguishing Identity (core focus, key differentiators, confusion points, thriving student profile)
   - Section B: Curriculum & Skill Signals (defining courses, theory-practice balance)
   - Section C: Career Outcomes (job roles, market demand in Ethiopia)
   - Section D: Common Misconceptions (student misunderstandings, decision-guiding questions)
4. THE System SHALL provide a guided template for department heads to input structured data matching the advisor-approved question framework
5. THE System SHALL allow admins to modify assessment questions, answer options, and scoring weights mapped to specific department characteristics
6. WHEN an admin saves changes, THE System SHALL validate data completeness before committing updates
7. THE System SHALL maintain an audit log recording all administrative changes with timestamps and admin identifiers
8. THE System SHALL prevent deletion of Department_Profiles that have associated student recommendations in the database
9. THE System SHALL allow admins to flag departments currently undergoing curriculum changes with a "last updated" timestamp
10. THE System SHALL provide an import/export feature for department head interviews/responses in structured format (CSV/JSON)

### Requirement 6: Analytics and Reporting

**User Story:** As an admin, I want to view analytics about system usage and student preferences, so that I can understand trends and improve the system.

#### Acceptance Criteria

1. THE Analytics_Dashboard SHALL display total number of completed assessments, department recommendation distributions, and most popular career interests
2. THE System SHALL generate visual charts (bar charts, pie charts, line graphs) for statistical data presentation
3. THE System SHALL allow admins to filter analytics by date range (last week, last month, last semester, all time)
4. THE System SHALL provide exportable reports in CSV and PDF formats
5. WHEN displaying statistics, THE System SHALL anonymize student data to protect privacy
6. THE Analytics_Dashboard SHALL refresh data automatically every 5 minutes when actively viewed
7. THE System SHALL calculate and display average Match_Scores for each department across all assessments

### Requirement 7: User Authentication and Data Privacy

**User Story:** As a student, I want my assessment responses to be stored securely and privately, so that my information is protected.

#### Acceptance Criteria

1. THE System SHALL provide optional student registration allowing account creation with email and password
2. WHEN a student creates an account, THE System SHALL encrypt passwords using industry-standard hashing algorithms (bcrypt or Argon2)
3. THE System SHALL allow anonymous assessment completion without registration
4. WHEN a registered student logs in, THE System SHALL display their previous assessments and recommendations
5. THE System SHALL implement session management with automatic logout after 30 minutes of inactivity
6. THE System SHALL store Response_Data with appropriate privacy controls preventing unauthorized access
7. IF a student requests data deletion, THEN THE System SHALL remove all associated Response_Data within 24 hours

### Requirement 8: Responsive User Interface

**User Story:** As a student, I want to access the system from any device (mobile, tablet, desktop), so that I can use it conveniently.

#### Acceptance Criteria

1. THE System SHALL implement a responsive user interface that adapts to screen sizes from 320px to 2560px width
2. WHEN accessed on mobile devices, THE System SHALL display touch-optimized navigation elements with minimum tap target size of 44x44 pixels
3. THE System SHALL maintain readable text sizing (minimum 14px) across all devices without horizontal scrolling
4. THE System SHALL optimize images and assets for fast loading on mobile networks (target: under 3 seconds on 3G)
5. THE System SHALL support both portrait and landscape orientations on mobile devices
6. WHEN rendering forms on mobile, THE System SHALL use appropriate input types (email, number, tel) to trigger correct keyboards

### Requirement 9: System Performance and Reliability

**User Story:** As a student, I want the system to be fast and reliable, so that I can complete my assessment without technical issues.

#### Acceptance Criteria

1. THE System SHALL load the homepage within 2 seconds on standard broadband connections (5 Mbps)
2. THE System SHALL handle at least 50 concurrent users without performance degradation
3. THE System SHALL maintain 99% uptime during academic registration periods
4. WHEN database operations fail, THE System SHALL display user-friendly error messages without exposing technical details
5. THE System SHALL implement automatic database backups daily at 2:00 AM
6. THE System SHALL cache Department_Profiles to reduce database queries and improve response times
7. IF system maintenance is required, THEN THE System SHALL display a maintenance notice at least 24 hours in advance

### Requirement 10: Accessibility and Usability

**User Story:** As a student with disabilities, I want the system to be accessible, so that I can use it effectively regardless of my abilities.

#### Acceptance Criteria

1. THE System SHALL comply with WCAG 2.1 Level AA accessibility standards
2. THE System SHALL provide keyboard navigation for all interactive elements (tab order, enter/space activation)
3. THE System SHALL include alternative text for all images and icons
4. THE System SHALL maintain color contrast ratios of at least 4.5:1 for normal text and 3:1 for large text
5. THE System SHALL support screen reader compatibility (NVDA, JAWS, VoiceOver)
6. THE System SHALL provide clear focus indicators for keyboard navigation
7. THE System SHALL avoid time-based content changes that could interfere with screen readers

### Requirement 11: Multi-language Support

**User Story:** As a student, I want to use the system in my preferred language, so that I can understand the content clearly.

#### Acceptance Criteria

1. THE System SHALL support English and Amharic languages as interface options
2. WHEN a student selects a language, THE System SHALL display all interface elements, questions, and department information in the selected language
3. THE System SHALL persist language preference across user sessions
4. THE System SHALL allow language switching at any point during system usage
5. THE System SHALL translate all assessment questions and Department_Profiles maintaining semantic accuracy
6. WHEN displaying recommendations, THE System SHALL present explanations in the student's selected language

### Requirement 12: Results Visualization and Export

**User Story:** As a student, I want to view my results in a clear format and save them for future reference, so that I can review my recommendations later.

#### Acceptance Criteria

1. WHEN assessment is completed, THE System SHALL display results on a dedicated results page with Match_Scores visualized as progress bars or radar charts
2. THE System SHALL provide detailed explanations for each recommendation including matching factors and department highlights
3. THE System SHALL allow students to download results as a PDF document formatted for printing
4. THE PDF document SHALL include student name (if registered), assessment date, Match_Scores, recommendations, and next steps guidance
5. THE System SHALL provide a unique URL for each assessment result allowing students to share or revisit their recommendations
6. THE System SHALL maintain result URLs for at least 6 months after assessment completion

### Requirement 13: Career Path Information Integration

**User Story:** As a student, I want to see real-world career outcomes for each department, so that I can understand future opportunities.

#### Acceptance Criteria

1. FOR EACH Department_Profile, THE System SHALL include information about:
   - Most common career paths/job roles graduates actually end up in (locally and internationally)
   - Current job market demand for this department's graduates in Ethiopia (high/medium/low with brief justification)
   - Typical employment sectors and industry partnerships
   - Average salary ranges (if available) or relative earning potential
2. THE System SHALL display success stories or testimonials from alumni of each department with their actual job titles and companies
3. THE System SHALL present career path information in context of each department's core focus (linking "what you learn" to "where you work")
4. THE System SHALL provide industry partnership information highlighting companies that recruit from each department
5. WHEN displaying career information, THE System SHALL update data at least once per semester to maintain currency
6. THE System SHALL include a "career reality check" section highlighting if job market demand differs from student interest levels
7. THE System SHALL distinguish between local (Ethiopian) and international career opportunities for each department

### Requirement 14: Feedback and Continuous Improvement

**User Story:** As a student, I want to provide feedback on my experience with the system, so that it can be improved for future users.

#### Acceptance Criteria

1. AFTER completing the assessment, THE System SHALL invite students to rate their experience on a 5-star scale
2. THE System SHALL provide an optional text feedback field allowing students to share detailed comments
3. THE System SHALL allow students to indicate whether the recommendations matched their expectations (yes/no/partially)
4. THE System SHALL store feedback data associated with assessment sessions for admin review
5. THE Analytics_Dashboard SHALL display aggregated feedback metrics (average rating, common themes, satisfaction percentage)
6. THE System SHALL send anonymous feedback summaries to admins weekly via email

### Requirement 15: Data Validation and Integrity

**User Story:** As an admin, I want the system to maintain data integrity, so that recommendations are based on accurate information.

#### Acceptance Criteria

1. WHEN admins enter Department_Profile data, THE System SHALL validate required fields are non-empty
2. THE System SHALL prevent duplicate department entries with identical names
3. THE System SHALL validate that Match_Score calculations always produce values between 0 and 100
4. THE System SHALL implement referential integrity constraints ensuring Response_Data references valid assessment questions
5. WHEN database transactions fail, THE System SHALL rollback partial changes maintaining consistent state
6. THE System SHALL validate assessment question data types (multiple choice, rating scale, text input) match expected formats
7. IF data corruption is detected, THEN THE System SHALL log errors and notify admins via email within 5 minutes
