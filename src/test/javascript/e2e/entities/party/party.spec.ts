import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartyComponentsPage, PartyDeleteDialog, PartyUpdatePage } from './party.page-object';

const expect = chai.expect;

describe('Party e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyComponentsPage: PartyComponentsPage;
  let partyUpdatePage: PartyUpdatePage;
  let partyDeleteDialog: PartyDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parties', async () => {
    await navBarPage.goToEntity('party');
    partyComponentsPage = new PartyComponentsPage();
    await browser.wait(ec.visibilityOf(partyComponentsPage.title), 5000);
    expect(await partyComponentsPage.getTitle()).to.eq('psApp.party.home.title');
    await browser.wait(ec.or(ec.visibilityOf(partyComponentsPage.entities), ec.visibilityOf(partyComponentsPage.noResult)), 1000);
  });

  it('should load create Party page', async () => {
    await partyComponentsPage.clickOnCreateButton();
    partyUpdatePage = new PartyUpdatePage();
    expect(await partyUpdatePage.getPageTitle()).to.eq('psApp.party.home.createOrEditLabel');
    await partyUpdatePage.cancel();
  });

  it('should create and save Parties', async () => {
    const nbButtonsBeforeCreate = await partyComponentsPage.countDeleteButtons();

    await partyComponentsPage.clickOnCreateButton();

    await promise.all([
      partyUpdatePage.setFirstNameInput('firstName'),
      partyUpdatePage.setMiddleNameInput('middleName'),
      partyUpdatePage.setLastNameInput('lastName'),
      partyUpdatePage.genderSelectLastOption(),
      partyUpdatePage.setBirthDateInput('2000-12-31'),
      partyUpdatePage.setMobileNumberInput('mobileNumber'),
      partyUpdatePage.setEmailInput('email'),
      partyUpdatePage.getIsTemporaryPasswordInput().click(),
      partyUpdatePage.setProfileImageUrlInput('profileImageUrl'),
      partyUpdatePage.setNotesInput('notes'),
      partyUpdatePage.userSelectLastOption(),
      partyUpdatePage.partyTypeSelectLastOption(),
    ]);

    await partyUpdatePage.save();
    expect(await partyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Party', async () => {
    const nbButtonsBeforeDelete = await partyComponentsPage.countDeleteButtons();
    await partyComponentsPage.clickOnLastDeleteButton();

    partyDeleteDialog = new PartyDeleteDialog();
    expect(await partyDeleteDialog.getDialogTitle()).to.eq('psApp.party.delete.question');
    await partyDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(partyComponentsPage.title), 5000);

    expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
