import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor() {}
  isShow = false;
  ngOnInit(): void {}
  toggleDrop() {
    this.isShow = !this.isShow;
  }
}
