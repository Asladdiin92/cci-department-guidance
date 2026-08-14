# Project Proposal for Title Approval

**Project Title**: Department Choice Guidance System for CCI Students

**Student Name**: [Your Name]  
**Department**: [Your Department]  
**Internship Organization**: Haramaya University ICT Center  
**Submission Date**: [Date]  
**Advisor**: [Advisor Name]

---

## 1. Project Background

### 1.1 Problem Statement

Students at the College of Computing and Informatics (CCI) at Haramaya University face challenges in selecting the most suitable department (Computer Science, Software Engineering, Information Technology, Information System, Statistics) after completing their freshman year. 

**Current Issues:**
- Lack of structured guidance for department selection
- Limited understanding of differences between departments (CS/SWE/IT/IS/Statistics)
- Students often choose based on peer influence rather than personal fit
- High department transfer rates indicating initial poor choices
- Confusion about career paths and skill requirements for each department

**Evidence from Initial Survey:**
- 41 student responses collected
- 61% currently in Computer Science, 19.5% in Software Engineering, 19.5% in Information Technology
- Survey reveals students need better information about department differences and career outcomes

### 1.2 Proposed Solution

Develop a **web-based Department Choice Guidance System** that:
- Provides interactive assessment of student interests, skills, and career goals
- Offers comprehensive information about each CCI department
- Generates personalized department recommendations based on student profile
- Allows comparison between departments
- Helps students make informed, data-driven decisions

---

## 2. Project Objectives

### 2.1 General Objective

To develop an intelligent web-based guidance system that helps CCI students choose the most compatible department based on their interests, skills, and career aspirations.

### 2.2 Specific Objectives

1. **Gather comprehensive data** from department heads about:
   - Core focus and distinguishing characteristics of each department
   - Curriculum requirements and skill demands
   - Career outcomes and job market demand
   - Common student misconceptions

2. **Design and implement** an interactive assessment system that:
   - Evaluates student interests (theory vs. hands-on vs. systems vs. business)
   - Assesses technical aptitude and learning preferences
   - Captures career goals and aspirations

3. **Develop a recommendation engine** that:
   - Matches student profiles with compatible departments
   - Provides explanations for recommendations
   - Highlights key differences between departments

4. **Create a department information repository** that:
   - Presents detailed profiles for all 5 CCI departments
   - Displays career paths and job market information
   - Includes comparison features

5. **Build an administrative interface** that:
   - Allows content management of department information
   - Provides analytics on student preferences and system usage
   - Enables continuous system improvement

---

## 3. Project Scope

### 3.1 In Scope

**Features to be Implemented:**
- Student assessment questionnaire (20-25 questions)
- Recommendation engine with weighted scoring algorithm
- Department information pages (CS, SWE, IT, IS, Statistics)
- Department comparison tool (side-by-side view)
- Admin panel for content management
- Analytics dashboard
- User authentication (optional/anonymous access)
- Responsive design (mobile and desktop)
- Multi-language support (English and Amharic)

**Technical Deliverables:**
- Full-stack web application (Frontend + Backend + Database)
- Complete system documentation
- User manual
- Admin guide
- Testing reports
- Source code with version control

### 3.2 Out of Scope

- Integration with existing university student information systems
- Automated course registration
- Academic advising scheduling system
- Student tracking after department selection
- Mobile native applications (web-responsive only)

### 3.3 Target Users

1. **Primary Users**: Prospective CCI students (post-freshman)
2. **Secondary Users**: CCI department heads and academic advisors
3. **Administrative Users**: ICT Center staff maintaining the system

---

## 4. Preliminary Requirements

### 4.1 Functional Requirements (Summary)

1. **Student Assessment System**
   - Interactive questionnaire with progress saving
   - 10-15 minute completion time
   - Scenario-based questions to distinguish department preferences

2. **Recommendation Engine**
   - Algorithm-based matching (weighted scoring)
   - Top 3 department recommendations with explanations
   - Match scores (0-100) for each department

3. **Department Information Repository**
   - Structured profiles for all 5 departments
   - Core focus, key differentiators, career paths
   - Current job market information for Ethiopia

4. **Comparison Feature**
   - Select 2-5 departments to compare
   - Side-by-side view of key characteristics
   - PDF export capability

