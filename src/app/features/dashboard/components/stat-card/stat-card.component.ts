import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ActivityIcon,
  CalendarDaysIcon,
  CircleCheck,
  LucideAngularModule,
  LucideIconData,
  Target,
} from 'lucide-angular';

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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stat-card.component.html',
  styles: [],
})
export class StatCardComponent {
  readonly CalendarDaysIcon = CalendarDaysIcon;

  @Input({ required: true }) config!: StatCardConfig;

  getIcon(): LucideIconData {
    switch (this.config.iconType) {
      case 'target':
        // Target/Bullseye icon
        return Target;
      case 'chart':
        // Chart/Trending up icon
        return CircleCheck;
      case 'streak':
        // Streak icon
        return ActivityIcon;
      default:
        return CalendarDaysIcon;
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

  getDefaultIconClass(): string {
    switch (this.config.iconType) {
      case 'target':
        return 'text-purple-600';
      case 'chart':
        return 'text-green-600';
      case 'streak':
        return 'text-orange-600';
      default:
        return 'text-gray-500';
    }
  }
}
