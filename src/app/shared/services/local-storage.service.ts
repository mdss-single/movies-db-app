import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage.token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly storage: Storage) {}

  setItem(key: string, value: unknown): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): string | null {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }
}
