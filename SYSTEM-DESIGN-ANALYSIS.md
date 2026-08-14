# CCI Department Choice Guidance System - Design Analysis

**Created by:** [Asladin Abdukadir]  
**Date:** August 14, 2026  
**Purpose:** Initial system exploration and UI/UX design planning

---

## 1. System Overview - What Should It Provide?

### Core Features Analysis

#### A. **Student Assessment Module** (My Component)
**What it should do:**
- Present 20 carefully designed questions
- Show progress to keep students engaged
- Allow navigation (back/forward)
- Save responses automatically
- Be mobile-friendly (many students use phones)
- Complete in 10-15 minutes
- Feel professional yet friendly

**Why this matters:**
- First impression of the system
- Determines accuracy of recommendations
- Must be engaging to prevent dropouts
- Data quality depends on clear questions

---

#### B. **Department Information Pages**
**What it should provide:**
- Clear explanation of what each department actually does
- Core courses students will take
- Career paths (local Ethiopia + international)
- "Day in the life" examples
- Common misconceptions addressed
- Required skill set
- Theory vs. practice balance

**Why this matters:**
- Students need context to understand recommendations
- Helps clarify confusion between similar departments (CS vs SWE, IT vs IS)
- Sets realistic expectations

---

#### C. **Recommendation Results Display**
**What it should show:**
- Top 3 department matches with scores (0-100)
- Visual representation (progress bars, charts)
- Explanation: "Why this department matches you"
- Warning flags: "This department might be challenging if..."
- Next steps: "What to do now"
- Option to compare departments side-by-side

**Why this matters:**
- This is where value is delivered
- Must be convincing yet honest
- Should guide decision, not make it for them

---

#### D. **Department Comparison Tool**
**What it should allow:**
- Select 2-5 departments to compare
- Side-by-side table view
- Categories: Core focus, Courses, Careers, Skills, Difficulty
- Highlight differences clearly
- Export/print for discussion with parents/advisors

**Why this matters:**
- Students often torn between 2 departments
- Makes differences concrete and visible

---

#### E. **Admin Dashboard** (Not my component, but part of system)
**What it needs:**
- Update department information
- Add/modify assessment questions
- View system analytics (usage, popular departments, completion rates)
- Export student response data (anonymized)
- Manage content in English and Amharic

---

## 2. User Flow Analysis

### Student Journey:

```
START
  ↓
[Welcome Page]
  - Introduction to system
  - What to expect (20 questions, 10-15 min)
  - "Start Assessment" button
  ↓
[Assessment - Question 1]
  - Clear question text
  - 4-5 options
  - Progress indicator (Question 1 of 20)
  - Navigation: [Previous] [Next]
  ↓
[Assessment - Questions 2-19]
  - Same format
  - Progress bar fills
  - Can go back to change answers
  ↓
[Assessment - Question 20]
  - Last question
  - "Submit" instead of "Next"
  - Confirmation: "Ready to see results?"
  ↓
[Processing/Loading]
  - Nice animation (1-2 seconds)
  - "Analyzing your responses..."
  ↓
[Results Page]
  - Top 3 recommendations
  - Match scores with visual bars
  - Explanations for each
  - Actions: [Compare Departments] [Retake Assessment] [Learn More]
  ↓
[Department Details] (if clicked "Learn More")
  - Full department information
  - Courses, careers, skills needed
  - Success stories
  ↓
[Comparison View] (if clicked "Compare")
  - Side-by-side comparison
  - Selected departments
  - Download PDF option
  ↓
END (student makes informed decision)
```

---

## 3. Screen-by-Screen Design Specifications

