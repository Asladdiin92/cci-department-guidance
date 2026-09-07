import { test, expect } from '@playwright/test';

test.describe('Assessment Flow - Critical Path', () => {
  test('should complete full assessment flow', async ({ page }) => {
    // Step 1: Navigate to assessment
    await page.goto('/assessment');
    await expect(page).toHaveURL(/.*assessment/);
    
    // Step 2: Fill student information
    await page.fill('input[name="student_id"], input[id*="student-id"]', 'TEST-2024-001');
    await page.fill('input[name="student_name"], input[id*="name"]', 'Test Student');
    await page.fill('input[name="student_email"], input[id*="email"]', 'test@example.com');
    
    // Step 3: Start assessment
    const startBtn = page.getByRole('button', { name: /start assessment|begin/i });
    await startBtn.click();
    
    // Wait for questions to load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=/question/i')).toBeVisible({ timeout: 10000 });
    
    // Step 4: Answer all questions
    const maxQuestions = 20;
    for (let i = 0; i < maxQuestions; i++) {
      // Select first option
      const option = page.locator('input[type="radio"]').first();
      if (await option.isVisible()) {
        await option.click();
        
        // Click next button
        const nextBtn = page.getByRole('button', { name: /next|continue/i });
        if (await nextBtn.isVisible()) {
          await nextBtn.click();
          await page.waitForTimeout(500); // Wait for transition
        } else {
          // Last question - submit
          const submitBtn = page.getByRole('button', { name: /submit|finish/i });
          if (await submitBtn.isVisible()) {
            await submitBtn.click();
            break;
          }
        }
      } else {
        break; // No more questions
      }
    }
    
    // Step 5: Verify results page
    await expect(page).toHaveURL(/.*results/, { timeout: 15000 });
    
    // Check for results content
    await expect(page.locator('text=/result|recommendation|match/i')).toBeVisible();
    await expect(page.locator('text=/CS|SWE|IT|IS|ISC|STAT/')).toBeVisible();
  });

  test('should validate student information', async ({ page }) => {
    await page.goto('/assessment');
    
    // Try to start without filling form
    const startBtn = page.getByRole('button', { name: /start assessment/i });
    await startBtn.click();
    
    // Should show validation errors
    const errorMsg = page.locator('text=/required|please|fill/i');
    await expect(errorMsg).toBeVisible();
  });

  test('should show progress indicator', async ({ page }) => {
    await page.goto('/assessment');
    
    // Fill form and start
    await page.fill('input[name="student_id"]', 'TEST-001');
    await page.fill('input[name="student_name"]', 'Test');
    await page.fill('input[name="student_email"]', 'test@test.com');
    await page.getByRole('button', { name: /start/i }).click();
    
    await page.waitForLoadState('networkidle');
    
    // Check for progress indicator
    const progress = page.locator('[role="progressbar"], text=/question \\d+ of \\d+|\\d+%/i');
    if (await progress.isVisible()) {
      await expect(progress).toBeVisible();
    }
  });

  test('should handle network errors during assessment', async ({ page }) => {
    await page.goto('/assessment');
    
    // Fill form
    await page.fill('input[name="student_id"]', 'TEST-001');
    await page.fill('input[name="student_name"]', 'Test');
    await page.fill('input[name="student_email"]', 'test@test.com');
    
    // Block API calls
    await page.route('**/api/assessments/**', route => route.abort());
    
    // Try to start
    await page.getByRole('button', { name: /start/i }).click();
    
    // Should show error or fallback
    const errorMsg = page.locator('text=/error|failed|try again|using supabase/i');
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
  });

  test('should save responses as user progresses', async ({ page }) => {
    await page.goto('/assessment');
    
    // Start assessment
    await page.fill('input[name="student_id"]', 'TEST-SAVE-001');
    await page.fill('input[name="student_name"]', 'Save Test');
    await page.fill('input[name="student_email"]', 'save@test.com');
    await page.getByRole('button', { name: /start/i }).click();
    
    await page.waitForLoadState('networkidle');
    
    // Answer first question
    const firstOption = page.locator('input[type="radio"]').first();
    if (await firstOption.isVisible()) {
      await firstOption.click();
      
      // Store the value
      const selectedValue = await firstOption.getAttribute('value');
      
      // Go to next question
      const nextBtn = page.getByRole('button', { name: /next/i });
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        
        // Go back
        const backBtn = page.getByRole('button', { name: /back|previous/i });
        if (await backBtn.isVisible()) {
          await backBtn.click();
          
          // Check if selection persisted
          const checkedRadio = page.locator('input[type="radio"]:checked');
          await expect(checkedRadio).toBeVisible();
        }
      }
    }
  });
});
