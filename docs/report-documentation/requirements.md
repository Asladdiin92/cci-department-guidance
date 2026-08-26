# Requirements Document

## Introduction

The CCI Department Choice Guidance System is a web-based platform designed to assist incoming students at Haramaya University's College of Computing and Informatics (CCI) in making informed decisions about department selection. The system addresses a validated need: survey data from 43 students shows that 44.2% felt uncertain when choosing their department, yet 97.7% indicated they would use a recommendation tool if available.

The system provides three core capabilities: (1) an interactive assessment questionnaire that evaluates student interests, skills, and career goals through 20-25 strategically designed questions; (2) a recommendation engine powered by department-specific criteria validated by department heads, which generates personalized best-fit department suggestions with AI-generated explanations; and (3) comprehensive department information and comparison tools to support informed decision-making.

The target users are prospective CCI students selecting among six departments: Computer Science (CS), Software Engineering (SWE), Information Technology (IT), Information System (IS), Information Science (ISC), and Statistics (STAT). The system operates on a modern web stack (React.js frontend, Node.js + Express backend, MongoDB database, LLM API for explanation generation) and targets success metrics including 70% usage rate, 80%+ satisfaction, and 20% reduction in department transfer requests.

## Glossary

- **System**: The CCI Department Choice Guidance System
- **Student**: A prospective or current CCI student seeking department selection guidance at Haramaya University
- **Admin**: A system administrator or ICT Center staff member responsible for managing content and analytics
- **Assessment**: The interactive questionnaire consisting of 20-25 questions that evaluates student profile
- **Department**: One of six CCI academic programs (Computer Science, Software Engineering, Information Technology, Information System, Information Science, Statistics)
- **Recommendation_Engine**: The algorithmic component that analyzes student responses and generates department match scores
- **Department_Profile**: Structured information about a department including core focus, curriculum, career paths, and distinguishing characteristics
- **Response_Data**: Student answers collected during assessment completion
- **Match_Score**: A numerical value from 0 to 100 indicating alignment between student profile and department characteristics
- **Comparison_Report**: A side-by-side visualization of selected departments across multiple criteria
- **Analytics_Dashboard**: Administrative interface displaying system usage statistics and student response patterns
- **LLM_API**: Language model API (OpenAI or Google Gemini) used to generate personalized explanation text
- **HOD**: Head of Department who provides validated department-specific criteria and content

## Requirements

### Requirement 1: Student Assessment Questionnaire

**User Story:** As a prospective CCI student, I want to complete a structured assessment of my interests and skills, so that I can receive personalized department recommendations based on validated criteria.

#### Acceptance Criteria

1. WHEN a student accesses the assessment, THE System SHALL present a questionnaire containing 20 to 25 questions
2. THE Assessment SHALL include questions covering thinking style (abstract versus concrete reasoning, theory versus practice preference), work preferences (building versus managing versus analyzing, individual versus team orientation), learning style (conceptual understanding versus practical experimentation), career aspirations (specific job roles and work environments), technical aptitude indicators (mathematical comfort, programming interest, hardware interest), and problem-solving approaches
3. THE Assessment SHALL include at least three scenario-based questions reflecting real department course challenges to distinguish between commonly confused department pairs (Computer Science versus Software Engineering, Information Technology versus Information System, Information System versus Information Science)
4. WHEN a student selects a response option, THE System SHALL visually indicate the selection with color highlighting
5. THE System SHALL validate that each question has a selected response before enabling progression to the next question
6. WHEN a student attempts to proceed without selecting a response, THE System SHALL display a validation message indicating the required selection
7. WHILE completing the assessment, THE System SHALL display a progress indicator showing current question number and total question count
8. THE System SHALL provide navigation buttons allowing students to move forward to the next question or backward to previous questions
9. THE System SHALL save assessment progress automatically after each question response
10. WHEN a student exits the assessment before completion, THE System SHALL preserve response data for at least 7 days
11. WHEN a returning student accesses an incomplete assessment, THE System SHALL offer to resume from the last answered question
12. THE Assessment SHALL be completable within 10 to 15 minutes of typical student interaction time

### Requirement 2: Department Information Repository

**User Story:** As a prospective CCI student, I want to access comprehensive verified information about each department, so that I can understand what each program offers and how they differ from alternatives.

#### Acceptance Criteria

