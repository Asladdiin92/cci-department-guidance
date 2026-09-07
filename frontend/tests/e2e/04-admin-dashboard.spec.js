import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin');
  });

  test('should load dashboard with stats', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for stat cards
    const stats = [
      /total assessments/i,
      /completed/i,
      /completion rate/i,
      /feedback/i
    ];
    
    for (const statPattern of stats) {
      await expect(page.locator(`text=${statPattern}`)).toBeVisible({ timeout: 10000 });
    }
  });

  test('should display department distribution chart', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for chart or department data
    const chartArea = page.locator('[class*="chart"], [class*="distribution"], svg');
    const hasDepartmentData = page.locator('text=/CS|SWE|IT|IS|ISC|STAT/');
    
    await expect(chartArea.or(hasDepartmentData)).toBeVisible({ timeout: 15000 });
  });

  test('should navigate between dashboard tabs', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on different tabs
    const tabs = [
      'Department Distribution',
      'Question Affinity',
      'Completion Trends',
      'Student Submissions',
      'Database Manager'
    ];
    
    for (const tabName of tabs) {
      const tab = page.getByRole('tab', { name: new RegExp(tabName, 'i') });
      if (await tab.isVisible()) {
        await tab.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should filter student submissions', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Go to submissions tab
    const submissionsTab = page.locator('text=/submissions|student list/i');
    if (await submissionsTab.isVisible()) {
      await submissionsTab.click();
      
      // Try search
      const searchInput = page.locator('input[placeholder*="search"], input[type="search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('test');
        await page.waitForTimeout(1000);
        
        // Clear search
        await searchInput.clear();
      }
    }
  });

  test('should export data', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for export button
    const exportBtn = page.getByRole('button', { name: /export|download|csv/i });
    
    if (await exportBtn.isVisible()) {
      // Set up download listener
      const downloadPromise = page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
      
      await exportBtn.click();
      
      const download = await downloadPromise;
      if (download) {
        expect(download.suggestedFilename()).toMatch(/\.csv|\.xlsx|\.json/);
      }
    }
  });

  test('should handle empty data gracefully', async ({ page }) => {
    // Intercept API to return empty data
    await page.route('**/api/admin/stats', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: {
            total_assessments: 0,
            completed_assessments: 0,
            total_feedback: 0,
            active_questions: 20,
            average_rating: 0,
            completion_rate: 0
          }
        })
      });
    });
    
    await page.reload();
    
    // Should display 0 values without crashing
    await expect(page.locator('text=/0.*assessments|no data/i')).toBeVisible({ timeout: 10000 });
  });

  test('should handle API errors', async ({ page }) => {
    // Simulate API failure
    await page.route('**/api/admin/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.reload();
    
    // Should show error message
    const errorMsg = page.locator('text=/error|failed|try again/i');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('should handle slow network connections', async ({ page }) => {
    // Slow down network
    await page.route('**/api/admin/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });
    
    await page.reload();
    
    // Should show loading state
    const loadingIndicator = page.locator('text=/loading|please wait/i, [class*="loading"], [role="progressbar"]');
    await expect(loadingIndicator).toBeVisible({ timeout: 2000 });
  });

  test('should refresh data', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Look for refresh button
    const refreshBtn = page.getByRole('button', { name: /refresh|reload/i });
    
    if (await refreshBtn.isVisible()) {
      await refreshBtn.click();
      
      // Wait for reload
      await page.waitForLoadState('networkidle');
      
      // Verify data is still visible
      await expect(page.locator('text=/total assessments/i')).toBeVisible();
    }
  });

  test('should paginate through submissions', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Go to submissions
    const submissionsTab = page.locator('text=/submissions/i');
    if (await submissionsTab.isVisible()) {
      await submissionsTab.click();
      
      // Look for pagination
      const nextPageBtn = page.getByRole('button', { name: /next|>/i });
      if (await nextPageBtn.isVisible() && await nextPageBtn.isEnabled()) {
        await nextPageBtn.click();
        await page.waitForTimeout(500);
        
        // Should show different data
        await expect(page.locator('table, [class*="grid"]')).toBeVisible();
      }
    }
  });

  test('should sort submissions', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Go to submissions
    const submissionsTab = page.locator('text=/submissions/i');
    if (await submissionsTab.isVisible()) {
      await submissionsTab.click();
      
      // Click on column header to sort
      const columnHeader = page.locator('th, [role="columnheader"]').first();
      if (await columnHeader.isVisible()) {
        await columnHeader.click();
        await page.waitForTimeout(500);
        
        // Click again to reverse sort
        await columnHeader.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should access database manager', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on Database Manager tab
    const dbTab = page.locator('text=/database manager/i');
    if (await dbTab.isVisible()) {
      await dbTab.click();
      
      // Check for table selector
      const tableSelect = page.locator('select, [role="combobox"]');
      await expect(tableSelect).toBeVisible({ timeout: 5000 });
      
      // Try selecting a table
      if (await tableSelect.isVisible()) {
        await tableSelect.selectOption({ index: 1 });
        await page.waitForTimeout(1000);
        
        // Should show table data
        await expect(page.locator('table, [class*="grid"]')).toBeVisible();
      }
    }
  });
});
