import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

import { ValidateUserDto } from '../../dto/validate-user.dto';

@Injectable({
  providedIn: 'root'
})
export class AddDialogService {

  private responseError: any;

  constructor(
    private apiService: ApiService,
  ) { }

  singIn(requestData: ValidateUserDto): void {

  }

  setError(data: any): void {
    this.responseError = data;
  }

  getError(): any {
    return this.responseError;
  }
}
