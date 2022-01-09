import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PancardComponentsPage, PancardDeleteDialog, PancardUpdatePage } from './pancard.page-object';

const expect = chai.expect;

describe('Pancard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pancardComponentsPage: PancardComponentsPage;
  let pancardUpdatePage: PancardUpdatePage;
  let pancardDeleteDialog: PancardDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pancards', async () => {
    await navBarPage.goToEntity('pancard');
    pancardComponentsPage = new PancardComponentsPage();
    await browser.wait(ec.visibilityOf(pancardComponentsPage.title), 5000);
    expect(await pancardComponentsPage.getTitle()).to.eq('psApp.pancard.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pancardComponentsPage.entities), ec.visibilityOf(pancardComponentsPage.noResult)), 1000);
  });

  it('should load create Pancard page', async () => {
    await pancardComponentsPage.clickOnCreateButton();
    pancardUpdatePage = new PancardUpdatePage();
    expect(await pancardUpdatePage.getPageTitle()).to.eq('psApp.pancard.home.createOrEditLabel');
    await pancardUpdatePage.cancel();
  });

  it('should create and save Pancards', async () => {
    const nbButtonsBeforeCreate = await pancardComponentsPage.countDeleteButtons();

    await pancardComponentsPage.clickOnCreateButton();

    await promise.all([
      pancardUpdatePage.setPanNumberInput('panNumber'),
      pancardUpdatePage.setAadhaarNumberInput('aadhaarNumber'),
      pancardUpdatePage.setAadhaarNameInput('aadhaarName'),
      pancardUpdatePage.setBirthDateInput('2000-12-31'),
      pancardUpdatePage.setImageUrlInput('imageUrl'),
      pancardUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pancardUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pancardUpdatePage.postalAddressSelectLastOption(),
      pancardUpdatePage.statusSelectLastOption(),
      pancardUpdatePage.partySelectLastOption(),
      pancardUpdatePage.modifiedSelectLastOption(),
    ]);

    await pancardUpdatePage.save();
    expect(await pancardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pancardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Pancard', async () => {
    const nbButtonsBeforeDelete = await pancardComponentsPage.countDeleteButtons();
    await pancardComponentsPage.clickOnLastDeleteButton();

    pancardDeleteDialog = new PancardDeleteDialog();
    expect(await pancardDeleteDialog.getDialogTitle()).to.eq('psApp.pancard.delete.question');
    await pancardDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(pancardComponentsPage.title), 5000);

    expect(await pancardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
