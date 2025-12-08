import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private STORAGE_KEY = 'sidebar-collapsed';

  collapsed = signal<boolean>(this.loadInitialState());

  constructor() {}

  toggle() {
    const newState = !this.collapsed();
    this.collapsed.set(newState);
    this.saveState(newState);
  }

  private loadInitialState(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved === 'true';
  }

  private saveState(state: boolean): void {
    localStorage.setItem(this.STORAGE_KEY, String(state));
  }
}
