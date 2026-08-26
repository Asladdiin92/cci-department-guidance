# Professional Project Directory Structure

## Current Issues Identified

1. **Root directory clutter**: LaTeX build artifacts (`.aux`, `.log`, `.pdf`, `.toc`) in root
2. **Mixed concerns**: Documentation, guidelines, and code files at same level
3. **Unclear naming**: Multiple documentation files without clear hierarchy
4. **Build artifacts**: Compiled files mixed with source files

---

## Recommended Professional Structure

```
department-choice-system/
├── .github/                          # GitHub workflows and CI/CD
│   └── workflows/
│       ├── node.js.yml
│       └── summary.yml
│
├── .kiro/                            # Kiro IDE configuration
│
├── assets/                           # Static assets (organized by type)
│   ├── icons/                        # Department icons
│   │   ├── computer-science-icon.png
│   │   ├── information-science-icon.png
│   │   ├── information-system-icon.png
│   │   ├── information-technology-icon.png
│   │   ├── software-engineering-icon.png
│   │   └── statistics-icon.png
│   ├── images/                       # UI images, backgrounds
│   │   ├── hero-bg.jpg
│   │   ├── department-bg.jpg
│   │   ├── cci-logo.png
│   │   └── svgs/
│   │       ├── arrow-right.svg
│   │       ├── checkmark.svg
│   │       ├── download.svg
│   │       ├── print.svg
│   │       └── share.svg
│   └── fonts/                        # (if any custom fonts)
│
├── docs/                             # All documentation (organized by purpose)
│   ├── internship/                   # Internship report materials
│   │   ├── complete-internship-report.tex
│   │   ├── complete-internship-report.pdf
│   │   ├── cci-logo.png
│   │   ├── compile.bat
│   │   ├── Industrial Practice Report Guideline.md
│   │   └── build/                    # LaTeX build artifacts
│   │       ├── *.aux
│   │       ├── *.log
│   │       ├── *.toc
│   │       ├── *.lot
│   │       ├── *.lof
│   │       └── *.out
│   │
│   ├── project-proposal/             # Initial project proposal
│   │   ├── project-proposal-latex.tex
│   │   ├── project-proposal-latex.pdf
│   │   ├── CCI-Department-recommener-Proposal.docx
│   │   └── build/
│   │
│   ├── requirements/                 # Requirements documentation
│   │   ├── requirements.md
│   │   ├── functional-requirements.md
│   │   ├── ASSESSMENT-STRATEGY.md
│   │   └── form-analysis-and-improvements.md
│   │
│   ├── design/                       # System design documentation
│   │   ├── SYSTEM-DESIGN-ANALYSIS.md
│   │   ├── UI-MOCKUPS.md
│   │   └── architecture-diagrams/
│   │
│   ├── cci-departments/              # CCI department information
│   │   ├── about.html
│   │   ├── computer-science.md
│   │   ├── information-science.md
│   │   ├── information-system.md
│   │   ├── information-technology.md
│   │   ├── software-engineering.md
│   │   ├── statistics.md
│   │   └── department-pages/
│   │       ├── department-of-computer-science.html
│   │       ├── department-of-information-science.html
│   │       ├── department-of-information-system.html
│   │       ├── department-of-information-technology.html
│   │       ├── department-of-software-engineering.html
│   │       └── department-of-statistics.html
│   │
│   ├── research/                     # Research and references
│   │   ├── haramaya-source-excerpts.md
│   │   ├── department-head-interview-guide.md
│   │   └── department-head-outreach.md
│   │
│   └── guides/                       # Development guides
│       ├── QUICK-START-GUIDE.md
│       ├── GITHUB-PUSH-GUIDE.md
│       ├── LINUX-TOOLS-GUIDE.md
│       └── TEAM-SHARE.md
│
├── public/                           # Public files served by Electron
│   ├── index.html                    # Main HTML entry point
│   └── (other public files)
│
├── src/                              # Source code (organized by feature/layer)
│   ├── main/                         # Electron main process
│   │   ├── main.js                   # Main process entry
│   │   ├── preload.js                # Preload scripts
│   │   └── ipc/                      # IPC handlers
│   │
│   ├── renderer/                     # Electron renderer process (frontend)
│   │   ├── js/                       # JavaScript modules
│   │   │   ├── assessment.js
│   │   │   ├── results.js
│   │   │   ├── comparison.js
│   │   │   └── utils.js
│   │   │
│   │   ├── css/                      # Stylesheets
│   │   │   ├── main.css
│   │   │   ├── assessment.css
│   │   │   ├── results.css
│   │   │   └── variables.css
│   │   │
│   │   ├── components/               # Reusable UI components
│   │   │   ├── header.js
│   │   │   ├── footer.js
│   │   │   └── department-card.js
│   │   │
│   │   └── pages/                    # Page-specific code
│   │       ├── assessment.html
│   │       ├── results.html
│   │       └── comparison.html
│   │
│   ├── data/                         # Static data and configurations
│   │   ├── departments.json
│   │   ├── questions.json
│   │   └── curriculum.json
│   │
│   └── utils/                        # Utility functions
│       ├── scoring.js
│       ├── recommendation.js
│       └── storage.js
│
├── screenshots/                      # Application screenshots (for README)
│   ├── home-screen.png
│   ├── assessment-screen.png
│   └── results-screen.png
│
├── tests/                            # Test files (if implemented)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── build/                            # Build output (Electron packaged apps)
│   ├── win-unpacked/
│   ├── linux-unpacked/
│   └── mac-unpacked/
│
├── .gitignore                        # Git ignore patterns
├── .editorconfig                     # Editor configuration
├── package.json                      # NPM dependencies and scripts
├── package-lock.json                 # Locked dependencies
├── README.md                         # Project overview and setup
├── CHANGELOG.md                      # Version history
├── LICENSE                           # License information
├── NEXT-STEPS-ROADMAP.md            # Development roadmap
└── CURRICULUM-IMPLEMENTATION-SUMMARY.md  # Implementation summary

```

