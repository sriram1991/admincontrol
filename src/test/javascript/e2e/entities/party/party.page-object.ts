import { element, by, ElementFinder } from 'protractor';

export class PartyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('sys-party div table .btn-danger'));
  title = element.all(by.css('sys-party div h2#page-heading span')).first();
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

export class PartyUpdatePage {
  pageTitle = element(by.id('sys-party-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  firstNameInput = element(by.id('field_firstName'));
  middleNameInput = element(by.id('field_middleName'));
  lastNameInput = element(by.id('field_lastName'));
  genderSelect = element(by.id('field_gender'));
  birthDateInput = element(by.id('field_birthDate'));
  mobileNumberInput = element(by.id('field_mobileNumber'));
  emailInput = element(by.id('field_email'));
  isTemporaryPasswordInput = element(by.id('field_isTemporaryPassword'));
  profileImageUrlInput = element(by.id('field_profileImageUrl'));
  notesInput = element(by.id('field_notes'));

  userSelect = element(by.id('field_user'));
  partyTypeSelect = element(by.id('field_partyType'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('sysTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFirstNameInput(firstName: string): Promise<void> {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput(): Promise<string> {
    return await this.firstNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName: string): Promise<void> {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput(): Promise<string> {
    return await this.middleNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName: string): Promise<void> {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput(): Promise<string> {
    return await this.lastNameInput.getAttribute('value');
  }

  async setGenderSelect(gender: string): Promise<void> {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect(): Promise<string> {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption(): Promise<void> {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }

  async setBirthDateInput(birthDate: string): Promise<void> {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput(): Promise<string> {
    return await this.birthDateInput.getAttribute('value');
  }

  async setMobileNumberInput(mobileNumber: string): Promise<void> {
    await this.mobileNumberInput.sendKeys(mobileNumber);
  }

  async getMobileNumberInput(): Promise<string> {
    return await this.mobileNumberInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  getIsTemporaryPasswordInput(): ElementFinder {
    return this.isTemporaryPasswordInput;
  }

  async setProfileImageUrlInput(profileImageUrl: string): Promise<void> {
    await this.profileImageUrlInput.sendKeys(profileImageUrl);
  }

  async getProfileImageUrlInput(): Promise<string> {
    return await this.profileImageUrlInput.getAttribute('value');
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async partyTypeSelectLastOption(): Promise<void> {
    await this.partyTypeSelect.all(by.tagName('option')).last().click();
  }

  async partyTypeSelectOption(option: string): Promise<void> {
    await this.partyTypeSelect.sendKeys(option);
  }

  getPartyTypeSelect(): ElementFinder {
    return this.partyTypeSelect;
  }

  async getPartyTypeSelectedOption(): Promise<string> {
    return await this.partyTypeSelect.element(by.css('option:checked')).getText();
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

export class PartyDeleteDialog {
  private dialogTitle = element(by.id('sys-delete-party-heading'));
  private confirmButton = element(by.id('sys-confirm-delete-party'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('sysTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
