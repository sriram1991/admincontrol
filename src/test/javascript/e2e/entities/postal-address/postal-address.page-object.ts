import { element, by, ElementFinder } from 'protractor';

export class PostalAddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-postal-address div table .btn-danger'));
  title = element.all(by.css('sys-postal-address div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('sysTranslate');
  }
}

export class PostalAddressUpdatePage {
  pageTitle = element(by.id('sys-postal-address-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  toNameInput = element(by.id('field_toName'));
  address1Input = element(by.id('field_address1'));
  address2Input = element(by.id('field_address2'));
  cityInput = element(by.id('field_city'));
  landmarkInput = element(by.id('field_landmark'));
  postalCodeInput = element(by.id('field_postalCode'));
  isIndianAddressInput = element(by.id('field_isIndianAddress'));
  noteInput = element(by.id('field_note'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('sysTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setToNameInput(toName: string): Promise<void> {
    await this.toNameInput.sendKeys(toName);
  }

  async getToNameInput(): Promise<string> {
    return await this.toNameInput.getAttribute('value');
  }

  async setAddress1Input(address1: string): Promise<void> {
    await this.address1Input.sendKeys(address1);
  }

  async getAddress1Input(): Promise<string> {
    return await this.address1Input.getAttribute('value');
  }

  async setAddress2Input(address2: string): Promise<void> {
    await this.address2Input.sendKeys(address2);
  }

  async getAddress2Input(): Promise<string> {
    return await this.address2Input.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setLandmarkInput(landmark: string): Promise<void> {
    await this.landmarkInput.sendKeys(landmark);
  }

  async getLandmarkInput(): Promise<string> {
    return await this.landmarkInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode: string): Promise<void> {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput(): Promise<string> {
    return await this.postalCodeInput.getAttribute('value');
  }

  getIsIndianAddressInput(): ElementFinder {
    return this.isIndianAddressInput;
  }

  async setNoteInput(note: string): Promise<void> {
    await this.noteInput.sendKeys(note);
  }

  async getNoteInput(): Promise<string> {
    return await this.noteInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PostalAddressDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-postalAddress-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-postalAddress'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('sysTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
