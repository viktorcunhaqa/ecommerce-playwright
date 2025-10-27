import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../fixtures/testData';

test.describe('Authentication Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    expect(page.url()).toContain('/inventory.html');
  });

  test('should show error message with invalid credentials', async () => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  test('should show error message for locked out user', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Sorry, this user has been locked out');
  });

  test('should show error message with empty credentials', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username is required');
  });

  test('should logout successfully', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.logout();
    expect(page.url()).toBe('https://www.saucedemo.com/');
  });
});