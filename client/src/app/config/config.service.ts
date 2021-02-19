import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../assets/config'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getConfig() {
    return CONFIG;
  }
}
