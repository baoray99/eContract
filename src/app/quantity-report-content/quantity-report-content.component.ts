import { Component, OnInit } from '@angular/core';

interface CateButton {
  type: Category;
  label: string;
  isActive: boolean;
  icon: string;
  route: string;
}
enum Category {
  KHCN,
  KHTC,
  KHTH,
}
@Component({
  selector: 'app-quantity-report-content',
  templateUrl: './quantity-report-content.component.html',
  styleUrls: ['./quantity-report-content.component.scss'],
})
export class QuantityReportContentComponent implements OnInit {
  constructor() {}
  cateButton: CateButton[] = [
    {
      type: Category.KHCN,
      label: 'Khách hàng cá nhân',
      isActive: true,
      icon: 'fa-user',
      route: 'khcn',
    },
    {
      type: Category.KHTC,
      label: 'Khách hàng tổ chức',
      isActive: false,
      icon: 'fa-store-alt',
      route: 'khtc',
    },
    {
      type: Category.KHTH,
      label: 'Khách hàng tích hợp',
      isActive: false,
      icon: 'fa-globe',
      route: 'khth',
    },
  ];
  ngOnInit(): void {}
  changeActive(type: Category) {
    this.setActiveBtn(type);
  }
  private setActiveBtn(type: Category) {
    this.cateButton.forEach((btn) => (btn.isActive = btn.type === type));
  }
}
