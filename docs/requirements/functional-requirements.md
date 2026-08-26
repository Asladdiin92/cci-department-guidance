# My Functional Requirement Implementation Plan

## Team Member Response (Draft for Group)

---

**Hi, my name is [Your Name]**

I identified the **Student Assessment System (Interactive Questionnaire)** as a functional requirement in our system, and I intend to implement **the questionnaire interface with dynamic question rendering and response collection** for this specific component.

---

## Functional Requirement: Student Assessment System

### What I'm Building:

**Component**: Interactive Assessment Questionnaire  
**Priority**: HIGH (Core feature - the entire recommendation system depends on this)

### Specific Features I'll Implement:

1. **Question Display Engine**
   - Render different question types (multiple choice, rating scale, text input)
   - Show one question at a time with progress indicator
   - Support different question formats for different preference types

2. **Navigation System**
   - Previous/Next buttons
   - Progress bar (e.g., "Question 5 of 20")
   - Question numbering

3. **Response Collection**
   - Capture user answers for each question
   - Store responses temporarily (in-memory or localStorage)
   - Validate that questions are answered before proceeding

4. **Basic UI/UX**
   - Clean, simple interface
   - Mobile-responsive design
   - Clear question text and answer options

### Technical Approach:

**Frontend (What I'll Build First):**
- **Technology**: React.js (or Vue.js)
- **Components**:
  - `AssessmentContainer` - Main wrapper
  - `Question` - Individual question display
  - `ProgressBar` - Shows completion percentage
  - `NavigationButtons` - Previous/Next controls
  - `QuestionTypes` - Multiple choice, rating, text input

**Data Structure (JSON format for questions):**
```json
{
  "questionId": 1,
  "questionText": "How do you prefer to solve problems?",
  "questionType": "multipleChoice",
  "options": [
    "By understanding theoretical concepts first",
    "By experimenting and trying different solutions",
    "By following established procedures and best practices",
    "By analyzing data and patterns"
  ],
  "mappedDepartments": {
    "CS": 2,
    "SWE": 3,
    "IT": 1,
    "IS": 1,
    "STAT": 2
  }
}
```

**Sample Questions I'll Start With (5-10 questions for MVP):**

1. **Thinking Style**: "How do you prefer to solve problems?"
   - Theory first
   - Hands-on experimentation
   - Following procedures
   - Data analysis

2. **Work Preference**: "Which type of work appeals to you most?"
   - Building software applications
   - Designing system architecture
   - Managing IT infrastructure
   - Analyzing business requirements
   - Working with statistical models

3. **Learning Style**: "How do you learn best?"
   - Reading documentation and theory
   - Building projects and experimenting
   - Following tutorials step-by-step
   - Analyzing case studies

4. **Career Goal**: "What type of role interests you after graduation?"
   - Software Developer/Engineer
   - Systems Administrator/Network Engineer
   - Business Analyst/Consultant
   - Data Scientist/Analyst

5. **Math Comfort**: "How comfortable are you with advanced mathematics?"
   - Very comfortable (enjoy proofs and theory)
   - Comfortable (can handle when needed)
   - Prefer practical applications
   - Prefer minimal math

### Implementation Steps:

**Phase 1: Basic Structure (Today/Tomorrow)**
1. Set up React project
2. Create basic components (Question, ProgressBar, Navigation)
3. Hardcode 5-10 sample questions
4. Implement navigation (Previous/Next)
5. Show progress indicator

**Phase 2: Response Collection (Day 2-3)**
6. Store user responses in state/localStorage
7. Add validation (ensure question answered before next)
8. Display summary at the end

**Phase 3: Scoring Logic (Day 4-5)**
9. Calculate basic scores for each department
10. Display simple results (which department scored highest)

**Phase 4: Polish (Day 6-7)**
11. Improve UI/UX
12. Add animations/transitions
13. Test on mobile devices

### Why This Component First?

✅ **Foundation**: Everything else depends on collecting student responses  
✅ **Visible Progress**: Can show working demo quickly  
✅ **User-Facing**: Most important from user perspective  
✅ **Testable**: Easy to get feedback from teammates and students  
✅ **Iterative**: Can start simple and add complexity gradually

### What I Need from Team:

- **Backend Developer**: Will need API endpoint to save responses later (not critical for MVP)
- **Data Collector**: Sample questions from department head interviews
- **UI/UX**: Feedback on design and user experience
- **Tester**: Test the questionnaire flow and identify issues

### Deliverables (End of Week 1):

1. ✅ Working questionnaire interface
2. ✅ 5-10 functional questions with different types
3. ✅ Navigation and progress tracking
4. ✅ Basic scoring to show which department matches best
5. ✅ Responsive design (works on mobile/desktop)

### Demo Plan:

I'll record a short video/GIF showing:
- User starts assessment
- Answers 5-10 questions
- Sees progress bar
- Gets basic result (department recommendation)

---

## Alternative Functional Requirements (If Someone Else Picks Assessment)

### Option 2: Department Information Repository
**What**: Build department profile pages showing information about each department (CS, SWE, IT, IS, ISC, Statistics)

**I would implement**:
- Individual department page template
- Display core focus, courses, career paths
- Clean card-based layout
- Search/filter functionality

### Option 3: Recommendation Display
**What**: Show recommendation results after assessment

**I would implement**:
- Results page with top 3 recommended departments
- Match score visualization (progress bars or radar chart)
- Explanation text for each recommendation
- "Why this department?" section

### Option 4: Department Comparison Tool
**What**: Side-by-side comparison of departments

**I would implement**:
- Select multiple departments (checkboxes)
- Comparison table/grid
- Highlight differences
- Export to PDF (bonus)

---

## My Choice: **Student Assessment System**

**Reason**: It's the core of the entire system and most visible to end users. Starting here gives us something to demo quickly and gets team excited about the project.

---

**Timeline**: Start today, working demo in 3-5 days

**Questions for Team**:
1. Should I use React or Vue.js? (I'm comfortable with both)
2. What color scheme should I use for the UI?
3. Should I host a live demo somewhere or just run locally?

**Ready to start coding!** 🚀

---

