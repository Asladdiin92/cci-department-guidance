# Project Structure

## CCI Department Choice Guidance System - File Organization

```
department-choice-system/
│
├── public/                          # Public HTML pages
│   ├── index.html                   # Main assessment application
│   └── dashboard.html               # Admin dashboard
│
├── src/                             # Source files
│   ├── css/                         # Stylesheets
│   │   ├── styles.css              # Main app styles
│   │   └── dashboard.css           # Dashboard styles
│   │
│   ├── js/                          # JavaScript files
│   │   ├── app.js                  # Main application logic
│   │   └── dashboard.js            # Dashboard logic
│   │
│   └── data/                        # Data files
│       └── questions.js            # Question bank & department data
│
├── assets/                          # Static assets
│   ├── images/                     # Images (future)
│   └── icons/                      # Icons (future)
│
├── docs/                            # Documentation
│   ├── ASSESSMENT-STRATEGY.md      # 20-question strategy
│   ├── requirements.md             # System requirements
│   ├── SYSTEM-DESIGN-ANALYSIS.md   # System architecture
│   ├── UI-MOCKUPS.md              # UI designs
│   ├── TEAM-SHARE.md              # Team breakdown
│   ├── GITHUB-PUSH-GUIDE.md       # Git workflow
│   ├── LINUX-TOOLS-GUIDE.md       # Development tools
│   └── [9 more documentation files]
│
├── screenshots/                     # Application screenshots
│   └── welcome-screen.png
│
├── .gitignore                      # Git ignore rules
├── README.md                       # Main project README
└── PROJECT-STRUCTURE.md            # This file

```

---

## File Purposes

### Public Pages

| File | Purpose | Access |
|------|---------|--------|
| `public/index.html` | Main assessment application | Students |
| `public/dashboard.html` | Admin analytics dashboard | Administrators |

### Source Files

#### CSS (Stylesheets)
- `src/css/styles.css` - Main application styling (purple gradient theme)
- `src/css/dashboard.css` - Dashboard styling (sidebar layout)

#### JavaScript
- `src/js/app.js` - Core assessment logic (questions, scoring, results)
- `src/js/dashboard.js` - Dashboard functionality (charts, analytics)

#### Data
- `src/data/questions.js` - All 20 questions + department information

---

## How to Run

### Student Assessment App
```bash
# Open in browser
open public/index.html
# or
start public/index.html
```

### Admin Dashboard
```bash
# Open in browser
open public/dashboard.html
# or
start public/dashboard.html
```

---

## Development Workflow

### Adding New Features

1. **New Page:** Add to `public/`
2. **New Styles:** Add to `src/css/`
3. **New Logic:** Add to `src/js/`
4. **New Data:** Add to `src/data/`

### File Naming Convention

- **HTML:** `kebab-case.html` (e.g., `department-detail.html`)
- **CSS:** `kebab-case.css` (e.g., `mobile-styles.css`)
- **JS:** `camelCase.js` (e.g., `assessmentFlow.js`)
- **Data:** `camelCase.js` (e.g., `departmentData.js`)

---

## Future Structure (When Backend Added)

```
department-choice-system/
├── client/                    # Frontend (current public + src)
├── server/                    # Backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
├── database/                  # Database scripts
│   ├── migrations/
│   └── seeds/
└── tests/                     # Test files
    ├── unit/
    └── integration/
```

---

## Benefits of This Structure

✅ **Clear Separation** - Public files vs source files  
✅ **Easy to Navigate** - Similar files grouped together  
✅ **Scalable** - Easy to add new features  
✅ **Professional** - Industry-standard organization  
✅ **Team-Friendly** - Clear where to find things  
✅ **Build-Ready** - Easy to add build tools later

---

## Notes

- All paths are relative (works on any system)
- Git history preserved (used `git mv`)
- Screenshots folder separate (asset, not source)
- Docs folder separate (documentation, not code)

---

**Last Updated:** August 16, 2026  
**Author:** Asladin Abdukedir

