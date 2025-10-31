// stat-card.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type StatIconType = 'target' | 'chart' | 'streak';

export interface StatCardConfig {
  label: string;
  value: string | number;
  iconType: StatIconType;
  iconColor?: string;
  iconBgColor?: string;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styles: [],
})
export class StatCardComponent {
  @Input({ required: true }) config!: StatCardConfig;

  getIconPath(): string {
    switch (this.config.iconType) {
      case 'target':
        // Target/Bullseye icon
        return 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z';
      case 'chart':
        // Chart/Trending up icon
        return 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z';
      case 'streak':
        // Streak icon
        return 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z';
      default:
        return '';
    }
  }

  getIconBgClass(): string {
    if (this.config.iconBgColor) {
      return '';
    }
    switch (this.config.iconType) {
      case 'target':
        return 'bg-purple-100';
      case 'chart':
        return 'bg-green-100';
      case 'streak':
        return 'bg-orange-100';
      default:
        return 'bg-gray-100';
    }
  }

  getDefaultIconColor(): string {
    switch (this.config.iconType) {
      case 'target':
        return '#9333ea'; // purple-600
      case 'chart':
        return '#059669'; // green-600
      case 'streak':
        return '#ea580c'; // orange-600
      default:
        return '#6b7280'; // gray-500
    }
  }
}
