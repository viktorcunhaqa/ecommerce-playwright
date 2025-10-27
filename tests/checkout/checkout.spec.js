import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, checkoutInfo } from '../fixtures/testData';

test.describe('Checkout Flow Tests', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addMultipleProductsToCart(products);
    await inventoryPage.goToCart();
  });

  test('should complete full checkout process', async () => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.continue();
    await checkoutPage.finishCheckout();
    
    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
  });

  test('should show error when checkout info is incomplete', async ({ page }) => {
    await cartPage.proceedToCheckout();
    await checkoutPage.continue();
    
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
  });

  test('should display correct total price', async () => {
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await checkoutPage.continue();
    
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeGreaterThan(0);
  });
});