### Screen 1: Welcome/Landing Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│               HEADER (Purple Gradient)                  │
│         CCI Department Choice Guidance System           │
│         Find Your Perfect Department Match              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Welcome to the Department Guidance Assessment         │
│                                                         │
│   [Icon] 20 Questions    [Icon] 10-15 Minutes          │
│   [Icon] Personalized     [Icon] Evidence-Based        │
│                                                         │
│   This assessment will help you discover which CCI      │
│   department matches your interests, skills, and goals  │
│                                                         │
│   ┌───────────────────────────────────────────┐        │
│   │  Available Departments:                   │        │
│   │  ● Computer Science                       │        │
│   │  ● Software Engineering                   │        │
│   │  ● Information Technology                 │        │
│   │  ● Information System                     │        │
│   │  ● Statistics                             │        │
│   └───────────────────────────────────────────┘        │
│                                                         │
│           [  START ASSESSMENT  ]                       │
│              (Large Button)                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Colors:**
- Header: Purple gradient (#667eea to #764ba2)
- Background: White
- Accent: Green for action buttons
- Text: Dark gray (#333)

---

### Screen 2: Assessment Question Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│               HEADER (Purple)                           │
│         CCI Department Guidance System                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ━━━━━━━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░  (Progress Bar)│
│   Question 5 of 20                                      │
│                                                         │
│   How do you prefer to solve problems?                  │
│                                                         │
│   ┌─────────────────────────────────────────┐          │
│   │ ○ By understanding theoretical concepts │          │
│   │   and proving correctness               │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   ┌─────────────────────────────────────────┐          │
│   │ ● By building working prototypes and    │ ← Selected│
│   │   iterating on solutions                │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   ┌─────────────────────────────────────────┐          │
│   │ ○ By following established procedures   │          │
│   │   and best practices                    │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   ┌─────────────────────────────────────────┐          │
│   │ ○ By analyzing requirements and         │          │
│   │   designing process flows               │          │
│   └─────────────────────────────────────────┘          │
│                                                         │
│   [  ← Previous  ]              [  Next →  ]           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Behavior:**
- Options highlight on hover
- Selected option turns purple/blue
- Next button enabled only when option selected
- Previous button disabled on first question
- Progress bar animates smoothly

---

### Screen 3: Results/Recommendations Page

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│               HEADER                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   🎉 Your Department Recommendations                    │
│   Based on your responses, here are your best matches: │
│                                                         │
│   ╔═══════════════════════════════════════════╗        │
│   ║  🥇 #1 Recommendation                     ║        │
│   ║                                           ║        │
│   ║  SOFTWARE ENGINEERING                     ║        │
│   ║                                           ║        │
│   ║  Match Score: 85%                         ║        │
│   ║  ████████████████████████░░░░░░ 85%      ║        │
│   ║                                           ║        │
│   ║  Why this matches you:                    ║        │
│   ║  • You prefer hands-on building           ║        │
│   ║  • Project-based learning suits you       ║        │
│   ║  • Career goal: Software Developer        ║        │
│   ║  • Strong practical orientation           ║        │
│   ║                                           ║        │
│   ║  [ Learn More ]  [ View Careers ]        ║        │
│   ╚═══════════════════════════════════════════╝        │
│                                                         │
│   ┌───────────────────────────────────────────┐        │
│   │  🥈 #2 - Computer Science (78%)          │        │
│   │  ██████████████████████░░░░░░░░           │        │
│   │  Strong theoretical foundation matches    │        │
│   │  [ View Details ]                         │        │
│   └───────────────────────────────────────────┘        │
│                                                         │
│   ┌───────────────────────────────────────────┐        │
│   │  🥉 #3 - Information Technology (65%)    │        │
│   │  ████████████████░░░░░░░░░░░░░░           │        │
│   │  Infrastructure interests detected        │        │
│   │  [ View Details ]                         │        │
│   └───────────────────────────────────────────┘        │
│                                                         │
│   [ Compare These Departments ]  [ Retake Test ]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual Elements:**
- Gold border for #1 recommendation
- Silver for #2, Bronze for #3
- Animated progress bars (fill on page load)
- Clear color coding per department
- Prominent CTAs (Call-to-action buttons)

---

### Screen 4: Department Comparison Table

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  Compare Departments                           [X Close]│
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Selected: [✓] CS  [✓] SWE  [ ] IT  [ ] IS  [ ] STAT  │
│                                                         │
│  ┌─────────────────┬───────────┬───────────────┐       │
│  │ Criteria        │    CS     │      SWE      │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Core Focus      │ Theory &  │ Building      │       │
│  │                 │ Algorithms│ Applications  │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Math Intensity  │ Very High │ Moderate      │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Theory/Practice │ 70/30     │ 40/60         │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Hardest Courses │ Algorithms│ Software      │       │
│  │                 │ Automata  │ Architecture  │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Career Paths    │ Researcher│ Developer     │       │
│  │                 │ AI Engineer│ Engineer     │       │
│  ├─────────────────┼───────────┼───────────────┤       │
│  │ Ethiopian       │ Medium    │ High          │       │
│  │ Job Market      │           │               │       │
│  └─────────────────┴───────────┴───────────────┘       │
│                                                         │
│  [ Download as PDF ]  [ Print ]  [ Back to Results ]   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Technical Implementation Notes

### Frontend Stack:
- **React** with **Tailwind CSS** (as advisor suggested)
- Component structure:
  ```
  src/
  ├── components/
  │   ├── Welcome.jsx
  │   ├── Assessment/
  │   │   ├── QuestionCard.jsx
  │   │   ├── ProgressBar.jsx
  │   │   ├── NavigationButtons.jsx
  │   ├── Results/
  │   │   ├── RecommendationCard.jsx
  │   │   ├── ScoreBar.jsx
  │   ├── Comparison/
  │   │   ├── ComparisonTable.jsx
  │   ├── DepartmentInfo/
  │   │   ├── DepartmentDetail.jsx
  ├── data/
  │   ├── questions.js
  │   ├── departments.js
  ├── utils/
  │   ├── scoring.js
  ├── App.jsx
  ├── index.css (Tailwind)
  ```

### Key Tailwind CSS Classes to Use:
```css
/* Gradients */
bg-gradient-to-r from-purple-500 to-purple-700

/* Cards */
rounded-lg shadow-lg p-6 bg-white

/* Buttons */
bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg

/* Progress Bars */
bg-gray-200 rounded-full h-2.5
bg-purple-600 h-2.5 rounded-full

/* Responsive */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
```

---

## 5. Question Design Strategy

### Question Categories (20 total):

1. **Thinking Style (4 questions)**
   - Abstract vs Concrete
   - Theory vs Practice
   - Big picture vs Details

2. **Work Preferences (4 questions)**
   - Building vs Managing vs Analyzing
   - Solo vs Team
   - Structure vs Flexibility

3. **Learning Style (3 questions)**
   - Reading vs Doing vs Discussing
   - Step-by-step vs Experimental

4. **Career Goals (3 questions)**
   - Job roles interest
   - Work environment
   - Local vs International

5. **Technical Aptitude (3 questions)**
   - Math comfort
   - Programming interest
   - Hardware interest

6. **Problem-Solving (3 questions)**
   - Approach to challenges
   - Motivation factors
   - Success definition

---

## 6. Scoring Algorithm (Simplified)

```javascript
For each question:
  - CS gets points if: theoretical, math-heavy, research-oriented
  - SWE gets points if: practical, building, coding-focused
  - IT gets points if: infrastructure, hardware, system management
  - IS gets points if: business-focused, analysis, process design
  - STAT gets points if: data-focused, mathematical, analytical

Final Score = Sum of points / Max possible points * 100

Recommendations:
  - Sort departments by score
  - Show top 3
  - Include explanation based on highest-scoring answers
```

---

## 7. Data Needed from Department Heads

From the survey responses, we need:

✅ **Core Focus** - What department actually teaches  
✅ **Key Differentiators** - How it's different from others  
✅ **Defining Courses** - Hardest/most important courses  
✅ **Theory/Practice Balance** - Percentage split  
✅ **Career Paths** - Actual jobs graduates get  
✅ **Job Market** - Demand in Ethiopia  
✅ **Student Profile** - Who succeeds here  
✅ **Misconceptions** - What students misunderstand  

This data will populate the department info pages and comparison tables.

---

## 8. Mobile-First Design Considerations

Since many students will use phones:

- **Large tap targets** (minimum 44x44px)
- **Single column layout** on mobile
- **Swipe gestures** for next/previous (bonus feature)
- **Minimal scrolling** per question
- **Fast loading** (< 3 seconds on 3G)
- **Works offline** (once loaded)

---

## 9. Color Scheme

### Primary Colors:
- **Purple**: #667eea (Primary brand, headers)
- **Purple Dark**: #764ba2 (Gradients, emphasis)

### Department Colors:
- **CS**: Blue (#3b82f6)
- **SWE**: Green (#10b981)
- **IT**: Orange (#f59e0b)
- **IS**: Purple (#8b5cf6)
- **STAT**: Red (#ef4444)

### UI Colors:
- **Background**: White (#ffffff)
- **Text**: Dark Gray (#333333)
- **Border**: Light Gray (#e5e7eb)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#fbbf24)

---

## 10. Next Steps (Implementation Plan)

### Today (Theory & Design):
- ✅ Analyze what system should provide
- ✅ Create this design document
- ✅ Sketch UI layouts
- 📸 **Take photos of paper sketches and share with team**

### Tomorrow:
- Set up React + Tailwind project
- Create basic component structure
- Implement welcome page

### Day 3:
- Build question card component
- Add progress tracking
- Implement navigation

### Day 4-5:
- Create scoring logic
- Build results display
- Add animations

### Day 6-7:
- Polish UI/UX
- Test on mobile
- Get feedback from team

---

## 11. Success Metrics

How we'll know if it works:

- ✅ Students complete assessment (> 80% completion rate)
- ✅ Results make sense (validated by department heads)
- ✅ Students find it helpful (user feedback > 4/5)
- ✅ System works on all devices (tested on 3+ phones)
- ✅ Fast performance (< 2 second load times)
- ✅ Looks professional (positive first impressions)

---

## 12. Potential Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Students don't finish (dropout) | Make it engaging, show progress, save responses |
| Questions unclear | Test with real students, iterate based on feedback |
| Recommendations inaccurate | Get department head data, validate scoring weights |
| Doesn't work on old phones | Use simple CSS, optimize images, minimal JS |
| Students don't trust results | Show explanation, be transparent about methodology |

---

## Summary for Team Discussion

**What I'm proposing to build:**

A clean, mobile-friendly assessment system with:
- 20 well-designed questions (10-15 minutes)
- Clear progress tracking
- Top 3 department recommendations with scores
- Explanations for each recommendation
- Comparison tool
- Department information pages

**Technology:** React + Tailwind CSS  
**Timeline:** 7 days to working prototype  
**Design Philosophy:** Simple, clean, professional, mobile-first

**Ready for team feedback!** 🚀

---

**Questions for Team:**
1. Does this design make sense?
2. Any features missing?
3. Should we add language toggle (English/Amharic) now or later?
4. Who wants to work on which components?

