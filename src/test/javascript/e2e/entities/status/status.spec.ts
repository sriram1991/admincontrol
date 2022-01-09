import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StatusComponentsPage, StatusDeleteDialog, StatusUpdatePage } from './status.page-object';

const expect = chai.expect;

describe('Status e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let statusComponentsPage: StatusComponentsPage;
  let statusUpdatePage: StatusUpdatePage;
  let statusDeleteDialog: StatusDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Statuses', async () => {
    await navBarPage.goToEntity('status');
    statusComponentsPage = new StatusComponentsPage();
    await browser.wait(ec.visibilityOf(statusComponentsPage.title), 5000);
    expect(await statusComponentsPage.getTitle()).to.eq('psApp.status.home.title');
    await browser.wait(ec.or(ec.visibilityOf(statusComponentsPage.entities), ec.visibilityOf(statusComponentsPage.noResult)), 1000);
  });

  it('should load create Status page', async () => {
    await statusComponentsPage.clickOnCreateButton();
    statusUpdatePage = new StatusUpdatePage();
    expect(await statusUpdatePage.getPageTitle()).to.eq('psApp.status.home.createOrEditLabel');
    await statusUpdatePage.cancel();
  });

  it('should create and save Statuses', async () => {
    const nbButtonsBeforeCreate = await statusComponentsPage.countDeleteButtons();

    await statusComponentsPage.clickOnCreateButton();

    await promise.all([
      statusUpdatePage.setNameInput('name'),
      statusUpdatePage.setSequenceNoInput('5'),
      statusUpdatePage.setDescriptionInput('description'),
      statusUpdatePage.categorySelectLastOption(),
    ]);

    await statusUpdatePage.save();
    expect(await statusUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await statusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Status', async () => {
    const nbButtonsBeforeDelete = await statusComponentsPage.countDeleteButtons();
    await statusComponentsPage.clickOnLastDeleteButton();

    statusDeleteDialog = new StatusDeleteDialog();
    expect(await statusDeleteDialog.getDialogTitle()).to.eq('psApp.status.delete.question');
    await statusDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(statusComponentsPage.title), 5000);

    expect(await statusComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
