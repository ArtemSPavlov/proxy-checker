import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

import { ValidateUserDto } from '../../dto/validate-user.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  private responseError: any;

  constructor(
    private apiService: ApiService,
  ) { }

  setRequest(requestData: ValidateUserDto): Observable<string> {
    return this.apiService.changePassword(requestData);
  }

  setError(data: any): void {
    this.responseError = data;
  }

  getError(): any {
    return this.responseError;
  }
}