5. **Admin Panel**
   - Content management for department data
   - View system analytics and usage statistics
   - Modify assessment questions and scoring weights

### 4.2 Non-Functional Requirements (Summary)

1. **Performance**: Page load time < 2 seconds
2. **Scalability**: Support 50+ concurrent users
3. **Availability**: 99% uptime during registration periods
4. **Security**: Encrypted passwords, session management, data privacy
5. **Usability**: WCAG 2.1 Level AA accessibility compliance
6. **Compatibility**: Works on Chrome, Firefox, Safari, Edge
7. **Responsiveness**: Mobile (320px) to desktop (2560px)

---

## 5. Methodology

### 5.1 Development Approach

**Agile Development (Scrum-based)**
- Sprint duration: 2 weeks
- Regular meetings with advisor and ICT Center supervisor
- Iterative development with continuous feedback

### 5.2 Development Phases

**Phase 1: Requirement Gathering (Weeks 1-2)**
- Conduct department head interviews
- Finalize system requirements
- Create detailed functional specifications

**Phase 2: System Design (Weeks 3-4)**
- Design system architecture
- Create UML diagrams (use case, class, sequence, activity)
- Design database schema
- Create UI/UX mockups

**Phase 3: Implementation (Weeks 5-10)**
- Set up development environment
- Develop frontend interface
- Build backend API
- Implement database
- Integrate recommendation engine
- Build admin panel

**Phase 4: Testing (Weeks 11-12)**
- Unit testing
- Integration testing
- User acceptance testing with sample students
- Bug fixing and refinement

**Phase 5: Deployment & Documentation (Weeks 13-14)**
- Deploy to ICT Center server
- Prepare user documentation
- Create admin guide
- Finalize industrial practice report

### 5.3 Technology Stack (Proposed)

**Frontend:**
- React.js or Vue.js (modern JavaScript framework)
- Responsive CSS framework (Tailwind CSS or Bootstrap)
- Chart.js for data visualization

**Backend:**
- Node.js with Express.js OR Python with Flask/Django
- RESTful API architecture

**Database:**
- PostgreSQL or MySQL (relational database)
- Store: department profiles, assessment questions, user responses, recommendations

**Development Tools:**
- Git for version control
- VS Code or similar IDE
- Postman for API testing

**Hosting:**
- Haramaya University ICT Center server
- (Alternative: Cloud hosting if approved)

---

## 6. Expected Outcomes

### 6.1 System Deliverables

1. **Functional Web Application**
   - Fully operational Department Choice Guidance System
   - Accessible via web browser
   - Deployed on ICT Center infrastructure

2. **Documentation**
   - Complete system requirements document
   - System design document with UML diagrams
   - User manual
   - Administrator guide
   - Technical documentation (API docs, database schema)

3. **Testing Reports**
   - Unit test results
   - Integration test results
   - User acceptance test feedback

4. **Source Code**
   - Version-controlled repository
   - Well-commented code
   - README with setup instructions

### 6.2 Expected Benefits

**For Students:**
- ✅ Informed department selection decisions
- ✅ Better understanding of department differences
- ✅ Reduced anxiety about choosing wrong department
- ✅ Career path clarity

**For University/CCI:**
- ✅ Reduced department transfer rates
- ✅ Better student-department fit
- ✅ Higher student satisfaction
- ✅ Data-driven insights into student preferences
- ✅ Improved advising efficiency

**For ICT Center:**
- ✅ Practical, deployable system serving real need
- ✅ Demonstration of intern capability
- ✅ Potential template for similar guidance systems in other colleges

---

## 7. Preliminary Data Analysis

### 7.1 Initial Survey Results (41 Responses)

**Student Distribution by Department:**
- Computer Science: 61% (25 students)
- Software Engineering: 19.5% (8 students)
- Information Technology: 19.5% (8 students)
- Others: Small percentages

**Student Distribution by Year:**
- Third year: 43.9% (18 students)
- Fourth year: 41.5% (17 students)
- Second year: 12.2% (5 students)
- Others: Small percentages

**Key Insights:**
- Strong interest in understanding department differences
- Students want information about career outcomes
- Need for clarity on what each department actually teaches
- Desire for guidance on which department matches their skills

### 7.2 Next Steps in Data Collection