1. THE System SHALL maintain Department_Profiles for all six CCI departments (Computer Science, Software Engineering, Information Technology, Information System, Information Science, Statistics)
2. FOR EACH Department_Profile, THE System SHALL store core focus description (what the department trains students to do), key differentiators from other departments, common confusion points with similar departments, curriculum overview including two to three defining courses, theory-to-practice balance ratio, career outcomes including common job roles in Ethiopia and internationally, employment sectors and typical employers, current job market demand level in Ethiopia with justification, student success profile describing characteristics of students who thrive in the department, and common misconceptions students hold before choosing the department
3. WHEN a student requests department information, THE System SHALL retrieve and display the Department_Profile within 2 seconds
4. THE System SHALL organize Department_Profile content into structured sections (Distinguishing Identity, Curriculum and Skill Signals, Career Outcomes, Common Misconceptions)
5. THE System SHALL include visual elements (department icon, color coding, infographics) for each Department_Profile to enhance information comprehension
6. THE System SHALL provide search functionality allowing students to filter department information by keyword
7. THE System SHALL display a "last updated" timestamp for each Department_Profile indicating content currency
8. THE System SHALL highlight the student success profile section prominently to facilitate student self-assessment of fit

### Requirement 3: Recommendation Generation Engine

**User Story:** As a prospective CCI student, I want to receive personalized department recommendations based on my assessment responses, so that I can identify programs that align with my interests, skills, and career goals.

#### Acceptance Criteria

1. WHEN a student completes the assessment, THE Recommendation_Engine SHALL analyze Response_Data and compute Match_Scores for all six departments within 3 seconds
2. THE Recommendation_Engine SHALL base matching logic on weighted criteria including student skills and interests alignment (40% weight), curriculum fit based on learning style and theory-practice preference (30% weight), career goal alignment with department outcomes (20% weight), and awareness of common misconceptions (10% weight)
3. THE Recommendation_Engine SHALL rank all departments by Match_Score in descending order
4. THE System SHALL display the top three recommended departments with their respective Match_Scores presented as percentages from 0 to 100
5. FOR EACH of the top three recommendations, THE System SHALL generate a personalized explanation describing why the department matches the student profile, what distinguishes this department from commonly confused alternatives, typical work graduates perform, and warning indicators if student responses suggest potential struggle areas
6. THE System SHALL invoke the LLM_API to generate explanation text dynamically based on student response patterns and department characteristics
7. WHEN two departments have identical Match_Scores, THE System SHALL apply tiebreaker logic based on current department enrollment data to promote balanced distribution
8. THE System SHALL include a disclaimer message stating "This guidance is based on your responses and validated department criteria, but the final choice is yours"
9. THE System SHALL display decision-guiding questions from department heads for each recommended department to support student self-reflection

### Requirement 4: Department Comparison Tool

**User Story:** As a prospective CCI student, I want to compare multiple departments side-by-side across key criteria, so that I can understand their differences clearly and make an informed choice.

#### Acceptance Criteria

1. THE System SHALL allow students to select 2 to 4 departments for comparison
2. WHEN a student requests comparison, THE System SHALL generate a Comparison_Report displaying selected departments in parallel columns
3. THE Comparison_Report SHALL include comparison criteria consisting of core focus, defining courses, career paths and job roles, required skills and thinking styles, theory-to-practice balance ratio, mathematical intensity level, and Ethiopian job market demand
4. THE System SHALL use visual indicators (color coding, icons, highlighting) to emphasize key differences between compared departments
5. THE System SHALL provide an export function allowing students to download the Comparison_Report as a PDF document formatted for printing
6. THE PDF export SHALL include the student's top three recommendations with Match_Scores, the comparison table, and generation timestamp
7. WHILE viewing the Comparison_Report, THE System SHALL maintain responsive layout adapting to screen sizes from 320 pixels to 2560 pixels width

### Requirement 5: Administrative Content Management

**User Story:** As an admin, I want to manage department information and assessment questions through a structured interface, so that I can keep system content current and accurate without requiring developer access.

#### Acceptance Criteria

