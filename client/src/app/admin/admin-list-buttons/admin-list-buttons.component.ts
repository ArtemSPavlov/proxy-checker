import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-list-buttons',
  templateUrl: './admin-list-buttons.component.html',
  styleUrls: ['./admin-list-buttons.component.scss']
})
export class AdminListButtonsComponent implements OnInit {
  @Input() status: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
