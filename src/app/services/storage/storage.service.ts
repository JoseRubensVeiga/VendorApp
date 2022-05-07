import { Injectable } from '@angular/core';
import { TokenResponse } from 'src/app/models/Token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get jwtData(): TokenResponse | null {
    return this.getFromStorage('VENDOR_USER_DATA', TokenResponse) ?? null;
  }

  set jwtData(jwtData: TokenResponse | null) {
    this.setToStorage('VENDOR_USER_DATA', jwtData);
  }

  getToken(): string | null {
    return this.jwtData?.token.access_token || null;
  }

  clear(): void {
    localStorage.clear();
  }

  private setToStorage(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  private getFromStorage(key: string, _class: new (data: any) => any): any {
    const itemString = localStorage.getItem(key);
    if (itemString) {
      const itemJson = this.safeJsonParse(itemString);
      return new _class(itemJson);
    }

    return null;
  }

  private safeJsonParse(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch {
      return null;
    }
  }
}
