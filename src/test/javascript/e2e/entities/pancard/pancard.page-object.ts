import { element, by, ElementFinder } from 'protractor';

export class PancardComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-pancard div table .btn-danger'));
  title = element.all(by.css('sys-pancard div h2#page-heading span')).first();
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

export class PancardUpdatePage {
  pageTitle = element(by.id('sys-pancard-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  panNumberInput = element(by.id('field_panNumber'));
  aadhaarNumberInput = element(by.id('field_aadhaarNumber'));
  aadhaarNameInput = element(by.id('field_aadhaarName'));
  birthDateInput = element(by.id('field_birthDate'));
  imageUrlInput = element(by.id('field_imageUrl'));
  createdAtInput = element(by.id('field_createdAt'));
  updatedAtInput = element(by.id('field_updatedAt'));

  postalAddressSelect = element(by.id('field_postalAddress'));
  statusSelect = element(by.id('field_status'));
  partySelect = element(by.id('field_party'));
  modifiedSelect = element(by.id('field_modified'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('sysTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPanNumberInput(panNumber: string): Promise<void> {
    await this.panNumberInput.sendKeys(panNumber);
  }

  async getPanNumberInput(): Promise<string> {
    return await this.panNumberInput.getAttribute('value');
  }

  async setAadhaarNumberInput(aadhaarNumber: string): Promise<void> {
    await this.aadhaarNumberInput.sendKeys(aadhaarNumber);
  }

  async getAadhaarNumberInput(): Promise<string> {
    return await this.aadhaarNumberInput.getAttribute('value');
  }

  async setAadhaarNameInput(aadhaarName: string): Promise<void> {
    await this.aadhaarNameInput.sendKeys(aadhaarName);
  }

  async getAadhaarNameInput(): Promise<string> {
    return await this.aadhaarNameInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate: string): Promise<void> {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput(): Promise<string> {
    return await this.birthDateInput.getAttribute('value');
  }

  async setImageUrlInput(imageUrl: string): Promise<void> {
    await this.imageUrlInput.sendKeys(imageUrl);
  }

  async getImageUrlInput(): Promise<string> {
    return await this.imageUrlInput.getAttribute('value');
  }

  async setCreatedAtInput(createdAt: string): Promise<void> {
    await this.createdAtInput.sendKeys(createdAt);
  }

  async getCreatedAtInput(): Promise<string> {
    return await this.createdAtInput.getAttribute('value');
  }

  async setUpdatedAtInput(updatedAt: string): Promise<void> {
    await this.updatedAtInput.sendKeys(updatedAt);
  }

  async getUpdatedAtInput(): Promise<string> {
    return await this.updatedAtInput.getAttribute('value');
  }

  async postalAddressSelectLastOption(): Promise<void> {
    await this.postalAddressSelect.all(by.tagName('option')).last().click();
  }

  async postalAddressSelectOption(option: string): Promise<void> {
    await this.postalAddressSelect.sendKeys(option);
  }

  getPostalAddressSelect(): ElementFinder {
    return this.postalAddressSelect;
  }

  async getPostalAddressSelectedOption(): Promise<string> {
    return await this.postalAddressSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async statusSelectOption(option: string): Promise<void> {
    await this.statusSelect.sendKeys(option);
  }

  getStatusSelect(): ElementFinder {
    return this.statusSelect;
  }

  async getStatusSelectedOption(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async partySelectLastOption(): Promise<void> {
    await this.partySelect.all(by.tagName('option')).last().click();
  }

  async partySelectOption(option: string): Promise<void> {
    await this.partySelect.sendKeys(option);
  }

  getPartySelect(): ElementFinder {
    return this.partySelect;
  }

  async getPartySelectedOption(): Promise<string> {
    return await this.partySelect.element(by.css('option:checked')).getText();
  }

  async modifiedSelectLastOption(): Promise<void> {
    await this.modifiedSelect.all(by.tagName('option')).last().click();
  }

  async modifiedSelectOption(option: string): Promise<void> {
    await this.modifiedSelect.sendKeys(option);
  }

  getModifiedSelect(): ElementFinder {
    return this.modifiedSelect;
  }

  async getModifiedSelectedOption(): Promise<string> {
    return await this.modifiedSelect.element(by.css('option:checked')).getText();
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

export class PancardDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-pancard-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-pancard'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('sysTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
