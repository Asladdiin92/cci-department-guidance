# 🧪 Frontend & API Testing Instructions

## ✅ Current Status

- **Frontend**: Running at http://localhost:5173
- **Backend**: Using Supabase direct fallback (Railway backend deployment in progress)
- **Database**: Supabase - fully configured with 6 departments and 20 questions
- **All Changes**: Pushed to GitHub

---

## 📋 How to Test

### 1. **Test the API Endpoints** (Automated)

Visit the API Test Page:
```
http://localhost:5173/test-api
```

This page will automatically:
- ✅ Load all 6 departments
- ✅ Fetch single department details
- ✅ Start a test assessment with 20 questions
- ✅ Submit the assessment
- ✅ Retrieve results

**What to look for:**
- Green checkmarks (✅) = Tests PASSED
- Red X marks (❌) = Tests FAILED
- Each test shows the data returned

---

### 2. **Test the Main Application** (Manual)

#### A. Homepage
```
http://localhost:5173
```
**Check:** 
- Page loads without errors
- Hero section displays
- Navigation works

#### B. Departments Page
```
http://localhost:5173/departments
```
**Check:**
- All 6 departments display: CS, SWE, IT, IS, ISC, STAT
- Each shows: name, description, career prospects
- Core courses are listed
- "Learn More" buttons work

#### C. Assessment Flow
```
http://localhost:5173/assessment
```
**Steps to test:**
1. Fill in: Student ID, Name, Email
2. Click "Start Assessment"
3. Answer all 20 questions
4. Submit assessment
5. View results page

**Check:**
- Questions load (20 total)
- Options are selectable
- Progress bar updates
- Results show top matched department
- Scores for all 6 departments display

#### D. Department Details
```
http://localhost:5173/departments/CS
```
**Check:**
- CS department details load
- Core courses display
- Career information shows
- Exit exam link works

#### E. Exit Exam Pages
```
http://localhost:5173/exit-exam
```
**Check:**
- Tabs for all 6 departments work
- Each tab shows department-specific exam info
- No "Lesson X" or "Y chapters" text
- No mentions of external sources

---

## 🔍 Browser Console Testing

Open browser DevTools (F12) and check Console tab:

### Expected Console Messages:

**When backend is unavailable:**
```
⚠️ Backend failed, switching to Supabase fallback
📡 Using Supabase direct connection for departments
```

**When loading data:**
```
✅ Found 6 departments
✅ Loaded 20 questions
✅ Assessment created
```

### Check for Errors:
- ❌ No red error messages
- ❌ No "Failed to fetch" errors
- ❌ No 404 or 500 errors

---

## 📊 What Data Sources Are Being Used?

### Current Setup (with automatic fallback):

1. **Primary**: Railway Backend API
   - URL: `https://cci-department-guidance-production.up.railway.app/api`
   - Status: Deploying (may not be ready yet)

2. **Fallback**: Supabase Direct API
   - URL: `https://dztzjfqipllddyrrfcze.supabase.co`
   - Status: ✅ Active
   - Used when: Backend is unavailable (502, timeout, connection error)

### How Fallback Works:

```javascript
// Automatic detection in api.js
try {
  // Try backend first
  const data = await fetch(backendAPI);
} catch (error) {
  // Automatically switch to Supabase
  console.log('Switching to Supabase fallback');
  const data = await supabaseDirectAPI();
}
```

---

## 🐛 Troubleshooting

### If frontend doesn't load:
```powershell
cd frontend
npm run dev
```

### If you see "Network Error":
- Check if Supabase credentials are in `frontend/.env`
- Verify `.env` has:
  ```
  VITE_SUPABASE_URL=https://dztzjfqipllddyrrfcze.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbG...
  ```

### If departments don't load:
1. Open browser console (F12)
2. Look for error messages
3. Check if Supabase connection is working
4. Visit `/test-api` to see detailed error info

### If Railway backend is working:
- Console will NOT show "fallback" messages
- Data comes from backend API
- Response times may be faster

---

## ✅ Success Checklist

Test each item and check off:

- [ ] Frontend loads at http://localhost:5173
- [ ] API test page shows all tests PASSED
- [ ] 6 departments display on /departments
- [ ] Assessment starts and loads 20 questions
- [ ] Can complete full assessment flow
- [ ] Results page shows matched department
- [ ] No console errors
- [ ] Exit exam pages show all 6 departments
- [ ] No "boring content" (lesson numbers, external sources)

---

## 📝 Test Results

After testing, note any issues:

**Working:** ✅
_____________________________________________

**Issues Found:** ❌
_____________________________________________

**Browser Used:**
_____________________________________________

**Date/Time:**
_____________________________________________

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Deploy Frontend to Vercel**
   - Will automatically use Railway backend when available
   - Falls back to Supabase if backend is down
   
2. **Fix Railway Backend** (if needed)
   - Check Railway logs
   - Verify environment variables
   - Ensure service is running

3. **Monitor Production**
   - Check Vercel deployment logs
   - Test live URL
   - Verify data loading

---

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Visit `/test-api` for detailed diagnostics
3. Review `docs/DEPLOYMENT_GUIDE.md`
4. Check Supabase dashboard for database status

---

**Last Updated:** 2026-09-07
**Frontend Version:** 1.0.0
**Backend Status:** Deploying on Railway
**Database:** Supabase (Active)
