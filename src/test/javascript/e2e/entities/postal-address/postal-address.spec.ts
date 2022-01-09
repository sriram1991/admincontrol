import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostalAddressComponentsPage, PostalAddressDeleteDialog, PostalAddressUpdatePage } from './postal-address.page-object';

const expect = chai.expect;

describe('PostalAddress e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let postalAddressComponentsPage: PostalAddressComponentsPage;
  let postalAddressUpdatePage: PostalAddressUpdatePage;
  let postalAddressDeleteDialog: PostalAddressDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PostalAddresses', async () => {
    await navBarPage.goToEntity('postal-address');
    postalAddressComponentsPage = new PostalAddressComponentsPage();
    await browser.wait(ec.visibilityOf(postalAddressComponentsPage.title), 5000);
    expect(await postalAddressComponentsPage.getTitle()).to.eq('psApp.postalAddress.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(postalAddressComponentsPage.entities), ec.visibilityOf(postalAddressComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PostalAddress page', async () => {
    await postalAddressComponentsPage.clickOnCreateButton();
    postalAddressUpdatePage = new PostalAddressUpdatePage();
    expect(await postalAddressUpdatePage.getPageTitle()).to.eq('psApp.postalAddress.home.createOrEditLabel');
    await postalAddressUpdatePage.cancel();
  });

  it('should create and save PostalAddresses', async () => {
    const nbButtonsBeforeCreate = await postalAddressComponentsPage.countDeleteButtons();

    await postalAddressComponentsPage.clickOnCreateButton();

    await promise.all([
      postalAddressUpdatePage.setToNameInput('toName'),
      postalAddressUpdatePage.setAddress1Input('address1'),
      postalAddressUpdatePage.setAddress2Input('address2'),
      postalAddressUpdatePage.setCityInput('city'),
      postalAddressUpdatePage.setLandmarkInput('landmark'),
      postalAddressUpdatePage.setPostalCodeInput('postalCode'),
      postalAddressUpdatePage.getIsIndianAddressInput().click(),
      postalAddressUpdatePage.setNoteInput('note'),
    ]);

    await postalAddressUpdatePage.save();
    expect(await postalAddressUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await postalAddressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PostalAddress', async () => {
    const nbButtonsBeforeDelete = await postalAddressComponentsPage.countDeleteButtons();
    await postalAddressComponentsPage.clickOnLastDeleteButton();

    postalAddressDeleteDialog = new PostalAddressDeleteDialog();
    expect(await postalAddressDeleteDialog.getDialogTitle()).to.eq('psApp.postalAddress.delete.question');
    await postalAddressDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(postalAddressComponentsPage.title), 5000);

    expect(await postalAddressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
