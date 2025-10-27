export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.removeButtons = page.locator('button[id^="remove-"]');
  }

  async getCartItemsCount() {
    return await this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeItem(productName) {
    const item = this.page.locator('.cart_item', { hasText: productName });
    await item.locator('button').click();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}

