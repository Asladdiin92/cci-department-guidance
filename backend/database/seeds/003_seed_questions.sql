-- ================================================================
-- CCI Department Guidance System - Seed Questions & Options
-- Version: 2.0 (Supabase Compatible)
-- Date: September 1, 2026
-- Description: Insert 20 assessment questions with scoring options
-- ================================================================

-- Note: Each question has 6 options with department scores
-- Scores: 3 = Strong match, 2 = Good match, 1 = Weak match, 0 = No match

DO $$
DECLARE
    q1_id UUID;
    q2_id UUID;
    q3_id UUID;
    q4_id UUID;
    q5_id UUID;
    q6_id UUID;
    q7_id UUID;
    q8_id UUID;
    q9_id UUID;
    q10_id UUID;
    q11_id UUID;
    q12_id UUID;
    q13_id UUID;
    q14_id UUID;
    q15_id UUID;
    q16_id UUID;
    q17_id UUID;
    q18_id UUID;
    q19_id UUID;
    q20_id UUID;
BEGIN

-- ================================================================
-- QUESTION 1: Problem-solving approach
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'How do you most naturally approach a new difficult problem?',
    'problem_solving',
    'EASY',
    1
) RETURNING id INTO q1_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q1_id, 'By understanding the underlying computational theory and formal model before solving it', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q1_id, 'By designing and building a working software solution, then refining it through testing', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q1_id, 'By diagnosing the environment, tools, or infrastructure so the system can run reliably', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q1_id, 'By clarifying stakeholder needs and mapping the business process before choosing the technology', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q1_id, 'By identifying what information users need, organizing the sources, and making them easy to access', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q1_id, 'By defining the variables, collecting data, and testing what the evidence says', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 2: Course challenge preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which course challenge sounds most interesting to you?',
    'interests',
    'EASY',
    2
) RETURNING id INTO q2_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q2_id, 'Algorithm analysis, automata, or another core computation problem', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q2_id, 'A software design, testing, and maintenance project', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q2_id, 'A networking, systems administration, cloud, or security lab', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q2_id, 'A systems analysis, ERP, or management information systems case', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q2_id, 'An information organization, indexing, digital library, or records-management task', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q2_id, 'A probability, inference, regression, or experimental-design problem', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which output would make you feel proudest?',
    'career_goals',
    'EASY',
    3
) RETURNING id INTO q3_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q3_id, 'An efficient algorithm or elegant computational solution', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q3_id, 'A high-quality application that real people can use', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q3_id, 'A stable network, lab, or service platform with minimal downtime', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q3_id, 'A workflow or information system that improves organizational performance', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q3_id, 'A well-organized archive or repository that helps users find trustworthy information quickly', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q3_id, 'A statistical report that guides a real decision with evidence', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 4: Learning when confused
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'When a topic is confusing, what do you usually do first?',
    'learning_style',
    'MEDIUM',
    4
) RETURNING id INTO q4_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q4_id, 'Go back to the principles and derive the logic carefully', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q4_id, 'Prototype a small version and learn by building', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q4_id, 'Check the setup, configuration, and system behavior step by step', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q4_id, 'Ask what problem the organization or user is actually trying to solve', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q4_id, 'Classify the sources, define terms clearly, and trace how information should flow', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q4_id, 'Inspect the data, assumptions, and possible sources of variation', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 5: Learning style preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'How do you learn best?',
    'learning_style',
    'EASY',
    5
) RETURNING id INTO q5_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q5_id, 'Conceptual lectures and problems that develop rigorous reasoning', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q5_id, 'Projects, code reviews, and iterative feedback', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q5_id, 'Hands-on labs with real devices, platforms, or administration tasks', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q5_id, 'Case studies about organizations, requirements, and technology use', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q5_id, 'Guided practice organizing, retrieving, preserving, and serving information for users', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q5_id, 'Worked examples with datasets, statistical software, and interpretation', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 6: Reading material preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which kind of reading material do you enjoy most?',
    'interests',
    'EASY',
    6
) RETURNING id INTO q6_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q6_id, 'Technical theory and foundational computing concepts', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q6_id, 'Software documentation, design patterns, and engineering best practices', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q6_id, 'Vendor manuals, setup guides, and operational procedures', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q6_id, 'Business requirements, policy documents, and process models', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q6_id, 'Metadata standards, information-service guidelines, cataloging rules, or archival practices', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q6_id, 'Research reports, survey results, and statistical analyses', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 7: Toolset preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which toolset sounds most appealing?',
    'skills',
    'MEDIUM',
    7
) RETURNING id INTO q7_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q7_id, 'Core programming, algorithmic problem-solving, and systems-level computing tools', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q7_id, 'Frameworks, version control, testing tools, and CI/CD workflows', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q7_id, 'Routers, server dashboards, system monitors, and security tools', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q7_id, 'ERP or reporting tools, requirements models, and organizational databases', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q7_id, 'Digital library or repository systems, metadata tools, and records-management platforms', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q7_id, 'R, SPSS, Stata, Python analytics, and data-visualization tools', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 8: Assignment volunteer
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which assignment would you volunteer for first?',
    'interests',
    'MEDIUM',
    8
) RETURNING id INTO q8_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q8_id, 'Explaining why an algorithm is correct and comparing its complexity', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q8_id, 'Leading the design and implementation of an application module', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q8_id, 'Configuring the lab environment and ensuring all services work', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q8_id, 'Interviewing stakeholders and documenting functional requirements', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q8_id, 'Creating an organized index or repository so users can retrieve materials quickly', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q8_id, 'Designing the data collection plan and analyzing the results', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 9: Team role
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which role fits you best in a team?',
    'skills',
    'EASY',
    9
) RETURNING id INTO q9_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q9_id, 'The one who handles the most abstract technical reasoning', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q9_id, 'The one who turns ideas into working software', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q9_id, 'The one who keeps the environment, tools, and services running', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q9_id, 'The one who coordinates requirements, process, and stakeholder understanding', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q9_id, 'The one who organizes documents, knowledge, or resources so the team can find what it needs', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q9_id, 'The one who evaluates data and checks whether conclusions are valid', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 10: Work motivation
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'What motivates you most in your future work?',
    'career_goals',
    'EASY',
    10
) RETURNING id INTO q10_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q10_id, 'Understanding how computing works at a fundamental level', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q10_id, 'Engineering reliable software that solves real user problems', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q10_id, 'Making technology dependable, secure, and usable in practice', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q10_id, 'Helping an organization use technology more effectively', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q10_id, 'Improving access to useful, accurate, and well-organized information', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q10_id, 'Producing trustworthy evidence for decisions and research', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 11: Work location preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Where would you most like to work?',
    'career_goals',
    'MEDIUM',
    11
) RETURNING id INTO q11_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q11_id, 'A computing research lab or advanced technical team', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q11_id, 'A software company or product development team', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q11_id, 'An ICT operations, support, security, or infrastructure team', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q11_id, 'A bank, enterprise, or public organization improving systems and processes', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q11_id, 'A library, archive, documentation center, school resource center, or knowledge-service unit', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q11_id, 'A statistical office, research center, NGO, or analytics unit', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 12: Internship preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which internship sounds best to you?',
    'career_goals',
    'MEDIUM',
    12
) RETURNING id INTO q12_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q12_id, 'Optimizing a computation-heavy program or intelligent system', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q12_id, 'Building and testing a campus or business application', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q12_id, 'Deploying and troubleshooting networked systems', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q12_id, 'Analyzing and redesigning an office information workflow', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q12_id, 'Digitizing, cataloging, and improving access to institutional records or learning resources', '{"CS": 0, "SWE": 0, "IT": 0, "IS": 1, "ISC": 3, "STAT": 0}', 5),
(q12_id, 'Collecting and analyzing survey or socioeconomic data', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 13: Long-term career goal
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which long-term goal is most attractive to you?',
    'career_goals',
    'HARD',
    13
) RETURNING id INTO q13_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q13_id, 'Become a computing specialist, researcher, or advanced technical expert', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q13_id, 'Become a software architect, quality engineer, or engineering lead', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q13_id, 'Become an infrastructure, security, or ICT service leader', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q13_id, 'Become an information systems manager, consultant, or CIO bridging management and technology', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q13_id, 'Become an information professional, archivist, knowledge manager, or resource-center leader', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q13_id, 'Become a statistician, biostatistician, econometrician, or quantitative researcher', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 14: Reasoning style
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which kind of reasoning comes most naturally to you?',
    'skills',
    'MEDIUM',
    14
) RETURNING id INTO q14_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q14_id, 'Formal, logical, and computational reasoning', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q14_id, 'Design-oriented reasoning about how components should work together', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q14_id, 'Procedural reasoning about configuration, troubleshooting, and maintenance', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q14_id, 'Organizational reasoning about people, process, and system fit', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q14_id, 'Classificatory reasoning about sources, metadata, access, and information use', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q14_id, 'Quantitative reasoning about uncertainty, trends, and evidence', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 15: Daily work activities
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'What kind of daily activities sound most enjoyable?',
    'interests',
    'EASY',
    15
) RETURNING id INTO q15_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q15_id, 'Solving complex mathematical or algorithmic puzzles', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q15_id, 'Writing, testing, and refining code with your team', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q15_id, 'Monitoring systems, resolving incidents, and keeping services available', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q15_id, 'Meeting with users, analyzing processes, and recommending improvements', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q15_id, 'Organizing content, maintaining metadata, and helping people find information', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q15_id, 'Analyzing datasets, creating visualizations, and interpreting results', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 16: Skill strength
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which skill area do you feel strongest in?',
    'skills',
    'EASY',
    16
) RETURNING id INTO q16_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q16_id, 'Mathematics, logic, and theoretical problem-solving', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q16_id, 'Programming, coding, and software development', '{"CS": 2, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q16_id, 'Hardware, networks, and system configuration', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q16_id, 'Communication, analysis, and understanding business needs', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q16_id, 'Organization, classification, and information management', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q16_id, 'Data analysis, statistics, and quantitative methods', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 17: Project scale preference
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'What scale of project appeals to you most?',
    'interests',
    'MEDIUM',
    17
) RETURNING id INTO q17_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q17_id, 'Research-scale: Advancing the field with new algorithms or techniques', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q17_id, 'Product-scale: Building software used by thousands or millions', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q17_id, 'Infrastructure-scale: Maintaining systems that serve an entire organization', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q17_id, 'Enterprise-scale: Integrating systems across departments and processes', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q17_id, 'Collection-scale: Managing large repositories of knowledge or records', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q17_id, 'Study-scale: Analyzing data from surveys, experiments, or populations', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 18: Problem-solving satisfaction
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'What gives you the most satisfaction when solving problems?',
    'problem_solving',
    'MEDIUM',
    18
) RETURNING id INTO q18_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q18_id, 'Finding the most efficient or elegant solution', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q18_id, 'Creating something that works reliably and serves users well', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q18_id, 'Fixing issues quickly and keeping services running smoothly', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q18_id, 'Understanding the full context and delivering what stakeholders need', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q18_id, 'Making complex information accessible and easy to find', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q18_id, 'Discovering insights that support better decisions', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 19: Collaboration style
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'How do you prefer to collaborate with others?',
    'learning_style',
    'MEDIUM',
    19
) RETURNING id INTO q19_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q19_id, 'Discussing theoretical concepts and debating technical approaches', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q19_id, 'Pair programming, code reviews, and iterative development', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q19_id, 'Coordinating deployments, troubleshooting together, and sharing configurations', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q19_id, 'Facilitating meetings, gathering requirements, and aligning stakeholders', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q19_id, 'Sharing resources, developing standards, and improving findability', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q19_id, 'Reviewing methods, interpreting results, and discussing statistical validity', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

