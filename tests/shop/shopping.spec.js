import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users, products } from '../fixtures/testData';

test.describe('Shopping Flow Tests', () => {
  let loginPage, inventoryPage, cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('should display all products', async () => {
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should add single product to cart', async () => {
    await inventoryPage.addProductToCart(products[0]);
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });

  test('should add multiple products to cart', async () => {
    await inventoryPage.addMultipleProductsToCart(products);
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(products.length);
  });

  test('should remove product from cart', async () => {
    await inventoryPage.addMultipleProductsToCart(products);
    await inventoryPage.goToCart();
    
    const initialCount = await cartPage.getCartItemsCount();
    await cartPage.removeItem(products[0]);
    const finalCount = await cartPage.getCartItemsCount();
    
    expect(finalCount).toBe(initialCount - 1);
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.sortProducts('lohi');
    await inventoryPage.page.waitForTimeout(500); // Wait for sort
    
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.sortProducts('hilo');
    await inventoryPage.page.waitForTimeout(500);
    
    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});