# CCI Department Guidance System - Deployment Guide

**Version:** 1.0  
**Date:** September 3, 2026  
**Status:** Production Ready

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Backend Deployment (Railway/Render)](#backend-deployment)
4. [Frontend Deployment (Vercel)](#frontend-deployment)
5. [Database Setup (Supabase)](#database-setup)
6. [CORS Configuration](#cors-configuration)
7. [Testing Production](#testing-production)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Prerequisites

### Required Accounts
- ✅ GitHub account (already set up)
- ⏳ Railway or Render account (backend hosting)
- ✅ Vercel account (frontend hosting - already set up)
- ✅ Supabase account (database - already set up)

### Required Access
- ✅ GitHub repository: https://github.com/Asladdiin92/cci-department-guidance
- ✅ Supabase project: dztzjfqipllddyrrfcze
- ✅ Environment variables (.env file)

---

## 🔑 Environment Variables

### Backend Environment Variables

**For Railway/Render Dashboard:**

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=https://dztzjfqipllddyrrfcze.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dHpqZnFpcGxsZGR5cnJmY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwOTUxNjksImV4cCI6MjEwMzY3MTE2OX0.3MRHhwg-QnNGDGgrIAHiruyvLda8G08Xhp4mOFqmERc
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dHpqZnFpcGxsZGR5cnJmY3plIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODA5NTE2OSwiZXhwIjoyMTAzNjcxMTY5fQ.A1ucJzlXlayszPINuaqNi_TAZv9aYBvtNOdvmiVAXwA

# CORS Configuration (Production URL only - localhost auto-added in dev)
CORS_ORIGIN=https://cci-department-guidance.vercel.app

# JWT Configuration
JWT_SECRET=cci_haramaya_super_secure_key_2026
JWT_EXPIRES_IN=7d

# Security
BCRYPT_ROUNDS=10

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info

# API Configuration
API_VERSION=v1
API_PREFIX=/api
```

### Frontend Environment Variables

**For Vercel Dashboard:**

```bash
# API Configuration
VITE_API_URL=https://your-backend-url.railway.app/api
# Or: VITE_API_URL=https://your-backend-url.onrender.com/api

# Optional: Environment identifier
VITE_ENV=production
```

---

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Verify your email

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose: `Asladdiin92/cci-department-guidance`
4. Railway will detect the Node.js project

#### Step 3: Configure Build Settings
1. **Root Directory:** `backend`
2. **Build Command:** `npm install`
3. **Start Command:** `node src/server.js`
4. **Port:** Railway auto-detects from `process.env.PORT`

#### Step 4: Add Environment Variables
1. Go to your project dashboard
2. Click "Variables" tab
3. Add all backend environment variables (from section above)
4. Click "Deploy"

#### Step 5: Get Production URL
1. Once deployed, go to "Settings" tab
2. Click "Generate Domain"
3. Copy the URL (e.g., `https://cci-backend.railway.app`)
4. **SAVE THIS URL** - you'll need it for frontend

#### Step 6: Enable Custom Domain (Optional)
1. Go to "Settings" > "Custom Domain"
2. Add your domain (e.g., `api.cci-guidance.com`)
3. Configure DNS records as instructed

---

### Option 2: Render

#### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Verify your email

#### Step 2: Create New Web Service
1. Click "New +" > "Web Service"
2. Connect your GitHub repository
3. Select: `Asladdiin92/cci-department-guidance`

#### Step 3: Configure Service
```
Name: cci-backend
Region: Frankfurt (EU Central)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node src/server.js
Instance Type: Free (or Starter)
```

#### Step 4: Add Environment Variables
1. Scroll to "Environment Variables"
2. Add all backend variables (from section above)
3. Click "Create Web Service"

#### Step 5: Get Production URL
1. Once deployed, copy the URL (e.g., `https://cci-backend.onrender.com`)
2. **SAVE THIS URL** - you'll need it for frontend

---

## 🌐 Frontend Deployment

### Step 1: Update Frontend Configuration

**Update `.env` in `frontend/` folder:**
```bash
VITE_API_URL=https://YOUR-BACKEND-URL/api
```

Replace `YOUR-BACKEND-URL` with your Railway or Render URL from above.

### Step 2: Commit Changes
```bash
cd frontend
# Update .env file
git add .env
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Vercel Deployment

#### Option A: Wait for Rate Limit Reset
- Vercel auto-deploys on push once rate limit resets (24 hours)
- Check status at https://vercel.com/dashboard

#### Option B: Manual Redeploy
1. Go to https://vercel.com/dashboard
2. Select your project: `cci-department-guidance`
3. Go to "Deployments" tab
4. Click "Redeploy" on latest deployment
5. Select "Use existing build cache: No"
6. Click "Redeploy"

#### Option C: Upgrade Vercel Plan
1. Go to https://vercel.com/account/billing
2. Upgrade to "Pro" plan ($20/month)
3. Get unlimited deployments

### Step 4: Configure Environment Variables in Vercel
1. Go to project settings
2. Click "Environment Variables"
3. Add:
   - `VITE_API_URL` = `https://YOUR-BACKEND-URL/api`
4. Select: Production, Preview, Development
5. Click "Save"

---

## 🗄️ Database Setup

### Supabase Configuration (Already Done ✅)

Your Supabase database is already configured and production-ready:

- ✅ Project ID: `dztzjfqipllddyrrfcze`
- ✅ Region: EU Central (Frankfurt)
- ✅ 8 tables created
- ✅ RLS disabled for system tables
- ✅ Permissions granted to anon/service_role

### Remaining Database Tasks

#### 1. Seed Production Data
Run these SQL commands in Supabase SQL Editor:

**Seed Departments:**
```sql
-- (Insert your 6 departments with full info)
-- See backend/database/seeds/departments.sql
```

**Seed Questions:**
```sql
-- (Insert your 20 questions)
-- See backend/database/seeds/questions.sql
```

**Seed Question Options:**
```sql
-- (Insert your 80 options with department scores)
-- See backend/database/seeds/question_options.sql
```

#### 2. Verify Data
```sql
-- Check counts
SELECT 'departments' as table_name, COUNT(*) as count FROM departments
UNION ALL
SELECT 'questions', COUNT(*) FROM questions
UNION ALL
SELECT 'question_options', COUNT(*) FROM question_options;

-- Should return:
-- departments: 6
-- questions: 20
-- question_options: 80
```

---

## 🔐 CORS Configuration

### How It Works

**Production Mode (`NODE_ENV=production`):**
- ✅ Only URLs in `CORS_ORIGIN` environment variable are allowed
- ❌ Localhost URLs are **BLOCKED** (security best practice)
- ✅ Example: `CORS_ORIGIN=https://cci-department-guidance.vercel.app`

**Development Mode (`NODE_ENV=development`):**
- ✅ URLs in `CORS_ORIGIN` are allowed
- ✅ Localhost URLs are **automatically allowed**:
  - `http://localhost:3000`
  - `http://localhost:5173`
  - `http://localhost:5174`

### Current Configuration

**Backend `.env`:**
```bash
NODE_ENV=production
CORS_ORIGIN=https://cci-department-guidance.vercel.app
```

This means:
- ✅ Production frontend can call backend API
- ❌ Localhost cannot call production API (secure!)
- ✅ Development mode allows localhost

### Add Multiple Domains (if needed)

```bash
# Multiple production domains (comma-separated)
CORS_ORIGIN=https://cci-department-guidance.vercel.app,https://custom-domain.com
```

### Wildcard Support

```bash
# Allow all Vercel preview deployments
CORS_ORIGIN=*.vercel.app

# Mix wildcard with specific domains
CORS_ORIGIN=https://cci-department-guidance.vercel.app,*.vercel.app
```

---

## ✅ Testing Production

### Step 1: Test Backend Health

**Using Browser:**
```
https://YOUR-BACKEND-URL/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "CCI Department Guidance System API is running",
  "timestamp": "2026-09-03T...",
  "environment": "production",
  "version": "v1",
  "database": "connected"
}
```

### Step 2: Test CORS

**Open Browser Console on Frontend:**
```javascript
// Should work (same origin as CORS_ORIGIN)
fetch('https://YOUR-BACKEND-URL/api/health')
  .then(r => r.json())
  .then(console.log);

// Expected: { success: true, ... }
```

**From Localhost (should fail in production):**
```javascript
// Open http://localhost:5173 and run:
fetch('https://YOUR-BACKEND-URL/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Expected: CORS error (blocked)
```

### Step 3: Test Full User Flow

1. **Open production frontend:** `https://cci-department-guidance.vercel.app`
2. **Navigate to Departments:** Click "Explore Departments"
3. **Check console:** Should see no CORS errors
4. **Start Assessment:** Click "Start Assessment"
5. **Answer questions:** Complete all 20 questions
6. **Submit:** Click "Submit Assessment"
7. **View results:** Should see top 3 recommendations
8. **Admin Dashboard:** Navigate to `/admin`
9. **Check charts:** Should load data from backend

### Step 4: Test Admin Features

1. **Open admin dashboard:** `/admin`
2. **Check KPIs:** Should show real data
3. **Department Distribution Chart:** Should display
4. **Student Submissions:** Should paginate/search
5. **Database Manager:** Select a table, view rows
6. **Export:** Try Excel/CSV export

### Expected Behaviors

✅ **Working:**
- All API calls from production frontend succeed
- Charts load with real data
- Assessment submission works
- Results display correctly
- Admin dashboard functions
- No CORS errors in console

❌ **Blocked (Correct):**
- API calls from localhost to production backend (CORS error)
- Direct access to admin routes without auth (if implemented)

---

## 🐛 Troubleshooting

### Issue 1: CORS Error on Production

**Symptom:**
```
Access to fetch at 'https://backend.com/api' from origin 'https://frontend.com' 
has been blocked by CORS policy
```

**Solutions:**

1. **Check backend logs** - Is origin being blocked?
2. **Verify CORS_ORIGIN** - Must exactly match frontend URL
3. **Check protocol** - http vs https mismatch?
4. **Trailing slashes** - Remove from CORS_ORIGIN
5. **Redeploy backend** - After changing CORS_ORIGIN

**Quick Fix:**
```bash
# In Railway/Render dashboard:
CORS_ORIGIN=https://cci-department-guidance.vercel.app

# NOT:
CORS_ORIGIN=https://cci-department-guidance.vercel.app/
CORS_ORIGIN=http://cci-department-guidance.vercel.app  (wrong protocol)
```

### Issue 2: 500 Internal Server Error

**Check backend logs:**

**Railway:**
1. Go to project dashboard
2. Click "Deployments" tab
3. Click latest deployment
4. View "Logs" tab

**Render:**
1. Go to service dashboard
2. Click "Logs" tab
3. View real-time logs

**Common Causes:**
- Missing environment variables
- Database connection failure
- Supabase credentials wrong
- PORT not configured

### Issue 3: Frontend Can't Connect to Backend

**Verify Frontend Config:**
```bash
# Check .env in frontend folder
cat frontend/.env

# Should show:
VITE_API_URL=https://YOUR-BACKEND-URL/api
```

**Check Vercel Environment Variables:**
1. Go to Vercel project settings
2. Click "Environment Variables"
3. Verify `VITE_API_URL` is set correctly
4. Redeploy if you just added/changed it

### Issue 4: Database Connection Issues

**Test Supabase Connection:**
```bash
# In backend logs, look for:
✅ Supabase connection established successfully

# If you see error:
❌ Database connection failed
```

**Solutions:**
1. Verify `SUPABASE_URL` is correct
2. Verify `SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY`
3. Check Supabase project status (not paused)
4. Verify database region matches

### Issue 5: Vercel Deployment Fails

**Build Error:**
- Check build logs in Vercel dashboard
- Verify `package.json` scripts
- Check for TypeScript errors
- Verify environment variables

**Quick Fix:**
```bash
# Test build locally first:
cd frontend
npm run build

# If successful, commit and push:
git add .
git commit -m "Fix build"
git push
```

### Issue 6: Railway/Render Build Fails

**Common Issues:**
- Wrong Node version (use 16+)
- Missing dependencies
- Wrong build command
- Wrong start command

**Solutions:**

**Railway:**
```
Build Command: npm install
Start Command: node src/server.js
```

**Render:**
```
Build Command: npm install
Start Command: node src/server.js
```

---

## 📞 Support & Resources

### Official Documentation
- **Vercel:** https://vercel.com/docs
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **Supabase:** https://supabase.com/docs

### Project Resources
- **GitHub:** https://github.com/Asladdiin92/cci-department-guidance
- **Database Schema:** `backend/database/DATABASE-SCHEMA.md`
- **API Endpoints:** Check controllers in `backend/src/controllers/`

### Contact
**Lead Developer:** Asladin Abdukedir  
**Institution:** Haramaya University - CCI

---

## ✅ Deployment Checklist

### Backend (Railway/Render)
- [ ] Create account
- [ ] Connect GitHub repository
- [ ] Configure build settings (root: backend)
- [ ] Add all environment variables
- [ ] Deploy
- [ ] Get production URL
- [ ] Test health endpoint
- [ ] Check logs for errors

### Frontend (Vercel)
- [ ] Update `VITE_API_URL` with backend URL
- [ ] Commit and push to GitHub
- [ ] Wait for auto-deploy or manual redeploy
- [ ] Add environment variables in Vercel dashboard
- [ ] Test production URL
- [ ] Check browser console for CORS errors

### Database (Supabase)
- [ ] Verify connection from backend
- [ ] Seed departments data (6 rows)
- [ ] Seed questions data (20 rows)
- [ ] Seed question_options data (80 rows)
- [ ] Test assessment flow
- [ ] Verify recommendations are generated

### Final Testing
- [ ] Complete end-to-end user flow
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify admin dashboard
- [ ] Test database manager
- [ ] Export data (Excel/CSV)
- [ ] Check performance (load times)

---

**Document Version:** 1.0  
**Last Updated:** September 3, 2026  
**Status:** Ready for Deployment 🚀

---

*Follow this guide step-by-step to deploy the CCI Department Guidance System to production.*