-- ================================================================
-- QUESTION 20: Future technology interest
-- ================================================================
INSERT INTO questions (text, category, difficulty, order_index)
VALUES (
    'Which emerging technology area excites you most?',
    'interests',
    'HARD',
    20
) RETURNING id INTO q20_id;

INSERT INTO question_options (question_id, text, scores, order_index) VALUES
(q20_id, 'Quantum computing, advanced algorithms, or AI/ML research', '{"CS": 3, "SWE": 1, "IT": 0, "IS": 0, "ISC": 0, "STAT": 2}', 1),
(q20_id, 'Modern development frameworks, microservices, or low-code platforms', '{"CS": 1, "SWE": 3, "IT": 1, "IS": 1, "ISC": 0, "STAT": 0}', 2),
(q20_id, 'Cloud infrastructure, edge computing, or cybersecurity innovations', '{"CS": 0, "SWE": 1, "IT": 3, "IS": 1, "ISC": 0, "STAT": 0}', 3),
(q20_id, 'Digital transformation, blockchain for business, or smart enterprise systems', '{"CS": 0, "SWE": 1, "IT": 1, "IS": 3, "ISC": 1, "STAT": 0}', 4),
(q20_id, 'Semantic web, linked data, or AI-powered information retrieval', '{"CS": 0, "SWE": 0, "IT": 1, "IS": 2, "ISC": 3, "STAT": 1}', 5),
(q20_id, 'Big data analytics, predictive modeling, or computational statistics', '{"CS": 1, "SWE": 0, "IT": 0, "IS": 0, "ISC": 1, "STAT": 3}', 6);

    -- Completion message
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Questions & Options Seeded Successfully!';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Questions Inserted: 20';
    RAISE NOTICE 'Options Inserted: 120';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Status: ✅ All questions and options seeded correctly';
    RAISE NOTICE '==================================================';
    RAISE NOTICE 'Next Step: Start backend server with: npm run dev';
    RAISE NOTICE '==================================================';

END $$;

-- ================================================================
-- VERIFICATION Queries (Run these separately if needed)
-- ================================================================

-- Count questions
SELECT COUNT(*) as total_questions FROM questions;

-- Count options per question
SELECT 
    q.order_index,
    LEFT(q.text, 50) || '...' as question_preview,
    COUNT(qo.id) as option_count
FROM questions q
LEFT JOIN question_options qo ON q.id = qo.question_id
GROUP BY q.id, q.order_index, q.text
ORDER BY q.order_index;

-- Verify all scoring is present
SELECT 
    q.order_index,
    qo.order_index as option_num,
    qo.scores->'CS' as cs_score,
    qo.scores->'SWE' as swe_score,
    qo.scores->'IT' as it_score,
    qo.scores->'IS' as is_score,
    qo.scores->'ISC' as isc_score,
    qo.scores->'STAT' as stat_score
FROM questions q
JOIN question_options qo ON q.id = qo.question_id
WHERE q.order_index <= 3
ORDER BY q.order_index, qo.order_index;

