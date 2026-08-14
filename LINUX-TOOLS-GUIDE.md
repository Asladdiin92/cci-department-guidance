# Essential Linux Tools for Department Choice Guidance System

**Complete Development Toolset for Building Professional Web Applications**

---

## 🎯 Quick Start Checklist

```bash
# Essential tools to install (copy-paste these commands)
sudo apt update
sudo apt install -y git curl wget build-essential

# Install Node.js (for React)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x

# Install VS Code (recommended editor)
sudo snap install code --classic
```

---

## 📚 Category 1: Development Environment

### 1. **Visual Studio Code** (Code Editor) ⭐⭐⭐⭐⭐

**Why:** Best code editor for React/JavaScript development

```bash
# Installation
sudo snap install code --classic

# Or via apt
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code
```

**Essential VS Code Extensions:**
```bash
code --install-extension dbaeumer.vscode-eslint          # JavaScript linting
code --install-extension esbenp.prettier-vscode          # Code formatting
code --install-extension bradlc.vscode-tailwindcss       # Tailwind CSS IntelliSense
code --install-extension dsznajder.es7-react-js-snippets # React snippets
code --install-extension formulahendry.auto-rename-tag   # Auto rename HTML tags
code --install-extension PKief.material-icon-theme       # Nice file icons
```

**Alternative Editors:**
- **Sublime Text:** `sudo snap install sublime-text --classic`
- **Atom:** `sudo snap install atom --classic`
- **Vim/Neovim:** `sudo apt install vim neovim` (for power users)

---

### 2. **Node.js & npm** (JavaScript Runtime) ⭐⭐⭐⭐⭐

**Why:** Required for React development

```bash
# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node --version
npm --version

# Update npm to latest
sudo npm install -g npm@latest
```

**Alternative: Using nvm (Node Version Manager)** - Recommended
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20        # Install Node.js 20
nvm use 20            # Use Node.js 20
nvm alias default 20  # Set as default
```

---

### 3. **Git** (Version Control) ⭐⭐⭐⭐⭐

**Why:** Track code changes, collaborate with team

```bash
# Install
sudo apt install git

# Configure (use your info)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Set VS Code as default editor
git config --global core.editor "code --wait"
```

**Essential Git Commands:**
```bash
# Initialize project
git init

# Create .gitignore
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore

# First commit
git add .
git commit -m "Initial commit"

# Connect to GitHub (if using)
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

**Git GUI Tools (Optional):**
```bash
# GitKraken (beautiful Git client)
wget https://release.gitkraken.com/linux/gitkraken-amd64.deb
sudo dpkg -i gitkraken-amd64.deb

# Or Gitg (lightweight)
sudo apt install gitg
```

---

## 🎨 Category 2: Design & UI Tools

### 4. **Figma** (UI/UX Design) ⭐⭐⭐⭐⭐

**Why:** Design mockups and prototypes before coding

```bash
# Figma runs in browser
# Go to: https://www.figma.com

# Or install desktop app
sudo snap install figma-linux
```

**Use Cases:**
- Create professional mockups
- Design color schemes
- Plan component layouts
- Share designs with team

**Alternative: Penpot (Open Source)**
```bash
# Web-based: https://penpot.app
# Self-hosted option available
```

---

### 5. **GIMP** (Image Editing) ⭐⭐⭐⭐

**Why:** Edit images, create logos, optimize graphics

```bash
sudo apt install gimp
```

**Use Cases:**
- Create department logos
- Resize/optimize images
- Create icons
- Edit screenshots

**Alternative: Inkscape (Vector Graphics)**
```bash
sudo apt install inkscape
```

---

### 6. **ImageMagick** (Batch Image Processing) ⭐⭐⭐

**Why:** Resize multiple images via command line

```bash
sudo apt install imagemagick

# Example: Resize all images
mogrify -resize 800x600 *.jpg

# Convert format
convert input.png output.jpg
```

---

## 💻 Category 3: Frontend Development Tools

### 7. **Create React App / Vite** (Project Scaffolding) ⭐⭐⭐⭐⭐

**Why:** Quickly set up React project with best practices

```bash
# Option 1: Vite (Faster, Modern) - RECOMMENDED
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Option 2: Create React App (Traditional)
npx create-react-app my-app
cd my-app
npm start
```

**Install Tailwind CSS:**
```bash
# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configure tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Add to index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

---

### 8. **Browser DevTools** ⭐⭐⭐⭐⭐

**Install Modern Browsers:**

```bash
# Google Chrome
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb

# Firefox (usually pre-installed)
sudo apt install firefox