1. THE System SHALL provide an administrative authentication mechanism requiring username and password credentials
2. WHEN an admin provides valid credentials, THE System SHALL grant access to the content management interface
3. WHEN an admin provides invalid credentials, THE System SHALL deny access and display an error message without revealing whether the username or password was incorrect
4. THE System SHALL allow admins to create, read, update, and delete Department_Profiles through a content management interface
5. THE content management interface SHALL provide structured input fields corresponding to Department_Profile sections (Distinguishing Identity, Curriculum and Skill Signals, Career Outcomes, Common Misconceptions)
6. THE System SHALL provide a template form for collecting structured data from department heads matching the validated question framework
7. THE System SHALL allow admins to add, modify, and delete assessment questions including question text, answer options, and scoring weights mapped to department characteristics
8. WHEN an admin attempts to save Department_Profile changes, THE System SHALL validate that required fields contain non-empty values
9. WHEN validation fails, THE System SHALL display specific error messages indicating which fields require completion
10. WHEN an admin successfully saves changes, THE System SHALL update the Department_Profile and display a confirmation message
11. THE System SHALL maintain an audit log recording all administrative changes with timestamp, admin identifier, and change description
12. THE System SHALL prevent deletion of Department_Profiles that have associated student recommendations stored in the database

### Requirement 6: Analytics and Reporting Dashboard

**User Story:** As an admin, I want to view analytics about system usage and student response patterns, so that I can understand trends, evaluate system effectiveness, and identify areas for improvement.

#### Acceptance Criteria

1. THE Analytics_Dashboard SHALL display total number of completed assessments, total number of incomplete assessments, department recommendation distribution (percentage of students receiving each department as top recommendation), and most frequently selected career interests
2. THE System SHALL generate visual charts (bar charts for department distribution, pie charts for career interests, line graphs for usage over time) to present statistical data
3. THE System SHALL allow admins to filter analytics data by date range with preset options (last 7 days, last 30 days, last 90 days, all time)
4. THE System SHALL provide export functionality generating CSV format files containing assessment response data with student responses anonymized
5. THE System SHALL provide export functionality generating PDF format files containing visual analytics summaries
6. WHEN displaying statistics, THE System SHALL anonymize student data by removing any personally identifying information
7. THE Analytics_Dashboard SHALL refresh displayed data automatically every 5 minutes while actively viewed by an admin
8. THE System SHALL calculate and display average Match_Scores across all assessments for each department
9. THE System SHALL display completion rate calculated as completed assessments divided by started assessments expressed as a percentage

### Requirement 7: Student Data Privacy and Security

**User Story:** As a prospective CCI student, I want my assessment responses to be stored securely and privately, so that my information is protected and I understand how my data is used.

#### Acceptance Criteria

1. THE System SHALL allow students to complete assessments without requiring registration or account creation
2. WHEN storing Response_Data, THE System SHALL assign a randomly generated unique identifier rather than collecting personally identifying information
3. THE System SHALL store Response_Data with access controls preventing unauthorized retrieval
4. THE System SHALL automatically delete Response_Data older than 30 days to minimize data retention
5. WHERE a student chooses to create an optional account, THE System SHALL encrypt passwords using bcrypt hashing algorithm with minimum cost factor of 12
6. WHERE a student creates an account and logs in, THE System SHALL display their previous assessment results and recommendations
7. THE System SHALL implement session management with automatic logout after 30 minutes of inactivity
8. THE System SHALL display a privacy notice on the assessment start page explaining what data is collected, how it is used, and the 30-day retention policy
9. IF a student requests data deletion via the admin contact channel, THEN THE System SHALL remove associated Response_Data within 24 hours

### Requirement 8: Responsive User Interface

**User Story:** As a prospective CCI student, I want to access the system from any device including mobile phones and tablets, so that I can use it conveniently regardless of my available device.

#### Acceptance Criteria

1. THE System SHALL implement a responsive user interface that adapts layout to screen widths from 320 pixels to 2560 pixels
2. WHEN accessed on devices with screen width less than 768 pixels, THE System SHALL display single-column layout with vertically stacked elements
3. WHEN accessed on devices with screen width 768 pixels or greater, THE System SHALL display multi-column layout optimizing horizontal space usage
4. THE System SHALL implement touch-optimized interactive elements with minimum tap target size of 44 pixels by 44 pixels for mobile devices
5. THE System SHALL maintain text legibility with minimum font size of 14 pixels without requiring horizontal scrolling on any supported screen size
6. THE System SHALL optimize image assets using compression and responsive image techniques to achieve page load time under 3 seconds on 3G mobile networks
7. THE System SHALL support both portrait and landscape device orientations with appropriate layout adjustments
8. WHEN rendering form inputs on mobile devices, THE System SHALL use appropriate HTML5 input types (email, number, tel) to trigger correct virtual keyboards

