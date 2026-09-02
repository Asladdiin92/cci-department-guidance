# 🔒 Security Upgrade Guide - Quick Start

## 🎯 What Changed?

Your backend server has been upgraded from **v2.0.0** to **v2.1.0** with critical security fixes:

1. ✅ **Fixed JSON parsing crash** - No more `ERR_HTTP_HEADERS_SENT` errors
2. ✅ **Production-grade rate limiting** - Upgraded from in-memory to `express-rate-limit`
3. ✅ **Secure CORS wildcards** - Fixed loose regex patterns
4. ✅ **Helmet integration** - Industry-standard security headers

---

## 📦 Step 1: Install New Dependencies

Open PowerShell in the backend directory:

```powershell
cd "C:\Users\hp\OneDrive - Haramaya University\Desktop\on kiro\cci-department-guidance\backend"

npm install
```

This will install:
- `helmet@^8.0.0` - Security headers
- `express-rate-limit@^7.4.1` - Rate limiting

**Expected output:**
```
added 2 packages, and audited 45 packages in 3s
```

---

## ⚙️ Step 2: Update Environment Variables (Optional)

Your `.env` file already works, but you can customize rate limiting:

```bash
# backend/.env

# Optional: Customize rate limiting
RATE_LIMIT_WINDOW_MS=900000        # 15 minutes (default)
RATE_LIMIT_MAX_REQUESTS=100        # 100 requests per IP (default)

# Recommended: Use strict CORS patterns
CORS_ORIGIN=http://localhost:5173,*.vercel.app,*.railway.app
```

---

## 🚀 Step 3: Start the Server

```powershell
cd backend
npm run dev
```

**Expected output:**
```
═══════════════════════════════════════════════════════════════════
  🎓 CCI DEPARTMENT GUIDANCE SYSTEM - BACKEND API
═══════════════════════════════════════════════════════════════════

  📍 Server URL:     http://localhost:3000
  🌐 Environment:    DEVELOPMENT
  📦 Version:        v1
  💾 Database:       ✅ Connected (Supabase)
  🔐 CORS Origin:    http://localhost:5173

  📚 API Docs:       http://localhost:3000/api
  🏥 Health Check:   http://localhost:3000/api/health

═══════════════════════════════════════════════════════════════════
  Ready to accept connections
═══════════════════════════════════════════════════════════════════
```

---

## 🧪 Step 4: Test the Fixes

### Test 1: Invalid JSON (Should NOT crash)

Open a new PowerShell window:

```powershell
curl -X POST http://localhost:3000/api/assessments/start `
  -H "Content-Type: application/json" `
  -d '{invalid json}'
```

**Expected Response:**
```json
{
  "success": false,
  "error": "Invalid JSON payload"
}
```

✅ **Server stays running** (no crash!)

---

### Test 2: Rate Limiting

```powershell
# Send 5 requests rapidly (should all succeed in development)
for ($i=1; $i -le 5; $i++) {
  curl http://localhost:3000/api/health
  Write-Host "Request $i completed"
}
```

**Expected:**
- All requests succeed in development mode
- Rate limiting is **skipped** in development for easier testing

**In production**, after 100 requests:
```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

---

### Test 3: Security Headers

```powershell
curl -I http://localhost:3000/api/health
```

**Expected Headers:**
```
HTTP/1.1 200 OK
X-DNS-Prefetch-Control: off
X-Frame-Options: DENY
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
X-Request-Id: 1234567890-abc123
```

✅ **Helmet is working!**

---

### Test 4: Frontend Connection

1. **Start frontend:**
   ```powershell
   cd "C:\Users\hp\OneDrive - Haramaya University\Desktop\on kiro\cci-department-guidance\frontend"
   npm run dev
   ```

2. **Open browser:**
   - Navigate to http://localhost:5173/assessment
   - Take the assessment
   - Answer all 20 questions
   - Click "Submit Assessment"

3. **Check browser console (F12):**
   - Should see detailed logs for each response save attempt
   - Should see "Assessment submitted successfully"
   - No errors!

---

## 📊 Verification Checklist

After completing steps 1-4, verify:

- [x] `npm install` completed without errors
- [x] Backend starts on http://localhost:3000
- [x] Invalid JSON returns 400 (doesn't crash)
- [x] Security headers present in responses
- [x] Frontend can connect and submit assessments
- [x] No console errors in browser or terminal

---

## 🐛 Troubleshooting

### Issue: `Cannot find module 'helmet'`

**Solution:**
```powershell
cd backend
npm install helmet express-rate-limit --save
```

---

### Issue: Port 3000 already in use

**Solution:**
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace <PID> with actual number)
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

---

### Issue: Backend won't start

**Check:**
1. `.env` file exists in `backend/` folder
2. Supabase credentials are correct
3. Run: `npm install` to ensure all dependencies installed

---

### Issue: Assessment submission still fails

**Debug steps:**
1. Open browser console (F12)
2. Look for error messages
3. Check backend terminal for logs
4. Verify frontend `.env` points to `http://localhost:3000/api`

---

## 📝 What to Commit

After testing successfully:

```powershell
git add backend/package.json
git add backend/src/server.js
git add backend/src/middleware/errorHandler.js
git add backend/SECURITY-FIXES-APPLIED.md
git add SECURITY-UPGRADE-GUIDE.md

git commit -m "Security upgrade v2.1.0: Fix JSON parsing, upgrade rate limiting, integrate Helmet"

git push origin main
```

---

## 🚀 Deployment

### Vercel (Frontend)

1. Push to GitHub (above)
2. Vercel auto-deploys when rate limit resets
3. No changes needed

### Railway (Backend)

1. Push to GitHub (above)
2. Railway auto-detects changes
3. Add environment variables in Railway dashboard:
   ```
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```
4. Deploy automatically

---

## ✅ Success Criteria

You're done when:

1. ✅ Backend starts without errors
2. ✅ All 4 tests pass
3. ✅ Frontend can submit assessments
4. ✅ No crashes or errors in console
5. ✅ Security headers present in responses

---

## 📞 Need Help?

**Issue with installation?**
- Check Node.js version: `node --version` (should be v16+)
- Check npm version: `npm --version` (should be v8+)

**Issue with testing?**
- Share console errors from browser (F12)
- Share terminal errors from backend
- Check backend logs for detailed error messages

---

**Upgrade Status:** ✅ Ready to Test  
**Version:** 2.1.0 → Security Hardened  
**Time to Complete:** ~5 minutes  
**Difficulty:** Easy
