# Complete API Test Script for CCI Department Guidance System
# Run this after starting the backend server with: npm run dev

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  CCI Department Guidance API Tests" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:3000/api"
$testsPassed = 0
$testsFailed = 0

# Test 1: Health Check
Write-Host "1. Testing Health Check..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -ErrorAction Stop
    if ($health.success -and $health.database -eq "Connected") {
        Write-Host "   ✓ Health check passed - Database connected" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "   ✗ Health check failed - Database not connected" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Health check failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
    Write-Host ""
    Write-Host "ERROR: Cannot connect to server. Please ensure:" -ForegroundColor Red
    Write-Host "  1. Backend server is running (npm run dev)" -ForegroundColor Yellow
    Write-Host "  2. Server is on http://localhost:3000" -ForegroundColor Yellow
    Write-Host "  3. Database migrations are executed" -ForegroundColor Yellow
    exit 1
}

# Test 2: Get All Departments
Write-Host ""
Write-Host "2. Testing Get All Departments..." -ForegroundColor Yellow
try {
    $departments = Invoke-RestMethod -Uri "$baseUrl/departments" -ErrorAction Stop
    $count = $departments.data.total
    if ($count -eq 6) {
        Write-Host "   ✓ Retrieved $count departments (CS, SWE, IT, IS, ISC, STAT)" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "   ✗ Expected 6 departments, got $count" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 3: Get Single Department
Write-Host ""
Write-Host "3. Testing Get Single Department (CS)..." -ForegroundColor Yellow
try {
    $dept = Invoke-RestMethod -Uri "$baseUrl/departments/CS" -ErrorAction Stop
    if ($dept.data.code -eq "CS" -and $dept.data.name) {
        Write-Host "   ✓ Retrieved: $($dept.data.name)" -ForegroundColor Green
        Write-Host "     - Strengths: $($dept.data.strengths.Count) items" -ForegroundColor Cyan
        Write-Host "     - Career paths: $($dept.data.career_paths.Count) options" -ForegroundColor Cyan
        $testsPassed++
    } else {
        Write-Host "   ✗ Invalid department data" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 4: Get Department Curriculum
Write-Host ""
Write-Host "4. Testing Get Department Curriculum (SWE)..." -ForegroundColor Yellow
try {
    $curriculum = Invoke-RestMethod -Uri "$baseUrl/departments/SWE/curriculum" -ErrorAction Stop
    if ($curriculum.data.curriculum) {
        Write-Host "   ✓ Retrieved curriculum for $($curriculum.data.department_name)" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "   ✗ No curriculum data found" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 5: Search Departments
Write-Host ""
Write-Host "5. Testing Search Departments (query: 'software')..." -ForegroundColor Yellow
try {
    $search = Invoke-RestMethod -Uri "$baseUrl/departments/search?q=software" -ErrorAction Stop
    Write-Host "   ✓ Search returned $($search.data.count) results" -ForegroundColor Green
    $testsPassed++
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 6: Compare Departments
Write-Host ""
Write-Host "6. Testing Compare Departments (CS, SWE, IT)..." -ForegroundColor Yellow
try {
    $compareBody = @{
        department_codes = @("CS", "SWE", "IT")
    } | ConvertTo-Json
    
    $compare = Invoke-RestMethod -Uri "$baseUrl/departments/compare" `
        -Method Post `
        -ContentType "application/json" `
        -Body $compareBody `
        -ErrorAction Stop
    
    if ($compare.data.comparison_count -eq 3) {
        Write-Host "   ✓ Comparison data retrieved for 3 departments" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "   ✗ Expected 3 departments in comparison" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 7: Start Assessment
Write-Host ""
Write-Host "7. Testing Start Assessment..." -ForegroundColor Yellow
try {
    $startBody = @{
        student_name = "Test Student - Automated"
        student_email = "automated.test@haramaya.edu"
    } | ConvertTo-Json
    
    $assessment = Invoke-RestMethod -Uri "$baseUrl/assessments/start" `
        -Method Post `
        -ContentType "application/json" `
        -Body $startBody `
        -ErrorAction Stop
    
    $assessmentId = $assessment.data.assessment_id
    $questionCount = $assessment.data.total_questions
    
    if ($assessmentId -and $questionCount -eq 20) {
        Write-Host "   ✓ Assessment started with $questionCount questions" -ForegroundColor Green
        Write-Host "     Assessment ID: $assessmentId" -ForegroundColor Cyan
        $testsPassed++
        
        # Test 8: Save Responses for all questions
        Write-Host ""
        Write-Host "8. Testing Save Responses (20 questions)..." -ForegroundColor Yellow
        $savedCount = 0
        $failedResponses = 0
        
        foreach ($question in $assessment.data.questions) {
            try {
                # Select first option for each question
                $responseBody = @{
                    question_id = $question.id
                    option_id = $question.question_options[0].id
                } | ConvertTo-Json
                
                $response = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/responses" `
                    -Method Post `
                    -ContentType "application/json" `
                    -Body $responseBody `
                    -ErrorAction Stop
                
                $savedCount++
                Write-Host "   ◦ Response $savedCount/20 saved" -ForegroundColor Gray
            } catch {
                $failedResponses++
                Write-Host "   ✗ Failed to save response $($savedCount + 1): $($_.Exception.Message)" -ForegroundColor Red
            }
        }
        
        if ($savedCount -eq 20) {
            Write-Host "   ✓ All $savedCount responses saved successfully" -ForegroundColor Green
            $testsPassed++
        } else {
            Write-Host "   ✗ Only $savedCount/20 responses saved" -ForegroundColor Red
            $testsFailed++
        }
        
        # Test 9: Check Progress
        Write-Host ""
        Write-Host "9. Testing Get Progress..." -ForegroundColor Yellow
        try {
            $progress = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/progress" -ErrorAction Stop
            Write-Host "   ✓ Progress: $($progress.data.progress_percentage)% ($($progress.data.responses_completed)/$($progress.data.total_questions) completed)" -ForegroundColor Green
            $testsPassed++
        } catch {
            Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
            $testsFailed++
        }
        
        # Test 10: Submit Assessment
        Write-Host ""
        Write-Host "10. Testing Submit Assessment..." -ForegroundColor Yellow
        try {
            $results = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/submit" `
                -Method Post `
                -ContentType "application/json" `
                -ErrorAction Stop
            
            $topMatch = $results.data.recommendations[0]
            $recCount = $results.data.recommendations.Count
            
            if ($recCount -eq 6) {
                Write-Host "   ✓ Assessment submitted - 6 ranked recommendations generated" -ForegroundColor Green
                Write-Host "     Top Match: $($topMatch.department_name) ($($topMatch.match_percentage)%)" -ForegroundColor Cyan
                Write-Host "     Score: $($topMatch.score) | Rank: $($topMatch.rank)" -ForegroundColor Cyan
                Write-Host "     Confidence: $($results.data.insights.confidence)" -ForegroundColor Cyan
                Write-Host "     Interpretation: $($results.data.insights.interpretation)" -ForegroundColor Cyan
                $testsPassed++
            } else {
                Write-Host "   ✗ Expected 6 recommendations, got $recCount" -ForegroundColor Red
                $testsFailed++
            }
        } catch {
            Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
            $testsFailed++
        }
        
        # Test 11: Get Results
        Write-Host ""
        Write-Host "11. Testing Get Results..." -ForegroundColor Yellow
        try {
            $finalResults = Invoke-RestMethod -Uri "$baseUrl/assessments/$assessmentId/results" -ErrorAction Stop
            if ($finalResults.data.recommendations.Count -eq 6) {
                Write-Host "   ✓ Results retrieved successfully" -ForegroundColor Green
                Write-Host "     Completed at: $($finalResults.data.completed_at)" -ForegroundColor Cyan
                $testsPassed++
            } else {
                Write-Host "   ✗ Invalid results data" -ForegroundColor Red
                $testsFailed++
            }
        } catch {
            Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
            $testsFailed++
        }
        
        # Test 12: Submit Feedback
        Write-Host ""
        Write-Host "12. Testing Submit Feedback..." -ForegroundColor Yellow
        try {
            $feedbackBody = @{
                assessment_id = $assessmentId
                rating = 5
                comment = "Automated test feedback - system working perfectly!"
                helpful = $true
                would_recommend = $true
            } | ConvertTo-Json
            
            $feedback = Invoke-RestMethod -Uri "$baseUrl/feedback" `
                -Method Post `
                -ContentType "application/json" `
                -Body $feedbackBody `
                -ErrorAction Stop
            
            Write-Host "   ✓ Feedback submitted successfully" -ForegroundColor Green
            Write-Host "     Feedback ID: $($feedback.data.feedback_id)" -ForegroundColor Cyan
            $testsPassed++
        } catch {
            Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
            $testsFailed++
        }
        
    } else {
        Write-Host "   ✗ Invalid assessment data" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "   ✗ Assessment flow failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Test 13: Get Feedback Stats
Write-Host ""
Write-Host "13. Testing Get Feedback Stats..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/feedback/stats" -ErrorAction Stop
    Write-Host "   ✓ Stats retrieved" -ForegroundColor Green
    Write-Host "     Total feedback: $($stats.data.total_feedback)" -ForegroundColor Cyan
    Write-Host "     Average rating: $($stats.data.average_rating)/5.0" -ForegroundColor Cyan
    Write-Host "     Helpful: $($stats.data.helpful_percentage)%" -ForegroundColor Cyan
    $testsPassed++
} catch {
    Write-Host "   ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testsFailed++
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Test Results Summary" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Tests Passed:  $testsPassed" -ForegroundColor Green
Write-Host "Tests Failed:  $testsFailed" -ForegroundColor $(if ($testsFailed -eq 0) { "Green" } else { "Red" })
Write-Host "Total Tests:   $($testsPassed + $testsFailed)" -ForegroundColor Cyan
Write-Host ""

$successRate = [math]::Round(($testsPassed / ($testsPassed + $testsFailed)) * 100, 1)
Write-Host "Success Rate:  $successRate%" -ForegroundColor $(if ($successRate -eq 100) { "Green" } elseif ($successRate -ge 80) { "Yellow" } else { "Red" })
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "🎉 All tests passed! Backend is fully functional." -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed. Please review the errors above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
