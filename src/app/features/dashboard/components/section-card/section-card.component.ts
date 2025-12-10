import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BookOpenCheckIcon,
  LightbulbIcon,
  LucideAngularModule,
  LucideIconData,
  MessageSquareDiffIcon,
  NotebookTextIcon,
} from 'lucide-angular';

export type SectionIconType = 'math' | 'reading' | 'reasoning' | 'general';

export interface SectionCardConfig {
  title: string;
  icon: SectionIconType;
  completedQuestions: number;
  totalQuestions: number;
  progress: number; // 0-100
  iconColor: string;
  iconBgColor: string;
  progressBarClass: string;
}

@Component({
  selector: 'app-section-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './section-card.component.html',
  styles: [],
})
export class SectionCardComponent {
  @Input({ required: true }) config!: SectionCardConfig;
  @Output() practice = new EventEmitter<void>();
  @Output() viewResults = new EventEmitter<void>();

  onPractice(): void {
    this.practice.emit();
  }

  onViewResults(): void {
    this.viewResults.emit();
  }

  getIcon(): LucideIconData {
    switch (this.config.icon) {
      case 'math':
        // Calculator/Math icon
        return MessageSquareDiffIcon;
      case 'reading':
        // Book/Reading icon
        return BookOpenCheckIcon;
      case 'reasoning':
        // Brain/Lightbulb icon
        return LightbulbIcon;
      case 'general':
        // Document/List icon
        return NotebookTextIcon;
      default:
        return NotebookTextIcon;
    }
  }

  getDefaultIconClass(): string {
    switch (this.config.icon) {
      case 'math':
        return 'text-purple-600';
      case 'reading':
        return 'text-green-600';
      case 'reasoning':
        return 'text-orange-600';
      case 'general':
        return 'text-orange-600';
      default:
        return 'text-gray-500';
    }
  }
}
