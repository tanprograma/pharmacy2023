import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { OutletContainerComponent } from './components/outlet-container/outlet-container.component';
import { DispenseComponent } from './components/dispense/dispense.component';
import { IssueComponent } from './components/issue/issue.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { StatisticsContainerComponent } from './components/statistics-container/statistics-container.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DispenseContainerComponent } from './components/dispense-container/dispense-container.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { CreateStoreComponent } from './components/create-store/create-store.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { CreateMedicineComponent } from './components/create-medicine/create-medicine.component';
import { ImportMedicinesComponent } from './components/import-medicines/import-medicines.component';
import { ImportClientsComponent } from './components/import-clients/import-clients.component';
import { ImportStoresComponent } from './components/import-stores/import-stores.component';
import { ImportDispensedComponent } from './components/import-dispensed/import-dispensed.component';

import { StatisticSummaryComponent } from './components/statistic-summary/statistic-summary.component';
import { StatisticFormComponent } from './components/statistic-form/statistic-form.component';

import { StatisticHeaderComponent } from './components/statistic-header/statistic-header.component';

import { StatisticsSummaryViewComponent } from './components/statistics-summary-view/statistics-summary-view.component';
import { StatisticsScompositionComponent } from './components/statistics-scomposition/statistics-scomposition.component';
import { TimeoutComponent } from './components/timeout/timeout.component';
import { StatisticClinicSummaryComponent } from './components/statistic-clinic-summary/statistic-clinic-summary.component';
import { StatisticsClinicCompositionComponent } from './components/statistics-clinic-composition/statistics-clinic-composition.component';
import { StatisticsClinicViewComponent } from './components/statistics-clinic-view/statistics-clinic-view.component';
import { StatisticFormClinicComponent } from './components/statistic-form-clinic/statistic-form-clinic.component';
import { OrdersContainerComponent } from './components/orders-container/orders-container.component';
import { OrdersCreateComponent } from './components/orders-create/orders-create.component';
import { OrdersViewComponent } from './components/orders-view/orders-view.component';
import { OrdersEditComponent } from './components/orders-edit/orders-edit.component';
import { AdvertComponent } from './components/advert/advert.component';
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
import { StockComponent } from './components/stock/stock.component';
import { StockContainerComponent } from './components/stock-container/stock-container.component';
import { AddExpiryComponent } from './components/add-expiry/add-expiry.component';
import { AddExpiryContainerComponent } from './components/add-expiry-container/add-expiry-container.component';

@NgModule({
  declarations: [
    AppComponent,
    OutletContainerComponent,
    DispenseComponent,
    IssueComponent,
    AdminContainerComponent,
    StatisticsContainerComponent,
    LoaderComponent,
    DispenseContainerComponent,
    AdminMainComponent,
    CreateStoreComponent,
    CreateClientComponent,
    CreateMedicineComponent,
    ImportMedicinesComponent,
    ImportClientsComponent,
    ImportStoresComponent,
    ImportDispensedComponent,

    StatisticSummaryComponent,
    StatisticFormComponent,
    StatisticHeaderComponent,
    StatisticsSummaryViewComponent,
    StatisticsScompositionComponent,
    TimeoutComponent,
    StatisticClinicSummaryComponent,
    StatisticsClinicCompositionComponent,
    StatisticsClinicViewComponent,
    StatisticFormClinicComponent,
    OrdersContainerComponent,
    OrdersCreateComponent,
    OrdersViewComponent,
    OrdersEditComponent,
    AdvertComponent,
    ImportUnitsComponent,
    BackdateComponent,
    ImportInventoryComponent,
    BackdateIssueComponent,
    ImportDispensedServerComponent,
    ReceiveComponent,
    CreateSupplierComponent,
    ReportsComponent,
    AddInventoryComponent,
    AddInventoryContainerComponent,
    StockComponent,
    StockContainerComponent,
    AddExpiryComponent,
    AddExpiryContainerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(DbService, {
    //   dataEncapsulation: false,
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
