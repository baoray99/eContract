import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-khcn',
  templateUrl: './table-khcn.component.html',
  styleUrls: ['./table-khcn.component.scss'],
})
export class TableKHCNComponent implements OnInit {
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
