# CCI Department Guidance System - Deployment Guide

## 🎯 Pre-Deployment Checklist

### ✅ Completed:
- [x] Database updated with accurate curriculum data
- [x] Assessment questions updated and tested
- [x] Exit Exam page with all 6 departments
- [x] All technical details removed from frontend
- [x] Frontend running on http://localhost:5173
- [x] Backend running on http://localhost:3001

### 📋 Ready to Deploy:
- [x] Department descriptions (CS, SWE, IT, IS, ISC, STAT)
- [x] 20 assessment questions with corrected scoring
- [x] Exit exam materials for all departments
- [x] Unified exit exam page with tabs
- [x] Assessment wizard with progress tracking
- [x] Results page with visualizations
- [x] Feedback system
- [x] Footer pages (Privacy, Terms, Accessibility)

---

## 🚀 DEPLOYMENT OPTIONS

### **OPTION 1: Deploy to Vercel (Recommended for Frontend)**

#### Frontend Deployment:

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy Frontend**:
```bash
cd frontend
vercel --prod
```

4. **Configure Environment Variables** in Vercel Dashboard:
   - `VITE_API_URL` = Your backend URL (from Render/Railway)

#### Backend Deployment to Render:

1. **Go to** [render.com](https://render.com)
2. **Sign up/Login**
3. **Click "New +"** → **Web Service**
4. **Connect GitHub repository** or upload manually
5. **Configure**:
   - Name: `cci-guidance-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables:
     - `SUPABASE_URL`
     - `SUPABASE_KEY`
     - `PORT` = 3001

---

### **OPTION 2: Deploy to Railway (Full Stack)**

1. **Go to** [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub**
3. **Add services**:
   - Frontend (React)
   - Backend (Node.js)
4. **Set Environment Variables**
5. **Deploy**

---

### **OPTION 3: Deploy to Netlify (Frontend) + Render (Backend)**

#### Frontend (Netlify):
```bash
cd frontend
npm run build
# Upload dist folder to Netlify
```

#### Backend (Render):
Same as Option 1

---

## 🔧 Current Local Setup

### Frontend:
- URL: http://localhost:5173
- Status: ✅ Running
- Command: `npm run dev`

### Backend:
- URL: http://localhost:3001
- Status: ✅ Running  
- Command: `npm start`

### Database:
- Supabase: ✅ Updated with accurate data
- Tables: departments, questions, question_options, assessments, assessment_responses

---

## 📝 Post-Deployment Steps

### 1. Test Live Site:
- [ ] Assessment works correctly
- [ ] All 6 departments display properly
- [ ] Exit exam page loads with all tabs
- [ ] Results page shows correct recommendations
- [ ] Feedback form submits successfully

### 2. Monitor:
- [ ] Check Vercel/Render logs for errors
- [ ] Monitor API response times
- [ ] Check database connections

### 3. Share:
- [ ] Share URL with Haramaya University
- [ ] Get feedback from students
- [ ] Monitor usage analytics

---

## 🎓 For Haramaya University Deployment

If deploying on university servers:

### Requirements:
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy
- SSL certificate for HTTPS

### Commands:
```bash
# Install PM2
npm install -g pm2

# Start Backend
cd backend
pm2 start npm --name "cci-backend" -- start

# Build Frontend
cd frontend
npm run build

# Serve with Nginx
# Copy dist folder to /var/www/cci-guidance
```

### Nginx Configuration:
```nginx
server {
    listen 80;
    server_name guidance.cci.haramaya.edu.et;
    
    location / {
        root /var/www/cci-guidance;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔐 Environment Variables Needed

### Frontend (.env):
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env):
```
NODE_ENV=production
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
CORS_ORIGIN=https://your-frontend-url.com
```

---

## 📊 System Stats

- **Departments**: 6 (CS, SWE, IT, IS, ISC, STAT)
- **Assessment Questions**: 20
- **Total Options**: 120 (6 per question)
- **Pages**: 15+ frontend pages
- **API Endpoints**: 10+
- **Database Tables**: 5

---

## 🎯 Quick Deploy Commands

### If you want to deploy NOW:

**Frontend (Vercel):**
```bash
cd frontend
npx vercel --prod
```

**Backend (Railway):**
```bash
cd backend
railway login
railway init
railway up
```

---

## ✅ READY TO DEPLOY!

All updates are complete and tested. The system is production-ready!

**What would you like to do?**
1. Deploy to Vercel/Render (Cloud)
2. Deploy to Railway (Full Stack)
3. Deploy to Netlify
4. Setup for University Servers
5. Just keep running locally for now

---

*Last Updated: September 1, 2026*
*Version: 2.0 - Curriculum Accurate*
