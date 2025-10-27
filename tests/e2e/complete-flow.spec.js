import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, checkoutInfo } from '../fixtures/testData';

test.describe('End-to-End Complete Flow', () => {
  test('should complete full purchase journey from login to confirmation', async ({ page }) => {
    // Initialize pages
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.inventoryContainer).toBeVisible();

    // Step 2: Browse and add products
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    await inventoryPage.addMultipleProductsToCart(products);
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(products.length);

    // Step 3: View cart
    await inventoryPage.goToCart();
    const cartItems = await cartPage.getCartItemsCount();
    expect(cartItems).toBe(products.length);

    // Step 4: Checkout
    await cartPage.proceedToCheckout();
    
    await checkoutPage.fillCheckoutInfo(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    
    await checkoutPage.continue();

    // Step 5: Verify order and complete
    const totalPrice = await checkoutPage.getTotalPrice();
    expect(totalPrice).toBeGreaterThan(0);

    await checkoutPage.finishCheckout();

    // Step 6: Verify order confirmation
    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
    
    // Verify URL
    expect(page.url()).toContain('checkout-complete');
  });
});