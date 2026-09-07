import { test, expect } from '@playwright/test';

test.describe('Departments Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/departments');
  });

  test('should load all 6 departments', async ({ page }) => {
    // Wait for departments to load
    await page.waitForLoadState('networkidle');
    
    // Check for department codes
    const departments = ['CS', 'SWE', 'IT', 'IS', 'ISC', 'STAT'];
    
    for (const dept of departments) {
      const deptElement = page.locator(`text=${dept}`).first();
      await expect(deptElement).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display department information', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check that department cards have required content
    const firstCard = page.locator('[class*="department"]').first();
    await expect(firstCard).toContainText(/computer science|software engineering|information/i);
  });

  test('should navigate to department details', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on first "Learn More" or department link
    const learnMoreBtn = page.getByRole('link', { name: /learn more|view details/i }).first();
    if (await learnMoreBtn.isVisible()) {
      await learnMoreBtn.click();
      await expect(page).toHaveURL(/.*departments\/[A-Z]+/);
    }
  });

  test('should show no technical jargon (lesson numbers, chapters)', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const pageContent = await page.textContent('body');
    
    // Should NOT contain these patterns
    expect(pageContent).not.toMatch(/Lesson \d+/);
    expect(pageContent).not.toMatch(/\d+ chapters?/);
    expect(pageContent).not.toMatch(/Google Drive/i);
    expect(pageContent).not.toMatch(/learnethiopia/i);
  });

  test('should handle empty/error state gracefully', async ({ page }) => {
    // Simulate network error
    await page.route('**/api/departments*', route => route.abort());
    
    await page.reload();
    
    // Should show error message or loading state
    const errorMsg = page.locator('text=/error|failed|try again/i');
    const loadingMsg = page.locator('text=/loading/i');
    
    await expect(errorMsg.or(loadingMsg)).toBeVisible({ timeout: 5000 });
  });
});
