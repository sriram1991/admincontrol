import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'status-category',
        data: { pageTitle: 'psApp.statusCategory.home.title' },
        loadChildren: () => import('./status-category/status-category.module').then(m => m.StatusCategoryModule),
      },
      {
        path: 'status',
        data: { pageTitle: 'psApp.status.home.title' },
        loadChildren: () => import('./status/status.module').then(m => m.StatusModule),
      },
      {
        path: 'party-type',
        data: { pageTitle: 'psApp.partyType.home.title' },
        loadChildren: () => import('./party-type/party-type.module').then(m => m.PartyTypeModule),
      },
      {
        path: 'party',
        data: { pageTitle: 'psApp.party.home.title' },
        loadChildren: () => import('./party/party.module').then(m => m.PartyModule),
      },
      {
        path: 'postal-address',
        data: { pageTitle: 'psApp.postalAddress.home.title' },
        loadChildren: () => import('./postal-address/postal-address.module').then(m => m.PostalAddressModule),
      },
      {
        path: 'pancard',
        data: { pageTitle: 'psApp.pancard.home.title' },
        loadChildren: () => import('./pancard/pancard.module').then(m => m.PancardModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
