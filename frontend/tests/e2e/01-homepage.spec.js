import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/CCI Department Guidance|Haramaya University/i);
    
    // Check hero section
    await expect(page.locator('h1')).toBeVisible();
    
    // Check navigation
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /departments/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /assessment/i })).toBeVisible();
  });

  test('should navigate to assessment page', async ({ page }) => {
    await page.getByRole('link', { name: /take assessment|start assessment/i }).first().click();
    await expect(page).toHaveURL(/.*assessment/);
  });

  test('should navigate to departments page', async ({ page }) => {
    await page.getByRole('link', { name: /departments/i }).click();
    await expect(page).toHaveURL(/.*departments/);
  });

  test('should display footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: /privacy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /terms/i })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      // Check mobile menu button exists
      const menuButton = page.getByRole('button', { name: /menu/i });
      if (await menuButton.isVisible()) {
        await menuButton.click();
        await expect(page.getByRole('navigation')).toBeVisible();
      }
    }
  });
});
