--- 15_day_plan.md (原始)


+++ 15_day_plan.md (修改后)
# Department Choice Guidance System - 15 Day Execution Plan

## Project Goal
Get the Department Choice Guidance System working properly by integrating and testing the current structure, fixing UI links, and resolving deployment issues.

---

## Phase 1: Backend & Database Integration (Days 1-3)

### **Day 1: Supabase Connection Verification**
- **Morning:**
  - Review existing Supabase client configuration in backend files
  - Verify `.env` file contains correct `SUPABASE_URL` and `SUPABASE_ANON_KEY`
  - Test basic connection with a simple ping/health check script
- **Afternoon:**
  - Document all database tables and their relationships
  - Check Row Level Security (RLS) policies are correctly configured
  - Fix any connection timeout or authentication errors
- **Deliverable:** Working Supabase connection with documented table schema

### **Day 2: Database Read Operations**
- **Morning:**
  - Write test functions to fetch data from each major table (departments, students, choices)
  - Log raw responses to verify data structure matches expectations
- **Afternoon:**
  - Handle edge cases: empty tables, null values, large datasets
  - Optimize queries with proper filters and limits
- **Deliverable:** Tested read operations for all database tables

### **Day 3: Backend Test Suite**
- **Morning:**
  - Create automated tests for database retrieval functions
  - Test success scenarios and error handling (network failures, permission denied)
- **Afternoon:**
  - Run full test suite and fix any failing tests
  - Document API endpoints and expected response formats
- **Deliverable:** Passing test suite confirming reliable database access

---

## Phase 2: API & State Management (Days 4-5)

### **Day 4: API Error Isolation**
- **Morning:**
  - Use browser DevTools Network tab to inspect all API calls
  - Identify endpoints returning errors (4xx, 5xx status codes)
  - Check server logs for stack traces and error messages
- **Afternoon:**
  - Fix CORS issues if present
  - Standardize error response format across all endpoints
  - Add proper HTTP status codes to responses
- **Deliverable:** List of resolved API errors with documented fixes

### **Day 5: Data Types & React State**
- **Morning:**
  - Compare API response types with TypeScript interfaces (if using TypeScript)
  - Fix mismatches: string vs number, date formats, nested objects
- **Afternoon:**
  - Review React state management (useState, useContext, or Redux)
  - Ensure user data persists correctly across component re-renders
  - Add loading and error states for async operations
- **Deliverable:** Type-safe data flow from API to React components

---

## Phase 3: Frontend Forms & Validation (Days 6-7)

### **Day 6: Form Field Mapping**
- **Morning:**
  - Audit all input components (text fields, dropdowns, checkboxes)
  - Map each form field to corresponding database column names
  - Fix any naming mismatches (camelCase vs snake_case)
- **Afternoon:**
  - Test form submissions with valid data
  - Verify data is correctly sent to backend and saved in database
- **Deliverable:** All form inputs correctly mapped to database fields

### **Day 7: Cross-Field Validation**
- **Morning:**
  - Implement validation rules: required fields, email format, phone number format
  - Add cross-field logic (e.g., "End Date" must be after "Start Date")
  - Prevent duplicate department choices if business rules require it
- **Afternoon:**
  - Display clear, user-friendly error messages
  - Test validation with invalid inputs and edge cases
- **Deliverable:** Fully validated forms with helpful error feedback

---

## Phase 4: Navigation & Routing (Days 8-10)

### **Day 8: Router Configuration Review**
- **Morning:**
  - Open your router file (e.g., `App.jsx`, `routes.js`)
  - List all defined routes and their associated components
  - Identify missing routes or incorrect path definitions
- **Afternoon:**
  - Fix route syntax errors and component import paths
  - Ensure protected routes redirect unauthenticated users correctly
- **Deliverable:** Clean, error-free router configuration

### **Day 9: Link Fixes**
- **Morning:**
  - Crawl through every page and click all navigation links/buttons
  - Document broken links (404 errors, wrong destinations)
- **Afternoon:**
  - Update `<Link>` components and `navigate()` calls with correct paths
  - Fix any hardcoded URLs that should use route names
- **Deliverable:** All internal links functional

### **Day 10: Navigation Structure Testing**
- **Morning:**
  - Test complete user journeys: home → login → dashboard → form → confirmation
  - Verify breadcrumb navigation (if applicable) updates correctly
- **Afternoon:**
  - Test browser back/forward buttons work as expected
  - Add 404 page for undefined routes
- **Deliverable:** Fully operational navigation structure

---

## Phase 5: Deployment Preparation (Days 11-13)

### **Day 11: Vercel Build Log Analysis**
- **Morning:**
  - Access Vercel dashboard and open recent failed deployments
  - Read build logs line-by-line to identify failure points
  - Common issues: missing dependencies, build script errors, Node version mismatch
- **Afternoon:**
  - Fix identified build errors locally first
  - Commit fixes and push to trigger new deployment
- **Deliverable:** Clear understanding of build failure root causes

### **Day 12: Environment Variables Setup**
- **Morning:**
  - List all environment variables needed (Supabase keys, API URLs, secrets)
  - In Vercel dashboard: Settings → Environment Variables
  - Add variables for both Preview and Production environments
- **Afternoon:**
  - Verify variables are accessible in your code (`process.env.VAR_NAME`)
  - Restart deployment to apply new environment variables
- **Deliverable:** All environment variables correctly configured in Vercel

### **Day 13: Build Success Verification**
- **Morning:**
  - Trigger a new deployment and monitor real-time build logs
  - Confirm build completes without errors or warnings
- **Afternoon:**
  - Access the preview URL and smoke-test critical features
  - Check console for runtime errors in the deployed app
- **Deliverable:** Successful Vercel build with working preview deployment

---

## Phase 6: Final Testing & Production Launch (Days 14-15)

### **Day 14: End-to-End Staging Testing**
- **Morning:**
  - Create test accounts and simulate real user scenarios
  - Test: registration, login, department selection, submission, logout
  - Verify data appears correctly in Supabase dashboard
- **Afternoon:**
  - Test on multiple devices/browsers (Chrome, Firefox, Safari, mobile)
  - Check responsive design and accessibility
  - Document any remaining bugs and fix critical ones immediately
- **Deliverable:** Signed-off staging environment ready for production

### **Day 15: Production Deployment**
- **Morning:**
  - Merge all changes to main/master branch
  - In Vercel: promote the latest successful preview to Production
  - Update production environment variables if different from staging
- **Afternoon:**
  - Perform final smoke test on production URL
  - Monitor application performance and error logs (Vercel Analytics, Sentry)
  - Share production link with stakeholders
- **Deliverable:** Live production application at [your-domain].vercel.app

---

## Daily Checklist Template
- [ ] Morning tasks completed
- [ ] Afternoon tasks completed
- [ ] Deliverable verified and tested
- [ ] Code committed with descriptive message
- [ ] Any blockers documented for next day

## Tools You'll Need
- **Database:** Supabase Dashboard
- **Backend Testing:** Jest, Postman, or custom scripts
- **Frontend:** React DevTools, Browser DevTools
- **Deployment:** Vercel Dashboard, Git
- **Communication:** Keep a daily log of progress and issues

## Success Criteria
✅ All database operations working
✅ No API errors in console
✅ Forms validate and submit correctly
✅ All navigation links functional
✅ Vercel builds succeed
✅ Production deployment live and stable

Good luck! Stay focused, test incrementally, and don't skip verification steps.
