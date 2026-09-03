@echo off
REM CCI Department Guidance System - Quick Start Script
REM Simple batch file to start both servers

echo.
echo ========================================================
echo   CCI DEPARTMENT GUIDANCE SYSTEM
echo   Starting Full Stack Application...
echo ========================================================
echo.

REM Start backend in new window
echo Starting Backend Server (Port 3000)...
start "CCI Backend Server" cmd /k "cd backend && npm run dev"

REM Wait 2 seconds
timeout /t 2 /nobreak > nul

REM Start frontend in new window
echo Starting Frontend Server (Port 5173)...
start "CCI Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   SERVERS STARTED!
echo ========================================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Check the separate windows for server logs
echo Close this window after servers are running
echo.
pause
