import { Component, OnInit } from '@angular/core';
interface checkboxProv {
  name: string;
  isChecked: boolean;
}
@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.scss'],
})
export class SelectBarComponent implements OnInit {
  constructor() {}
  provinces: checkboxProv[] = [
    { name: 'Tất cả', isChecked: false },
    { name: 'Tỉnh An Giang', isChecked: false },
    { name: 'Thành phố Hà Nội', isChecked: false },
    { name: 'Tỉnh Bà Rịa - Vũng Tàu', isChecked: false },
    { name: 'Thành phố Hồ Chí Minh', isChecked: false },
    { name: 'Tỉnh Bạc Liêu', isChecked: false },
  ];
  isClick = false;
  arrCheck = [];
  lenght = 0;
  ngOnInit(): void {}
  toggleProv() {
    this.isClick = !this.isClick;
  }
}