# Brave (Privacy-focused)
sudo curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/brave-browser-archive-keyring.gpg] https://brave-browser-apt-release.s3.brave.com/ stable main"|sudo tee /etc/apt/sources.list.d/brave-browser-release.list
sudo apt update
sudo apt install brave-browser
```

**Essential Browser Extensions:**
- React Developer Tools
- Tailwind CSS IntelliSense
- JSON Viewer
- ColorZilla (color picker)

---

### 9. **Postman** (API Testing) ⭐⭐⭐⭐

**Why:** Test backend APIs when you build them

```bash
sudo snap install postman
```

**Alternative: Thunder Client** (VS Code extension)
```bash
code --install-extension rangav.vscode-thunder-client
```

---

## 🗄️ Category 4: Backend & Database Tools

### 10. **Node.js Backend Frameworks**

**Express.js** (Most popular)
```bash
# In your project
npm install express cors dotenv

# Create simple server
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API works!' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
EOF

# Run server
node server.js
```

---

### 11. **PostgreSQL** (Database) ⭐⭐⭐⭐⭐

**Why:** Reliable, powerful database for storing responses

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres psql
postgres=# CREATE DATABASE dept_guidance;
postgres=# CREATE USER your_user WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE dept_guidance TO your_user;
postgres=# \q

# Access database
psql -U your_user -d dept_guidance
```

**Alternative: MySQL**
```bash
sudo apt install mysql-server
sudo mysql_secure_installation
```

**SQLite (Lightweight, no setup)**
```bash
sudo apt install sqlite3
```

---

### 12. **DBeaver** (Database GUI) ⭐⭐⭐⭐

**Why:** Visual database management

```bash
sudo snap install dbeaver-ce
```

**Alternatives:**
- **pgAdmin** (PostgreSQL specific): `sudo apt install pgadmin4`
- **MySQL Workbench**: `sudo apt install mysql-workbench`

---

## 🔧 Category 5: Development Utilities

### 13. **Terminator** (Terminal Multiplexer) ⭐⭐⭐⭐

**Why:** Multiple terminal windows in one screen

```bash
sudo apt install terminator

# Split horizontally: Ctrl+Shift+O
# Split vertically: Ctrl+Shift+E
# Switch panes: Ctrl+Tab
```

**Alternative: Tmux**
```bash
sudo apt install tmux
```

---

### 14. **curl & wget** (Download Tools) ⭐⭐⭐⭐

**Why:** Test APIs, download files

```bash
sudo apt install curl wget

# Test API
curl http://localhost:5000/api/test

# Download file
wget https://example.com/file.zip
```

---

### 15. **jq** (JSON Processor) ⭐⭐⭐

**Why:** Parse and format JSON in terminal

```bash
sudo apt install jq

# Pretty print JSON
curl http://localhost:5000/api/data | jq .

# Extract specific field
echo '{"name":"John","age":30}' | jq '.name'
```

---

### 16. **htop** (System Monitor) ⭐⭐⭐⭐

**Why:** Monitor CPU, RAM, processes

```bash
sudo apt install htop

# Run
htop
```

---

## 📝 Category 6: Documentation & Collaboration

### 17. **Markdown Editors**

**Typora** (Beautiful Markdown editor)
```bash
# Add repository
wget -qO - https://typora.io/linux/public-key.asc | sudo apt-key add -
sudo add-apt-repository 'deb https://typora.io/linux ./'
sudo apt update
sudo apt install typora
```

**MarkText** (Free alternative)
```bash
wget https://github.com/marktext/marktext/releases/download/v0.17.1/marktext-x86_64.AppImage
chmod +x marktext-x86_64.AppImage
./marktext-x86_64.AppImage
```

---

### 18. **Draw.io** (Diagrams) ⭐⭐⭐⭐⭐

**Why:** Create UML diagrams, flowcharts, system architecture

```bash
sudo snap install drawio

# Or use web version
# https://app.diagrams.net/
```

**Use Cases:**
- Use case diagrams
- Class diagrams
- Sequence diagrams
- System architecture
- Database schemas

---

### 19. **LibreOffice** (Office Suite) ⭐⭐⭐⭐

**Why:** Write reports, create presentations

```bash
sudo apt install libreoffice

# Or just Writer for documents
sudo apt install libreoffice-writer
```

---

## 🚀 Category 7: Deployment & DevOps

### 20. **Docker** (Containerization) ⭐⭐⭐⭐

**Why:** Package app with all dependencies

```bash
# Install Docker
sudo apt install docker.io
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker

# Test
docker run hello-world
```

**Create Dockerfile for your app:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

### 21. **Nginx** (Web Server) ⭐⭐⭐⭐

**Why:** Serve production build

```bash
sudo apt install nginx

# Start service
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure for React app
sudo nano /etc/nginx/sites-available/dept-guidance

# Add configuration
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/dept-guidance/build;
    index index.html;
    
    location / {
        try_files $uri /index.html;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/dept-guidance /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### 22. **PM2** (Process Manager) ⭐⭐⭐⭐

**Why:** Keep Node.js server running

```bash
# Install globally
sudo npm install -g pm2

