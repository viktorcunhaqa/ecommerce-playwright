export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
    this.totalPrice = page.locator('.summary_total_label');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getConfirmationMessage() {
    return await this.completeHeader.textContent();
  }

  async getTotalPrice() {
    const text = await this.totalPrice.textContent();
    return parseFloat(text.replace('Total: $', ''));
  }
}
