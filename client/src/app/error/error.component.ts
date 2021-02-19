import { Component, OnInit } from '@angular/core';
import { ErrorService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public error: any;

  constructor(
    private errorService: ErrorService
  ) {
    this.error = this.errorService.getError();
   }

  ngOnInit(): void {
  }

}
