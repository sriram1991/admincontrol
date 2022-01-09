import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartyTypeComponentsPage, PartyTypeDeleteDialog, PartyTypeUpdatePage } from './party-type.page-object';

const expect = chai.expect;

describe('PartyType e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyTypeComponentsPage: PartyTypeComponentsPage;
  let partyTypeUpdatePage: PartyTypeUpdatePage;
  let partyTypeDeleteDialog: PartyTypeDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PartyTypes', async () => {
    await navBarPage.goToEntity('party-type');
    partyTypeComponentsPage = new PartyTypeComponentsPage();
    await browser.wait(ec.visibilityOf(partyTypeComponentsPage.title), 5000);
    expect(await partyTypeComponentsPage.getTitle()).to.eq('psApp.partyType.home.title');
    await browser.wait(ec.or(ec.visibilityOf(partyTypeComponentsPage.entities), ec.visibilityOf(partyTypeComponentsPage.noResult)), 1000);
  });

  it('should load create PartyType page', async () => {
    await partyTypeComponentsPage.clickOnCreateButton();
    partyTypeUpdatePage = new PartyTypeUpdatePage();
    expect(await partyTypeUpdatePage.getPageTitle()).to.eq('psApp.partyType.home.createOrEditLabel');
    await partyTypeUpdatePage.cancel();
  });

  it('should create and save PartyTypes', async () => {
    const nbButtonsBeforeCreate = await partyTypeComponentsPage.countDeleteButtons();

    await partyTypeComponentsPage.clickOnCreateButton();

    await promise.all([partyTypeUpdatePage.setNameInput('name'), partyTypeUpdatePage.setDescriptionInput('description')]);

    await partyTypeUpdatePage.save();
    expect(await partyTypeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PartyType', async () => {
    const nbButtonsBeforeDelete = await partyTypeComponentsPage.countDeleteButtons();
    await partyTypeComponentsPage.clickOnLastDeleteButton();

    partyTypeDeleteDialog = new PartyTypeDeleteDialog();
    expect(await partyTypeDeleteDialog.getDialogTitle()).to.eq('psApp.partyType.delete.question');
    await partyTypeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(partyTypeComponentsPage.title), 5000);

    expect(await partyTypeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
