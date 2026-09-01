# Testing Checklist - Day 4 Complete

## 🧪 Local Testing (http://localhost:5173)

### ✅ Pages to Test

#### 1. Home Page (/)
- [ ] Hero section displays
- [ ] "Take Assessment" button works
- [ ] Features section displays
- [ ] Navigation works

#### 2. Departments List (/departments)
- [ ] All 6 departments display in grid
- [ ] Department cards show:
  - [ ] Name
  - [ ] Code
  - [ ] Description
  - [ ] Required skills (chips)
- [ ] "Learn More" button navigates to details
- [ ] Responsive on mobile

#### 3. Department Details (/departments/CS, /departments/SE, etc.)
- [ ] Full department info displays
- [ ] Career paths listed
- [ ] Core courses listed
- [ ] Required skills listed
- [ ] Description shows
- [ ] "Take Assessment" button works
- [ ] "Compare Departments" button works
- [ ] Back navigation works

#### 4. Assessment Page (/assessment)
- [ ] Assessment loads from API
- [ ] 20 questions display
- [ ] Progress bar shows current position
- [ ] Radio buttons work for answers
- [ ] "Next" button advances
- [ ] "Previous" button goes back
- [ ] Answer counter updates
- [ ] "Submit" button only enabled when all answered
- [ ] Submitting shows loading state
- [ ] Redirects to Results page after submit

#### 5. Results Page (/results/:id)
- [ ] Top 3 recommendations display
- [ ] Match percentages show
- [ ] #1 has "Best Match" badge
- [ ] Match reasons display
- [ ] Progress bars for scores
- [ ] All other departments listed below top 3
- [ ] "Compare Top 3" button works
- [ ] "Retake Assessment" button works
- [ ] "Learn More" buttons navigate correctly

#### 6. Compare Page (/compare?departments=CS,SE,IS)
- [ ] 2-3 departments display side by side
- [ ] Department headers with colors
- [ ] Overview table (duration, degree, code)
- [ ] Career paths comparison
- [ ] Skills comparison
- [ ] Core courses preview
- [ ] "View Details" buttons work
- [ ] "Browse All Departments" button works
- [ ] Error shown if <2 or >3 departments

---

## 🌐 Production Testing (https://cci-department-guidance.vercel.app)

### After Deployment:
- [ ] All local tests pass in production
- [ ] API calls work to Railway backend
- [ ] No CORS errors in console
- [ ] No TypeScript errors
- [ ] Mobile responsive on real device
- [ ] Fast load times

---

## 🔗 API Integration Tests

### Endpoints Used:
1. ✅ `GET /api/health` - Backend health check
2. ✅ `GET /api/departments` - List all departments
3. ✅ `GET /api/departments/:code` - Single department
4. ✅ `POST /api/assessments/start` - Start new assessment
5. ✅ `POST /api/assessments/submit` - Submit answers
6. ⚠️ `GET /api/assessments/:id/results` - Get results (to be tested)

### Manual API Tests:
```powershell
# 1. Health check
curl https://cci-department-guidance-production.up.railway.app/api/health

# 2. List departments
curl https://cci-department-guidance-production.up.railway.app/api/departments

# 3. Get single department
curl https://cci-department-guidance-production.up.railway.app/api/departments/CS

# 4. Start assessment
curl -X POST https://cci-department-guidance-production.up.railway.app/api/assessments/start `
  -H "Content-Type: application/json" `
  -d '{}'

# 5. Submit assessment (replace ID and answers)
curl -X POST https://cci-department-guidance-production.up.railway.app/api/assessments/submit `
  -H "Content-Type: application/json" `
  -d '{"assessment_id":"UUID","answers":{"1":5,"2":4}}'
```

---

## 🎯 User Flow Tests

### Flow 1: New Student Journey
1. Land on home page
2. Click "Take Assessment"
3. Answer all 20 questions
4. View results with top 3 recommendations
5. Click "Compare Top 3"
6. Review comparison
7. Click "View Details" on best match
8. Read full department info

### Flow 2: Browse Departments
1. Click "Explore Departments" from home
2. Browse 6 department cards
3. Click "Learn More" on Computer Science
4. Read CS details
5. Click "Compare Departments"
6. Select 2-3 departments from URL params
7. Review side-by-side comparison

### Flow 3: Retake Assessment
1. Complete assessment
2. View results
3. Click "Retake Assessment"
4. Start new assessment
5. Answer differently
6. Compare new results

---

## 🐛 Known Issues / Edge Cases

- [ ] What happens if API is down?
- [ ] What if assessment ID is invalid in URL?
- [ ] What if compare has 0 or 1 department?
- [ ] What if user refreshes during assessment?
- [ ] What if network is slow?

---

## ✨ Next Steps After Testing

1. Fix any bugs found
2. Deploy to Vercel production
3. Test in production
4. Create DAY-4-COMPLETION-REPORT.md
5. Move to Day 5 (Exit Exam, Admin, Feedback pages)
