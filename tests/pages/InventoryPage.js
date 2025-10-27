export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  // tornar o seletor mais tolerante: aceita tanto o atributo data-test quanto a classe conhecida
  this.sortDropdown = page.locator('select.product_sort_container, [data-test="product_sort_container"]');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async isInventoryDisplayed() {
    return await this.inventoryContainer.isVisible();
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    await product.locator('button').click();
  }

  async addMultipleProductsToCart(productNames) {
    for (const name of productNames) {
      await this.addProductToCart(name);
    }
  }

  async getCartItemCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.textContent());
    }
    return 0;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async sortProducts(option) {
    // aguardar o dropdown ficar visível antes de selecionar para evitar timeouts intermitentes
    await this.sortDropdown.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await this.sortDropdown.selectOption(option);
  }

  async getProductPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(p => parseFloat(p.replace('$', '')));
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
