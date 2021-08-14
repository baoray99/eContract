import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuantityReportContentComponent } from './quantity-report-content/quantity-report-content.component';
import { SelectBarComponent } from './quantity-report-content/select-bar/select-bar.component';
import { TableDataComponent } from './quantity-report-content/table-data/table-data.component';
import { TableKHCNComponent } from './quantity-report-content/table-khcn/table-khcn.component';
import { DetailsQuantityReportComponent } from './details-quantity-report/details-quantity-report.component';
import { DetailsComponent } from './details-quantity-report/details/details.component';
import { DetailsUserComponent } from './details-quantity-report/details-user/details-user.component';
import { InfoEKYCComponent } from './info-e-kyc/info-e-kyc.component';
import { ModalSuccessComponent } from './info-e-kyc/modal-success/modal-success.component';
import { ModalFailComponent } from './info-e-kyc/modal-fail/modal-fail.component';

@NgModule({
  declarations: [
    AppComponent,
    QuantityReportContentComponent,
    SelectBarComponent,
    TableDataComponent,
    DetailsQuantityReportComponent,
    DetailsComponent,
    DetailsUserComponent,
    TableKHCNComponent,
    InfoEKYCComponent,
    ModalSuccessComponent,

    ModalFailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
