# Complete Guide: Push Your Project to GitHub from Kiro/VS Code

**Step-by-step instructions to get your code on GitHub**

---

## 📋 Prerequisites

Before starting, you need:
- ✅ A GitHub account (if you don't have one, create at https://github.com/signup)
- ✅ Git installed on your system
- ✅ Your project folder ready

---

## 🚀 Method 1: Using Kiro's Built-in Git Interface (Easiest)

### Step 1: Check if Git is Installed

Open terminal in Kiro (Ctrl+` or View → Terminal):

```bash
git --version
```

If you see a version number (e.g., `git version 2.x.x`), you're good!

If not, install Git:
```bash
# Windows (if using Git Bash or WSL)
# Download from: https://git-scm.com/download/win

# Linux
sudo apt install git

# Verify
git --version
```

---

### Step 2: Configure Git (First Time Only)

In the terminal:

```bash
# Set your name (use your real name)
git config --global user.name "Your Name"

# Set your email (MUST match your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --global --list
```

---

### Step 3: Initialize Git in Your Project

```bash
# Navigate to your project folder
cd "c:\Users\hp\Desktop\internship\department-choice-system"

# Initialize Git repository
git init

# You should see: "Initialized empty Git repository in..."
```

---

### Step 4: Create .gitignore File

**Important:** Tell Git which files to ignore

```bash
# Create .gitignore file
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json

# Environment variables
.env
.env.local

# Build outputs
build/
dist/
.next/

# IDE
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Temporary files
*.tmp
*.swp
EOF
```

Or manually create `.gitignore` in Kiro:
1. Right-click in Explorer → New File
2. Name it `.gitignore`
3. Add the content above

---

### Step 5: Stage Your Files

In terminal:

```bash
# Add all files to staging
git add .

# Or add specific files
git add index.html styles.css questions.js

# Check what's staged
git status
```

You should see files listed in green (ready to commit).

---

### Step 6: Make Your First Commit

```bash
# Commit with a message
git commit -m "Initial commit: Department Choice Guidance System"

# Verify commit
git log
```

---

### Step 7: Create Repository on GitHub

**Go to GitHub in browser:**

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name:** `cci-department-guidance` (or your preferred name)
   - **Description:** "Department Choice Guidance System for Haramaya University CCI"
   - **Visibility:** Choose Public or Private
   - **DO NOT** check "Add a README file" (we already have files)
   - **DO NOT** add .gitignore or license yet
4. Click **"Create repository"**

---

### Step 8: Connect Local Repository to GitHub

After creating the repository, GitHub shows you commands. Copy the HTTPS URL (looks like: `https://github.com/username/cci-department-guidance.git`)

In your terminal:

```bash
# Add remote repository (replace with YOUR URL)
git remote add origin https://github.com/YOUR-USERNAME/cci-department-guidance.git

# Verify remote
git remote -v
```

---

### Step 9: Push to GitHub

```bash
# Push to GitHub (first time)
git push -u origin main

# If you get an error about "master" vs "main", rename branch:
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

---

### Step 10: Create Personal Access Token (If Needed)

If Git asks for password, you need a token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note:** "Kiro Git Access"
   - **Expiration:** 90 days (or your preference)
   - **Scopes:** Check `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **COPY THE TOKEN** (you won't see it again!)
6. Use this token as your password when Git asks

**Save your token somewhere safe!**

---

### Step 11: Verify Upload

1. Go to your GitHub repository in browser: `https://github.com/YOUR-USERNAME/cci-department-guidance`
2. You should see all your files!
3. ✅ Success!

---

## 🎯 Method 2: Using Kiro's Source Control Panel (Visual Way)

### Step 1: Open Source Control

1. Click the **Source Control icon** in left sidebar (looks like branch/fork symbol)
2. Or press: **Ctrl+Shift+G**

---

### Step 2: Initialize Repository

If not already initialized:
1. Click **"Initialize Repository"** button
2. Select your project folder

---

### Step 3: Stage and Commit

1. You'll see list of changed files
2. Hover over files → Click **"+"** icon to stage them
3. Or click **"+"** next to "Changes" to stage all
4. Enter commit message in text box at top
5. Click **✓ Commit** button (or Ctrl+Enter)

---

### Step 4: Publish to GitHub

1. Click **"Publish to GitHub"** button at bottom
2. Choose:
   - Repository name
   - Public or Private
3. Click **"Publish"**
4. Kiro handles the rest automatically!

---

## 🔄 Daily Workflow: After Initial Setup

### Making Changes and Pushing

```bash
# 1. Make changes to your files (code, edit, etc.)

# 2. Check what changed
git status

# 3. Stage changes
git add .
# Or stage specific file
git add index.html

# 4. Commit with message
git commit -m "Add welcome screen with Tailwind styling"

# 5. Push to GitHub
git push

# Done! Changes are on GitHub
```

---

### Using Kiro Source Control Panel

1. Make changes to files
2. Open Source Control (Ctrl+Shift+G)
3. Changed files appear automatically
4. Stage files (click "+")
5. Write commit message
6. Click ✓ Commit
7. Click **"..."** menu → **"Push"**

---

## 🛠️ Common Git Commands Reference

```bash
# Check status
git status

# Stage files
git add filename.js        # Specific file
git add .                  # All files

# Commit
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes (if working with team)
git pull

# See commit history
git log
git log --oneline          # Compact view

# See changes
git diff                   # Unstaged changes
git diff --staged          # Staged changes

# Undo changes (careful!)
git checkout filename.js   # Discard changes in file
git reset HEAD filename.js # Unstage file

# Create new branch
git branch feature-name
git checkout feature-name
# Or combined:
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git checkout main
git merge feature-name

# See branches
git branch
git branch -a              # Including remote
```

---

## 👥 Collaborating with Team

### Clone Repository (Team Members)

```bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/cci-department-guidance.git

# Enter directory
cd cci-department-guidance

# Install dependencies (if Node.js project)
npm install

# Start working!
```

---

### Branching Strategy for Team

```bash
# Each team member creates their own branch
git checkout -b yourname-feature

# Example:
git checkout -b nuri-questionnaire
git checkout -b arafat-backend
git checkout -b burqa-ui-design

# Work on your branch, commit changes
git add .
git commit -m "Implement questionnaire component"
git push -u origin yourname-feature

# When ready, create Pull Request on GitHub
# Then team lead merges to main branch
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "fatal: not a git repository"

**Solution:**
```bash
git init
```

---

### Issue 2: "remote origin already exists"

**Solution:**
```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR-USERNAME/repo.git
```

---

### Issue 3: "refusing to merge unrelated histories"

**Solution:**
```bash
git pull origin main --allow-unrelated-histories
```

---

### Issue 4: "Your branch is ahead/behind"

**Solution:**
```bash
# Pull first, then push
git pull
git push
```

---

### Issue 5: Authentication Failed

**Solution:**
- Use Personal Access Token instead of password
- Or set up SSH keys (see below)

---

## 🔐 Advanced: Using SSH Keys (Optional but Recommended)

### Generate SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Press Enter for default location
# Press Enter for no passphrase (or set one)

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

### Add to GitHub

1. Go to: https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: "Kiro Laptop"
4. Paste your public key
5. Click **"Add SSH key"**

### Use SSH Remote

```bash
# Remove HTTPS remote
git remote remove origin

# Add SSH remote
git remote add origin git@github.com:YOUR-USERNAME/cci-department-guidance.git

# Push (no password needed!)
git push -u origin main
```

---

## 📊 Viewing Your Repository

**GitHub Repository URL:**
```
https://github.com/YOUR-USERNAME/cci-department-guidance
```

**Features to explore:**
- **Code** tab: View files
- **Commits** tab: See history
- **Branches**: View all branches
- **Settings**: Configure repository
- **Insights**: View statistics
- **Issues**: Track bugs/features
- **Wiki**: Add documentation

---

## 🎯 Quick Start Summary

**First Time Setup:**
```bash
cd your-project-folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

**Daily Updates:**
```bash
git add .
git commit -m "Description of changes"
git push
```

**That's it!** 🎉

---

## 📝 .gitignore Template for Your Project

Create `.gitignore` file:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json

# Production build
/build
/dist
/.next
/out

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log

# Testing
coverage/
.nyc_output/

# Temporary files
*.tmp
temp/
tmp/

# Database
*.sqlite
*.sqlite3
*.db

# Certificates
*.pem
*.key
*.cert
```

---

## 🚀 Next Steps After Pushing

1. ✅ Share repository link with your team
2. ✅ Add README.md file describing your project
3. ✅ Enable GitHub Pages (if deploying frontend)
4. ✅ Set up GitHub Actions (CI/CD) - optional
5. ✅ Add LICENSE file
6. ✅ Invite team members as collaborators

---

## 💡 Pro Tips

1. **Commit often** - Small, frequent commits are better than large ones
2. **Write clear commit messages** - "Fix bug in questionnaire" not "fix stuff"
3. **Pull before push** - Always pull latest changes before pushing yours
4. **Use branches** - Don't work directly on main branch
5. **Review before commit** - Check `git status` and `git diff`
6. **Backup token** - Save your GitHub Personal Access Token safely

---

## 🎓 Learning Resources

- **GitHub Guides**: https://guides.github.com/
- **Git Tutorial**: https://www.atlassian.com/git/tutorials
- **Interactive Git**: https://learngitbranching.js.org/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## ✅ Checklist for First Push

- [ ] Git installed and configured
- [ ] GitHub account created
- [ ] Project initialized with `git init`
- [ ] .gitignore file created
- [ ] Files staged with `git add .`
- [ ] First commit made
- [ ] Repository created on GitHub
- [ ] Remote origin added
- [ ] Code pushed to GitHub
- [ ] Verified files appear on GitHub website

---

**You're all set! Happy coding! 🎉**


