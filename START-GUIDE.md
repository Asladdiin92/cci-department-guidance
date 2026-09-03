# 🚀 Quick Start Guide

## Start Full Stack Application (3 Methods)

### Method 1: Using npm (Recommended)
```bash
npm run dev
```
- Runs both servers in **one terminal window**
- Backend and Frontend logs in the same window
- Color-coded output (green for backend, blue for frontend)
- Press `Ctrl+C` to stop both servers

### Method 2: Using PowerShell Script
```powershell
.\start.ps1
```
- Opens **two separate windows** (backend + frontend)
- Each server has its own window with logs
- Close each window to stop that server
- More control over individual servers

### Method 3: Using Batch File
```batch
start.bat
```
- Similar to PowerShell but simpler
- Opens two CMD windows
- Good for quick testing

---

## 📋 What Each Method Does

| Method | Windows | Logs | Best For |
|--------|---------|------|----------|
| `npm run dev` | 1 terminal | Combined | Development (single view) |
| `start.ps1` | 2 PowerShell | Separate | Debugging (isolated logs) |
| `start.bat` | 2 CMD | Separate | Quick launch |

---

## 🌐 Access URLs

Once started, you can access:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **API Docs:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/api/health

---

## 📦 First Time Setup

If this is your first time running the project:

```bash
# Install all dependencies (root, backend, frontend)
npm run install:all

# Then start the servers
npm run dev
```

---

## ⚙️ Environment Configuration

Make sure you have:

1. **Backend `.env` file** in `backend/` folder
   - Copy from `backend/.env.example`
   - Add your Supabase credentials

2. **Frontend `.env` file** in `frontend/` folder (optional)
   - Set `VITE_API_URL` if needed
   - Defaults to `http://localhost:3000/api`

---

## 🛑 Stopping Servers

### Method 1 (npm):
- Press `Ctrl+C` in the terminal

### Method 2 & 3 (Scripts):
- Close each server window
- Or press `Ctrl+C` in each window

---

## 🐛 Troubleshooting

### Port Already in Use
If you see "Port 3000 (or 5173) already in use":

**Windows:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F
```

### Dependencies Not Installed
```bash
npm run install:all
```

### Backend Won't Start
- Check `backend/.env` file exists
- Verify Supabase credentials
- Check Node.js version (need 16+)

### Frontend Won't Start
- Check if port 5173 is free
- Try `cd frontend && npm install`
- Clear cache: `cd frontend && npm run build`

---

## 📝 Available Scripts

```bash
npm run dev              # Start both servers
npm run dev:backend      # Start backend only
npm run dev:frontend     # Start frontend only
npm run start            # Alias for dev
npm run build            # Build frontend for production
npm run install:all      # Install all dependencies
```

---

## 🎯 Development Workflow

1. **Start servers:** `npm run dev`
2. **Open browser:** http://localhost:5173
3. **Make changes** to code
4. **Servers auto-reload** (hot reload)
5. **Test changes** in browser
6. **Stop servers:** `Ctrl+C`

---

## 💡 Tips

- Backend uses **nodemon** - auto-restarts on code changes
- Frontend uses **Vite** - instant hot module replacement
- Both servers support hot reload during development
- Check terminal/window logs for errors
- Backend logs show all API requests
- Frontend logs show Vite build info

---

Happy coding! 🎉
