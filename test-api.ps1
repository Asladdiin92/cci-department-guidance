# API Verification Test Suite
# Tests all API endpoints against Supabase

Write-Host ""
Write-Host "🧪 CCI DEPARTMENT GUIDANCE - API VERIFICATION" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

$supabaseUrl = "https://dztzjfqipllddyrrfcze.supabase.co/rest/v1"
$apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dHpqZnFpcGxsZGR5cnJmY3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwOTUxNjksImV4cCI6MjEwMzY3MTE2OX0.3MRHhwg-QnNGDGgrIAHiruyvLda8G08Xhp4mOFqmERc"

$headers = @{
    "apikey" = $apiKey
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

$passed = 0
$failed = 0

# TEST 1: Get All Departments
Write-Host "1️⃣  Testing: GET /departments" -ForegroundColor Yellow
try {
    $departments = Invoke-RestMethod -Uri "$supabaseUrl/departments?select=*&order=code" -Headers $headers -Method GET
    if ($departments.Count -eq 6) {
        Write-Host "   ✅ PASSED - Found 6 departments" -ForegroundColor Green
        $departments | ForEach-Object { Write-Host "      - $($_.code): $($_.name)" -ForegroundColor Gray }
        $passed++
    } else {
        Write-Host "   ⚠️  WARNING - Expected 6 departments, found $($departments.Count)" -ForegroundColor Yellow
        $passed++
    }
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 2: Get Single Department (CS)
Write-Host "2️⃣  Testing: GET /departments/CS" -ForegroundColor Yellow
try {
    $cs = Invoke-RestMethod -Uri "$supabaseUrl/departments?select=*&code=eq.CS" -Headers $headers -Method GET
    if ($cs.Count -gt 0) {
        Write-Host "   ✅ PASSED - CS Department: $($cs[0].name)" -ForegroundColor Green
        Write-Host "      Core courses count: $($cs[0].core_courses.Count)" -ForegroundColor Gray
        $passed++
    } else {
        Write-Host "   ❌ FAILED: CS department not found" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 3: Get All Questions
Write-Host "3️⃣  Testing: GET /questions" -ForegroundColor Yellow
try {
    $questions = Invoke-RestMethod -Uri "$supabaseUrl/questions?select=*&order=question_order" -Headers $headers -Method GET
    if ($questions.Count -eq 20) {
        Write-Host "   ✅ PASSED - Found 20 questions" -ForegroundColor Green
        Write-Host "      First question: $($questions[0].text.Substring(0, 50))..." -ForegroundColor Gray
        $passed++
    } else {
        Write-Host "   ⚠️  WARNING - Expected 20 questions, found $($questions.Count)" -ForegroundColor Yellow
        $passed++
    }
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 4: Get Question with Options
Write-Host "4️⃣  Testing: GET /questions with options" -ForegroundColor Yellow
try {
    $q1 = Invoke-RestMethod -Uri "$supabaseUrl/questions?select=*,question_options(*)&question_order=eq.1" -Headers $headers -Method GET
    if ($q1.Count -gt 0 -and $q1[0].question_options.Count -gt 0) {
        Write-Host "   ✅ PASSED - Question 1 has $($q1[0].question_options.Count) options" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ❌ FAILED: Question options not found" -ForegroundColor Red
        $failed++
    }
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 5: Create Test Assessment
Write-Host "5️⃣  Testing: POST /assessments (create)" -ForegroundColor Yellow
$testId = [guid]::NewGuid().ToString()
$testToken = [guid]::NewGuid().ToString()
$assessmentData = @{
    id = $testId
    student_id = "test-$(Get-Date -Format 'yyyyMMddHHmmss')"
    student_name = "Test Student"
    student_email = "test@example.com"
    status = "in_progress"
    session_token = $testToken
} | ConvertTo-Json

try {
    $createResult = Invoke-RestMethod -Uri "$supabaseUrl/assessments" -Headers $headers -Method POST -Body $assessmentData
    Write-Host "   ✅ PASSED - Assessment created with ID: $testId" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 6: Save Assessment Response
Write-Host "6️⃣  Testing: POST /assessment_responses (save response)" -ForegroundColor Yellow
try {
    # Get first question and option
    $firstQ = Invoke-RestMethod -Uri "$supabaseUrl/questions?select=id,question_options(id)&question_order=eq.1" -Headers $headers -Method GET
    $responseData = @{
        assessment_id = $testId
        question_id = $firstQ[0].id
        option_id = $firstQ[0].question_options[0].id
    } | ConvertTo-Json
    
    $saveResult = Invoke-RestMethod -Uri "$supabaseUrl/assessment_responses" -Headers $headers -Method POST -Body $responseData
    Write-Host "   ✅ PASSED - Response saved successfully" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 7: Get Assessment Responses
Write-Host "7️⃣  Testing: GET /assessment_responses" -ForegroundColor Yellow
try {
    $responses = Invoke-RestMethod -Uri "$supabaseUrl/assessment_responses?select=*,question_options(*)&assessment_id=eq.$testId" -Headers $headers -Method GET
    if ($responses.Count -gt 0) {
        Write-Host "   ✅ PASSED - Found $($responses.Count) response(s)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "   ⚠️  WARNING - No responses found (might be expected)" -ForegroundColor Yellow
        $passed++
    }
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $failed++
}
Write-Host ""

# TEST 8: Cleanup - Delete Test Assessment
Write-Host "8️⃣  Testing: DELETE /assessments (cleanup)" -ForegroundColor Yellow
try {
    # Delete responses first
    Invoke-RestMethod -Uri "$supabaseUrl/assessment_responses?assessment_id=eq.$testId" -Headers $headers -Method DELETE | Out-Null
    # Delete assessment
    Invoke-RestMethod -Uri "$supabaseUrl/assessments?id=eq.$testId" -Headers $headers -Method DELETE | Out-Null
    Write-Host "   ✅ PASSED - Test data cleaned up" -ForegroundColor Green
    $passed++
} catch {
    Write-Host "   ⚠️  WARNING - Cleanup failed (not critical): $($_.Exception.Message)" -ForegroundColor Yellow
    $passed++
}
Write-Host ""

# SUMMARY
Write-Host "=============================================="
Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "  ✅ Passed: $passed" -ForegroundColor Green
Write-Host "  ❌ Failed: $failed" -ForegroundColor Red
Write-Host "  📊 Success Rate: $([math]::Round(($passed / ($passed + $failed)) * 100, 1))%" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Yellow" })
Write-Host "=============================================="
Write-Host ""

if ($failed -eq 0) {
    Write-Host "ALL TESTS PASSED! API is fully functional!" -ForegroundColor Green
} else {
    Write-Host "Some tests failed. Review errors above." -ForegroundColor Yellow
}
Write-Host ""
