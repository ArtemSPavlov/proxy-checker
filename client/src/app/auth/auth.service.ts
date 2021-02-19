import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKeyAccess = "auth-token";
  private tokenKeyRefresh = "refresh-token";

  constructor() {}

  getAccessTokenKey(): string {
    return this.tokenKeyAccess;
  }

  getRefreshTokenKey(): string {
    return this.tokenKeyRefresh;
  }

  getAccessToken(): string {
    return localStorage.getItem(this.tokenKeyAccess);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.tokenKeyRefresh);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.tokenKeyAccess, token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.tokenKeyRefresh, token);
  }

  removeTokens(): void {
    localStorage.removeItem(this.tokenKeyAccess);
    localStorage.removeItem(this.tokenKeyRefresh);
  }
}