### Requirement 9: System Performance and Reliability

**User Story:** As a prospective CCI student, I want the system to respond quickly and reliably, so that I can complete my assessment without technical interruptions or frustrating delays.

#### Acceptance Criteria

1. THE System SHALL load the homepage within 2 seconds on internet connections with 5 megabits per second download speed
2. THE System SHALL handle at least 50 concurrent users completing assessments without performance degradation exceeding 10 percent
3. THE System SHALL maintain 99 percent uptime calculated over each 30-day period during academic registration periods (defined as June 1 to August 31 annually)
4. WHEN database operations fail, THE System SHALL display user-friendly error messages without exposing technical implementation details or stack traces
5. THE System SHALL implement automated database backups executed daily at 2:00 AM local time with retention of the most recent 7 daily backups
6. THE System SHALL cache Department_Profile data in memory to reduce database query load and improve response times
7. THE System SHALL invalidate Department_Profile cache within 5 minutes of admin updates to ensure content currency
8. IF scheduled maintenance is required, THEN THE System SHALL display a maintenance notice to users at least 24 hours in advance

### Requirement 10: Accessibility Compliance

**User Story:** As a prospective CCI student with disabilities, I want the system to be accessible using assistive technologies, so that I can use it effectively regardless of my abilities.

#### Acceptance Criteria

1. THE System SHALL implement accessibility features complying with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards
2. THE System SHALL provide complete keyboard navigation for all interactive elements using tab key for focus movement and enter or space keys for activation
3. THE System SHALL include alternative text for all images, icons, and non-text content describing their meaning and purpose
4. THE System SHALL maintain color contrast ratios of at least 4.5 to 1 for normal text (smaller than 18 point or 14 point bold) and 3 to 1 for large text (18 point or larger, or 14 point bold or larger)
5. THE System SHALL include ARIA (Accessible Rich Internet Applications) labels and roles for custom interactive components to support screen reader compatibility
6. THE System SHALL provide visible focus indicators with minimum 2-pixel border for all interactive elements during keyboard navigation
7. THE System SHALL avoid time-based automatic content changes that could interfere with screen reader announcement queues
8. THE System SHALL provide skip-to-content links allowing keyboard users to bypass repetitive navigation elements

### Requirement 11: Results Visualization and Export

**User Story:** As a prospective CCI student, I want to view my results in a clear visual format and save them for future reference, so that I can review recommendations with family members and academic advisors.

#### Acceptance Criteria

1. WHEN assessment is completed, THE System SHALL display results on a dedicated results page within 3 seconds
2. THE results page SHALL visualize Match_Scores using horizontal progress bars with percentage labels and color coding (green for high match above 75 percent, yellow for moderate match 50 to 75 percent, gray for low match below 50 percent)
3. THE results page SHALL display the top three recommendations in ranked order with visual ranking indicators (gold medal for first, silver medal for second, bronze medal for third)
4. FOR EACH recommendation, THE System SHALL display the department name, Match_Score percentage, visual progress bar, personalized explanation text (minimum 50 words, maximum 150 words), and action buttons (Learn More, View Careers)
5. THE System SHALL provide a download button allowing students to export results as a PDF document
6. THE PDF document SHALL include assessment completion date, all six departments with Match_Scores sorted by rank, detailed explanations for top three recommendations, and disclaimer about guidance nature of recommendations
7. THE PDF document SHALL be formatted for standard A4 page size with readable fonts (minimum 11 point) suitable for printing
8. THE System SHALL generate a unique URL for each completed assessment allowing students to revisit their results
9. THE System SHALL maintain assessment result URLs as accessible for at least 90 days after completion date

### Requirement 12: Career Path Information

**User Story:** As a prospective CCI student, I want to see realistic career outcomes for each department, so that I can understand future employment opportunities when making my decision.

#### Acceptance Criteria

1. FOR EACH Department_Profile, THE System SHALL include career outcomes information consisting of common job titles graduates obtain, typical employment sectors and industries, current job market demand level in Ethiopia (high, medium, or low) with supporting justification, distinction between local Ethiopian opportunities and international opportunities, and industry partnerships or companies that recruit from the department
2. WHERE available from department heads, THE System SHALL include alumni success stories with graduate names, graduation years, current job titles, and employing companies or organizations
3. THE System SHALL display career outcomes information within the Department_Profile detail view and within recommendation explanations where relevant to student career goal responses
4. THE System SHALL update career outcomes data at least once per academic semester (minimum twice per year) to maintain currency
5. WHERE job market demand data is available, THE System SHALL include a "career reality check" section highlighting discrepancies between high student interest and lower market demand or vice versa