1. **Department Head Interviews** (9 questions per department)
   - Already prepared questionnaire sent to department heads
   - Targeting all 5 CCI departments
   - Focus on distinguishing characteristics and career outcomes

2. **Additional Student Surveys** (if needed)
   - Gather more responses to validate patterns
   - Test pilot assessment questions

---

## 8. Project Timeline

| Phase | Duration | Activities |
|-------|----------|-----------|
| **Requirement Gathering** | Weeks 1-2 | Department head interviews, requirement analysis |
| **System Design** | Weeks 3-4 | Architecture design, UML diagrams, UI mockups |
| **Implementation** | Weeks 5-10 | Frontend, backend, database, testing |
| **Testing & Refinement** | Weeks 11-12 | Unit, integration, UAT testing |
| **Deployment & Documentation** | Weeks 13-14 | Deployment, documentation, report finalization |

**Total Duration**: Approximately 14 weeks (3.5 months)

---

## 9. Resource Requirements

### 9.1 Hardware
- Development laptop/computer (student-owned)
- ICT Center server for deployment (available)
- Testing devices (mobile, tablet, desktop)

### 9.2 Software
- Development tools (free/open-source)
- Database management system (free/open-source)
- Web hosting (ICT Center infrastructure)

### 9.3 Human Resources
- Student developer (self)
- ICT Center supervisor (guidance)
- Academic advisor (weekly consultation)
- Department heads (interview participation)
- Test users (volunteer students)

### 9.4 Budget
- **Estimated Cost**: Minimal
- Development tools: Free (VS Code, Git, etc.)
- Hosting: Provided by ICT Center
- No major financial requirements

---

## 10. Risk Management

| Risk | Impact | Mitigation Strategy |
|------|--------|---------------------|
| Department heads not responding to interviews | High | Follow-up emails, in-person visits, offer flexible interview times |
| Technical challenges in implementation | Medium | Start with simpler features, seek mentor guidance, use well-documented frameworks |
| Timeline delays | Medium | Build buffer time, prioritize core features, use Agile for flexibility |
| Server/hosting issues | Low | Coordinate early with ICT Center, have backup cloud hosting plan |
| User adoption challenges | Low | Involve students in testing, gather feedback early, ensure user-friendly design |

---

## 11. Success Criteria

The project will be considered successful if:

1. ✅ **System is fully functional** and meets 80%+ of specified requirements
2. ✅ **Successfully deployed** on ICT Center infrastructure
3. ✅ **User testing** shows 70%+ satisfaction rate
4. ✅ **Recommendation accuracy** validated by department heads
5. ✅ **Complete documentation** according to Industrial Practice Report guidelines
6. ✅ **Positive feedback** from ICT Center supervisor and academic advisor
7. ✅ **System can be used** by actual students in next enrollment period

---

## 12. Conclusion

The Department Choice Guidance System addresses a real and pressing need at CCI. By leveraging web technology and data-driven recommendations, this system will help students make better-informed department choices, leading to higher satisfaction and lower transfer rates.

This project aligns perfectly with:
- ✅ ICT Center's mission to support university operations
- ✅ CCI's need for better student guidance
- ✅ Industrial practice objectives (practical, deployable software)
- ✅ Software development report requirements (requirements, design, implementation, testing)

The project is technically feasible, practically valuable, and well-scoped for a 14-week internship period.

---

## 13. Appendices

### Appendix A: Survey Screenshots
[Include screenshots of your 41-response survey]

### Appendix B: Department Head Questionnaire
[Include link or copy of your Google Form]

### Appendix C: Preliminary Requirements Document
[Reference to: .kiro/specs/department-choice-guidance/requirements.md]

### Appendix D: Initial Stakeholder Support
- ICT Center: [Approval/support letter if available]
- Academic Advisor: [Confirmation of topic acceptance]

---

**Submitted by:**  
[Your Name]  
[Student ID]  
[Contact Information]

**Reviewed by:**  
[Advisor Name]  
[Advisor Title]

**Date**: [Submission Date]

---

## Approval Section

**Project Title Approved:** ☐ Yes  ☐ No  ☐ Requires Modification

**Comments/Suggestions:**

_______________________________________________

_______________________________________________

_______________________________________________


**Advisor Signature:** _____________________  **Date:** _________

**Department Head Signature:** _____________  **Date:** _________
