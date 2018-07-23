import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TransactionsListContainerComponent } from './containers/transactions-list-container/transactions-list-container.component';
import { TransactionsListPageComponent } from './components/transactions-list-page/transactions-list-page.component';
import { CategoriesListContainerComponent } from './containers/categories-list-container/categories-list-container.component';
import { CategoriesListPageComponent } from './components/categories-list-page/categories-list-page.component';

const COMPONENTS = [
  DashboardComponent,
  CategoriesListContainerComponent,
  CategoriesListPageComponent,
  TransactionsListContainerComponent,
  TransactionsListPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    SharedMaterialModule,
    DashboardRoutingModule,
  ],
  declarations: COMPONENTS
})
export class DashboardModule { }
