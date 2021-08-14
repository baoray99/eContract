import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
  isRolling = false;
  stickyCol() {
    var table = document.querySelector('.table-responsive');
    var x = table.scrollLeft;
    if (x > 0) {
      this.isRolling = true;
    } else this.isRolling = false;
  }
}