### Requirement 13: Feedback Collection and Continuous Improvement

**User Story:** As a prospective CCI student, I want to provide feedback on my experience with the system, so that it can be improved for future users.

#### Acceptance Criteria

1. AFTER displaying assessment results, THE System SHALL present a feedback form inviting students to rate their experience on a 5-star scale
2. THE feedback form SHALL include a text input field allowing students to provide detailed comments (optional, maximum 500 characters)
3. THE feedback form SHALL ask students to indicate whether recommendations matched their expectations using options (Yes, Partially, No)
4. THE System SHALL store submitted feedback data associated with the assessment session identifier for admin review
5. THE Analytics_Dashboard SHALL display aggregated feedback metrics including average star rating, percentage distribution of expectation match responses, and total feedback submissions
6. THE System SHALL generate weekly feedback summary emails sent to admin email addresses containing average ratings, common themes from text comments, and notable individual feedback entries

### Requirement 14: LLM API Integration for Explanation Generation

**User Story:** As a prospective CCI student, I want to receive personalized explanations for my recommendations that reference my specific responses, so that I understand why each department was suggested for me.

#### Acceptance Criteria

1. WHEN generating recommendation explanations, THE System SHALL invoke the LLM_API with a structured prompt containing student response patterns, selected department characteristics, and explanation generation instructions
2. THE System SHALL configure the LLM_API prompt to generate explanation text between 50 and 150 words addressing why the department matches the student profile, specific student responses that contributed to the match, how this department differs from the next closest alternative, and one potential challenge area based on student responses
3. THE System SHALL implement timeout handling for LLM_API requests with maximum wait time of 5 seconds
4. IF the LLM_API request times out or returns an error, THEN THE System SHALL fall back to template-based explanation text using predefined patterns filled with department characteristics
5. THE System SHALL cache LLM_API responses for identical response pattern and department combinations to reduce API usage costs
6. THE System SHALL implement rate limiting restricting LLM_API invocations to maximum 100 requests per hour to stay within free tier quotas
7. WHEN rate limits are exceeded, THE System SHALL use template-based fallback explanations without degrading user experience

### Requirement 15: Data Validation and Integrity

**User Story:** As an admin, I want the system to maintain data integrity and validate inputs, so that recommendations are based on accurate information and the system remains reliable.

#### Acceptance Criteria

1. WHEN admins enter Department_Profile data, THE System SHALL validate that required fields (core focus, career outcomes, student success profile) contain non-empty values
2. THE System SHALL prevent creation of duplicate Department_Profiles with identical department names
3. THE System SHALL validate that Match_Score calculations always produce values between 0 and 100 inclusive
4. WHEN computing Match_Scores, THE System SHALL verify that all scoring weights sum to 100 percent and display an admin configuration error if weights are misconfigured
5. THE System SHALL validate that assessment question response options include at least 2 and at most 6 choices
6. WHEN database write operations fail, THE System SHALL roll back partial changes to maintain consistent database state
7. IF data corruption is detected during Match_Score calculation, THEN THE System SHALL log error details including timestamp, affected assessment identifier, and error description, and notify admins via email within 5 minutes

### Requirement 16: Multi-language Foundation

**User Story:** As a prospective CCI student, I want the system interface to support my preferred language, so that I can understand content clearly regardless of my language proficiency.

#### Acceptance Criteria

1. THE System SHALL implement internationalization infrastructure supporting multiple language translations
2. THE System SHALL provide English language as the primary supported interface language for initial release
3. THE System SHALL structure all user-facing text as translatable strings stored separately from application code
4. THE System SHALL provide a language selection control visible on the homepage allowing students to choose their preferred interface language
5. WHERE multiple languages are configured, THE System SHALL persist language preference across user sessions using browser local storage
6. THE System SHALL allow language switching at any point during system usage with immediate interface update
7. WHERE Amharic language translation is added in future releases, THE System SHALL display all interface elements, assessment questions, department information, and recommendation explanations in the selected language maintaining semantic accuracy

### Requirement 17: Assessment Question Quality Standards

