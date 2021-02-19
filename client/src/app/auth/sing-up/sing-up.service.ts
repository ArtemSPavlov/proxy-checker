import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable({
  providedIn: 'root'
})
export class SingUpService {

  constructor(
    private apiService: ApiService
  ) { }

  async createUser(data: CreateUserDto) {
    return this.apiService.registration(data).toPromise();
  }
}