# Start app
pm2 start server.js

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit
```

---

## 🧪 Category 8: Testing & Quality

### 23. **ESLint** (Code Linting) ⭐⭐⭐⭐⭐

**Why:** Find and fix code errors

```bash
npm install --save-dev eslint

# Initialize
npx eslint --init

# Run
npx eslint src/
```

---

### 24. **Prettier** (Code Formatting) ⭐⭐⭐⭐⭐

**Why:** Consistent code style

```bash
npm install --save-dev prettier

# Create .prettierrc
echo '{"semi": true, "singleQuote": true, "tabWidth": 2}' > .prettierrc

# Format all files
npx prettier --write "src/**/*.{js,jsx,json,css}"
```

---

### 25. **Lighthouse** (Performance Testing) ⭐⭐⭐⭐

**Why:** Check performance, accessibility, SEO

```bash
# Install globally
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view

# Or use Chrome DevTools (built-in)
```

---

## 📊 Category 9: Analytics & Monitoring

### 26. **HTTPie** (Better curl) ⭐⭐⭐

**Why:** More readable API testing

```bash
sudo apt install httpie

# Usage
http GET http://localhost:5000/api/test
http POST http://localhost:5000/api/submit name="John" age=25
```

---

## 🎓 Complete Project Setup Script

**Save this as `setup-dev-environment.sh`:**

```bash
#!/bin/bash

echo "🚀 Setting up Department Choice Guidance System Development Environment"

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential tools
echo "🔧 Installing essential tools..."
sudo apt install -y git curl wget build-essential

# Install Node.js
echo "📦 Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install VS Code
echo "💻 Installing VS Code..."
sudo snap install code --classic

# Install VS Code extensions
echo "🔌 Installing VS Code extensions..."
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension dsznajder.es7-react-js-snippets

# Install Chrome
echo "🌐 Installing Google Chrome..."
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo dpkg -i google-chrome-stable_current_amd64.deb
rm google-chrome-stable_current_amd64.deb

# Install PostgreSQL
echo "🗄️  Installing PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Install utilities
echo "🛠️  Installing utilities..."
sudo apt install -y htop terminator jq

# Install DBeaver
echo "🗃️  Installing DBeaver..."
sudo snap install dbeaver-ce

# Install Postman
echo "📮 Installing Postman..."
sudo snap install postman

# Install PM2
echo "⚙️  Installing PM2..."
sudo npm install -g pm2

# Configure Git
echo "📝 Configuring Git..."
git config --global core.editor "code --wait"
git config --global init.defaultBranch main

echo "✅ Development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Git with your name: git config --global user.name 'Your Name'"
echo "2. Configure Git with your email: git config --global user.email 'your.email@example.com'"
echo "3. Create new React project: npm create vite@latest my-app -- --template react"
echo "4. Install Tailwind: cd my-app && npm install -D tailwindcss postcss autoprefixer"
echo ""
echo "Happy coding! 🎉"
```

**Make executable and run:**
```bash
chmod +x setup-dev-environment.sh
./setup-dev-environment.sh
```

---

## 🎯 Recommended Tool Stack for Your Project

### Minimal Setup (Get started quickly):
1. ✅ VS Code
2. ✅ Node.js + npm
3. ✅ Git
4. ✅ Chrome/Firefox
5. ✅ Vite (React setup)
6. ✅ Tailwind CSS

### Full Professional Setup:
1. ✅ VS Code + Extensions
2. ✅ Node.js + nvm
3. ✅ Git + GitKraken
4. ✅ Chrome + React DevTools
5. ✅ Vite + Tailwind CSS
6. ✅ PostgreSQL + DBeaver
7. ✅ Express.js (backend)
8. ✅ Postman (API testing)
9. ✅ ESLint + Prettier
10. ✅ Draw.io (diagrams)
11. ✅ Nginx (deployment)
12. ✅ PM2 (process management)

---

## 💡 Pro Tips

1. **Use nvm instead of system Node.js** - easier to switch versions
2. **Learn Git early** - save your work frequently
3. **Use ESLint + Prettier** - keeps code clean
4. **Chrome DevTools** - learn to use Console, Network, React tabs
5. **Terminal shortcuts** - Ctrl+Alt+T (new terminal), Ctrl+C (stop process)
6. **VS Code shortcuts** - Ctrl+P (find file), Ctrl+Shift+P (command palette)

---

## 📚 Learning Resources

- **React:** https://react.dev/learn
- **Tailwind:** https://tailwindcss.com/docs
- **Git:** https://learngitbranching.js.org/
- **Linux:** https://linuxjourney.com/
- **JavaScript:** https://javascript.info/

---

**Ready to build! 🚀**

Save this file and refer back whenever you need to install or configure tools.