**User Story:** As a prospective CCI student, I want assessment questions to be clear, unbiased, and strategically designed, so that my recommendations accurately reflect my profile.

#### Acceptance Criteria

1. THE Assessment SHALL include at least four questions evaluating thinking style (abstract versus concrete reasoning, theoretical versus practical orientation, big picture versus detail focus, structured versus exploratory approach)
2. THE Assessment SHALL include at least four questions evaluating work preferences (building versus managing versus analyzing, individual versus team orientation, routine versus variety, deadline-driven versus self-paced)
3. THE Assessment SHALL include at least three questions evaluating learning style (reading versus doing versus discussing, step-by-step instruction versus experimental discovery, conceptual understanding first versus practical application first)
4. THE Assessment SHALL include at least three questions evaluating career goals (preferred job roles, desired work environment, local versus international opportunities)
5. THE Assessment SHALL include at least three questions evaluating technical aptitude (mathematical comfort level, programming interest and experience, hardware and systems interest)
6. THE Assessment SHALL include at least three questions evaluating problem-solving approaches (methodology preferences, motivation factors, success definition)
7. EACH assessment question SHALL use clear unambiguous language avoiding technical jargon unless jargon recognition itself is being evaluated
8. EACH assessment question SHALL provide balanced response options avoiding bias toward any particular department
9. THE Assessment SHALL avoid negative framing in questions (asking what students dislike or cannot do) and instead use positive framing (asking what students prefer or are interested in)

### Requirement 18: Admin Notification System

**User Story:** As an admin, I want to receive notifications about important system events and issues, so that I can respond promptly to problems and monitor system health.

#### Acceptance Criteria

1. WHEN data corruption is detected, THE System SHALL send an email notification to configured admin email addresses within 5 minutes
2. WHEN the LLM_API rate limit is exceeded, THE System SHALL send an email notification to admins indicating rate limit status and estimated time until quota reset
3. WHEN database backup operations fail, THE System SHALL send an email notification to admins within 30 minutes of the failure
4. WHEN system uptime falls below 99 percent during an academic registration period, THE System SHALL send an email notification to admins with downtime duration and affected time periods
5. THE System SHALL generate weekly summary emails sent to admins containing total assessments completed, top recommended departments, average feedback ratings, and any error events
6. THE System SHALL allow admins to configure notification preferences including email addresses and notification types through the administrative interface

### Requirement 19: Department Enrollment Balancing

**User Story:** As an admin, I want the system to consider department enrollment capacity, so that recommendations help balance student distribution across departments.

#### Acceptance Criteria

1. THE System SHALL allow admins to configure target enrollment capacity for each department as a percentage of total CCI incoming students
2. THE System SHALL allow admins to view current recommendation distribution showing percentage of students receiving each department as their top recommendation
3. WHEN two departments have Match_Scores within 5 percentage points, THE System SHALL apply tiebreaker logic favoring the department with lower current recommendation percentage to promote balanced distribution
4. THE System SHALL display enrollment balancing information on the Analytics_Dashboard showing target capacity versus current recommendation distribution for each department
5. THE System SHALL generate alerts when any department's recommendation percentage exceeds its target enrollment capacity by more than 10 percentage points
6. THE tiebreaker logic SHALL only apply when Match_Scores differ by less than 5 percentage points to ensure recommendations remain primarily driven by student fit rather than enrollment balancing

### Requirement 20: System Configuration and Deployment

**User Story:** As an ICT Center staff member, I want the system to be deployable on reliable hosting infrastructure with clear documentation, so that it can be maintained without ongoing developer involvement.

#### Acceptance Criteria

1. THE System SHALL be deployable on Vercel free tier hosting platform for frontend components
2. THE System SHALL be deployable on MongoDB Atlas free tier for database hosting with 512 megabytes storage capacity
3. THE System SHALL be deployable on Render free tier or similar platform for backend API hosting
4. THE System SHALL include environment configuration files specifying required environment variables (database connection string, LLM_API key, admin email addresses, session secret key)
5. THE System SHALL include deployment documentation describing step-by-step deployment process for each component (frontend, backend, database)
6. THE System SHALL include maintenance documentation describing common administrative tasks (updating department information, modifying assessment questions, viewing analytics, exporting data)
7. THE System SHALL implement health check endpoints allowing monitoring services to verify system availability
8. THE System SHALL use environment variables for all configuration values avoiding hardcoded credentials or API keys in source code
