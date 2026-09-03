# CCI Department Guidance System - Full Stack Startup Script
# Run both frontend and backend servers with one command
# Author: Asladin Abdukedir
# Date: September 3, 2026

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🎓 CCI DEPARTMENT GUIDANCE SYSTEM" -ForegroundColor Green
Write-Host "  🚀 Starting Full Stack Application..." -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Get the project root directory
$projectRoot = $PSScriptRoot

# Check if Node.js is installed
Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host ""

# Check if backend dependencies are installed
Write-Host "📦 Checking backend dependencies..." -ForegroundColor Yellow
if (-Not (Test-Path "$projectRoot\backend\node_modules")) {
    Write-Host "⚠️  Backend dependencies not found. Installing..." -ForegroundColor Yellow
    Set-Location "$projectRoot\backend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Backend dependency installation failed!" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Backend dependencies found" -ForegroundColor Green
}

# Check if frontend dependencies are installed
Write-Host "📦 Checking frontend dependencies..." -ForegroundColor Yellow
if (-Not (Test-Path "$projectRoot\frontend\node_modules")) {
    Write-Host "⚠️  Frontend dependencies not found. Installing..." -ForegroundColor Yellow
    Set-Location "$projectRoot\frontend"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Frontend dependency installation failed!" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Frontend dependencies found" -ForegroundColor Green
}

Write-Host ""

# Check if backend .env file exists
Write-Host "🔐 Checking backend configuration..." -ForegroundColor Yellow
if (-Not (Test-Path "$projectRoot\backend\.env")) {
    Write-Host "❌ Backend .env file not found!" -ForegroundColor Red
    Write-Host "   Please create backend\.env file with your Supabase credentials" -ForegroundColor Yellow
    Write-Host "   See backend\.env.example for template" -ForegroundColor Yellow
    pause
    exit 1
} else {
    Write-Host "✅ Backend .env file found" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🚀 STARTING SERVERS..." -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Start backend server in new window
Write-Host "🖥️  Starting Backend Server (Port 3000)..." -ForegroundColor Cyan
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; Write-Host '🔧 Backend Server Starting...' -ForegroundColor Green; Write-Host ''; npm run dev" -PassThru -WindowStyle Normal

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start frontend server in new window
Write-Host "🖥️  Starting Frontend Server (Port 5173)..." -ForegroundColor Cyan
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\frontend'; Write-Host '🎨 Frontend Server Starting...' -ForegroundColor Blue; Write-Host ''; npm run dev" -PassThru -WindowStyle Normal

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✅ SERVERS STARTED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Backend:  " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:3000" -ForegroundColor White
Write-Host "📍 Frontend: " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "📚 API Docs:       " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:3000/api" -ForegroundColor White
Write-Host "🏥 Health Check:   " -NoNewline -ForegroundColor Yellow
Write-Host "http://localhost:3000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 TIPS:" -ForegroundColor Yellow
Write-Host "   • Frontend will open in your browser automatically" -ForegroundColor Gray
Write-Host "   • Backend and Frontend are running in separate windows" -ForegroundColor Gray
Write-Host "   • Close those windows to stop the servers" -ForegroundColor Gray
Write-Host "   • Or press Ctrl+C in each window" -ForegroundColor Gray
Write-Host ""
Write-Host "📝 Logs are visible in each server window" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to close this launcher window..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Keep track of processes for cleanup
Write-Host ""
Write-Host "✅ Launcher closed. Servers are still running." -ForegroundColor Green
Write-Host "   Backend PID: $($backendProcess.Id)" -ForegroundColor Gray
Write-Host "   Frontend PID: $($frontendProcess.Id)" -ForegroundColor Gray
Write-Host ""