---

## Key Improvements

### 1. **Documentation Organization**
- **Internship materials** separated from development docs
- **Build artifacts** contained in `build/` subdirectories
- **Purpose-based folders**: requirements, design, research, guides

### 2. **Source Code Structure**
- **Electron-specific organization**: `main/` and `renderer/` separation
- **Feature-based modules**: Clear separation of concerns
- **Reusable components**: Organized component library

### 3. **Assets Management**
- **Type-based organization**: icons, images, fonts separated
- **SVG organization**: All vectors in dedicated subfolder

### 4. **Build Artifacts Separation**
- LaTeX build files isolated in `docs/*/build/` folders
- Electron build output in dedicated `build/` directory
- No compiled files in root or source directories

### 5. **Clear Naming Conventions**
- Descriptive folder names
- Consistent file naming (kebab-case for files, camelCase for JS)
- Clear hierarchy and purpose

---

## Migration Plan

### Phase 1: Create New Structure (Safe - No Deletions)
1. Create new directory structure
2. Copy files to new locations
3. Update import paths in code
4. Test functionality

### Phase 2: Update Configuration
1. Update `package.json` main entry point
2. Update `.gitignore` for new structure
3. Update build scripts and paths

### Phase 3: Cleanup (After Verification)
1. Remove old file locations
2. Clean up root directory
3. Archive old structure (optional backup)

---

## Files to Move Immediately

### Root → docs/internship/
- `complete internship report.tex`
- `complete internship report.pdf`
- `complete internship report.aux`
- `complete internship report.log`
- `complete internship report.toc`
- `complete internship report.lot`
- `complete internship report.lof`
- `complete internship report.out`
- `Industrial Practice Report Guideline (Software Development).md`

### Root → src/main/
- `main.js`

### Root → public/
- `index.html`

### docs/ → Reorganize into subfolders as shown above

---

## Benefits of This Structure

✅ **Maintainability**: Easy to find files and understand project organization  
✅ **Scalability**: Clear places for new features and documentation  
✅ **Professional**: Industry-standard structure recognized by developers  
✅ **Clean Root**: Minimal files in root directory  
✅ **Separation of Concerns**: Code, docs, and assets clearly separated  
✅ **Build Management**: Clean separation of source and build artifacts  
✅ **Team Collaboration**: Clear structure helps onboarding new developers  
✅ **Version Control**: Easier to manage .gitignore and track changes  

---

## Updated .gitignore Recommendations

```gitignore
# Node modules
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build artifacts
build/
dist/
*.exe
*.dmg
*.AppImage

# LaTeX build artifacts
docs/**/build/
**/*.aux
**/*.log
**/*.out
**/*.toc
**/*.lot
**/*.lof
**/*.synctex(busy)
**/*.fdb_latexmk
**/*.fls

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Electron
out/
```

---

## Next Steps

1. Review this structure and approve changes
2. Run migration script (I can create this)
3. Update package.json and config files
4. Test the application
5. Update documentation paths
6. Commit restructured project

Would you like me to execute this restructuring for you?
