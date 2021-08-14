import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsQuantityReportComponent } from './details-quantity-report/details-quantity-report.component';
import { InfoEKYCComponent } from './info-e-kyc/info-e-kyc.component';
import { QuantityReportContentComponent } from './quantity-report-content/quantity-report-content.component';
import { TableDataComponent } from './quantity-report-content/table-data/table-data.component';
import { TableKHCNComponent } from './quantity-report-content/table-khcn/table-khcn.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'quantity-report' },
  {
    path: 'quantity-report',
    component: QuantityReportContentComponent,
    children: [
      {
        path: 'khcn',
        component: TableKHCNComponent,
      },
      {
        path: 'khtc',
        component: TableDataComponent,
      },
    ],
  },
  {
    path: 'details-quantity',
    component: DetailsQuantityReportComponent,
  },
  {
    path: 'info-ekyc',
    component: InfoEKYCComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
