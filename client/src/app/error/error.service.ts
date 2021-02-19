import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private responseError: any;

  constructor() { }

  setError(data: any): void {
    this.responseError = data;
  }

  getError(): any {
    return this.responseError;
  }
}
