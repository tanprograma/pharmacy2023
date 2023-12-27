import { Routes } from '@angular/router';
import { OutletContainerComponent } from './components/outlet-container/outlet-container.component';
import { DispenseComponent } from './components/dispense/dispense.component';
import { IssueComponent } from './components/issue/issue.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { StatisticsContainerComponent } from './components/statistics-container/statistics-container.component';
import { DispenseContainerComponent } from './components/dispense-container/dispense-container.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateMedicineComponent } from './components/create-medicine/create-medicine.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { ImportStoresComponent } from './components/import-stores/import-stores.component';
import { ImportMedicinesComponent } from './components/import-medicines/import-medicines.component';
import { ImportDispensedComponent } from './components/import-dispensed/import-dispensed.component';
import { ImportClientsComponent } from './components/import-clients/import-clients.component';

import { StatisticSummaryComponent } from './components/statistic-summary/statistic-summary.component';
import { TimeoutComponent } from './components/timeout/timeout.component';
import { StatisticClinicSummaryComponent } from './components/statistic-clinic-summary/statistic-clinic-summary.component';
import { OrdersCreateComponent } from './components/orders-create/orders-create.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { OrdersEditComponent } from './components/orders-edit/orders-edit.component';
import { OrdersContainerComponent } from './components/orders-container/orders-container.component';
import { ImportUnitsComponent } from './components/import-units/import-units.component';
import { BackdateComponent } from './components/backdate/backdate.component';
import { ImportInventoryComponent } from './components/import-inventory/import-inventory.component';
import { BackdateIssueComponent } from './components/backdate-issue/backdate-issue.component';
import { ImportDispensedServerComponent } from './components/import-dispensed-server/import-dispensed-server.component';
import { ReceiveComponent } from './components/receive/receive.component';
import { CreateSupplierComponent } from './components/create-supplier/create-supplier.component';
import { ReportsComponent } from './components/reports/reports.component';
import { AddInventoryComponent } from './components/add-inventory/add-inventory.component';
import { AddInventoryContainerComponent } from './components/add-inventory-container/add-inventory-container.component';
import { StockContainerComponent } from './components/stock-container/stock-container.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/outlet/dispense' },
  {
    path: 'outlet',

    component: OutletContainerComponent,
    children: [
      { path: 'dispense', component: DispenseContainerComponent },
      { path: 'issue', component: IssueComponent },
      { path: 'receive', component: ReceiveComponent },
    ],
  },
  {
    path: 'timeout',

    component: TimeoutComponent,
  },
  {
    path: 'admin',

    component: AdminContainerComponent,
    children: [
      { path: 'client/create', component: CreateClientComponent },
      { path: 'supplier/create', component: CreateSupplierComponent },
      { path: 'medicine/create', component: CreateMedicineComponent },
      { path: 'inventory/create', component: AddInventoryContainerComponent },
      { path: 'store/create', component: CreateStoreComponent },
      { path: 'stores/import', component: ImportStoresComponent },
      { path: 'units/import', component: ImportUnitsComponent },
      { path: 'medicines/import', component: ImportMedicinesComponent },
      { path: 'clients/import', component: ImportClientsComponent },
      { path: 'dispensed/import', component: ImportDispensedComponent },
      {
        path: 'dispensed/importserver',
        component: ImportDispensedServerComponent,
      },
      { path: 'inventory/import', component: ImportInventoryComponent },
    ],
  },
  {
    path: 'statistics',
    component: StatisticsContainerComponent,
    children: [
      { path: 'summary', component: StatisticSummaryComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'outlet/:outlet', component: StatisticClinicSummaryComponent },
    ],
  },
  {
    path: 'stock',
    component: StockContainerComponent,
  },
  {
    path: 'orders',
    component: OrdersContainerComponent,
    children: [
      { path: 'create', component: OrdersCreateComponent },
      { path: 'view', component: OrdersViewComponent },
      { path: 'edit/:id', component: OrdersEditComponent },
    ],
  },

  {
    path: 'backdate',
    component: BackdateComponent,
    // children: [
    //   { path: 'create', component: OrdersCreateComponent },
    //   { path: 'view', component: OrdersViewComponent },
    //   { path: 'edit/:id', component: OrdersEditComponent },
    // ],
  },
  {
    path: 'backdate/issue',
    component: BackdateIssueComponent,
    // children: [
    //   { path: 'create', component: OrdersCreateComponent },
    //   { path: 'view', component: OrdersViewComponent },
    //   { path: 'edit/:id', component: OrdersEditComponent },
    // ],
  },
];
