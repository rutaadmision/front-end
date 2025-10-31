import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../core/services/api/stats.service';
import { SimulacroCompletoComponent } from './components/complete-test/complete-test.component';
import {
  SectionCardComponent,
  SectionCardConfig,
} from './components/section-card/section-card.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    StatCardComponent,
    SectionCardComponent,
    SimulacroCompletoComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userStats: any;

  constructor(public statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getUserStats().subscribe({
      next: (data) => {
        this.userStats = data;
      },
      error: (err) => {
        console.error('Error fetching user stats', err);
      },
    });
  }

  mathSection: SectionCardConfig = {
    title: 'Matemáticas y Lógica',
    icon: 'math',
    iconColor: '#9333ea',
    iconBgColor: 'bg-purple-100',
    completedQuestions: 5,
    totalQuestions: 200,
    progress: 90,
    progressBarClass: 'bg-purple-600',
  };

  readingSection: SectionCardConfig = {
    title: 'Comprensión Lectora',
    icon: 'reading',
    iconColor: '#2563eb',
    iconBgColor: 'bg-blue-100',
    completedQuestions: 90,
    totalQuestions: 200,
    progress: 45,
    progressBarClass: 'bg-blue-600',
  };

  reasoningSection: SectionCardConfig = {
    title: 'Razonamiento Verbal',
    icon: 'reasoning',
    iconColor: '#059669',
    iconBgColor: 'bg-green-100',
    completedQuestions: 156,
    totalQuestions: 200,
    progress: 78,
    progressBarClass: 'bg-green-600',
  };

  generalSection: SectionCardConfig = {
    title: 'Conocimientos Generales',
    icon: 'general',
    iconColor: '#ea580c',
    iconBgColor: 'bg-orange-100',
    completedQuestions: 64,
    totalQuestions: 200,
    progress: 32,
    progressBarClass: 'bg-orange-600',
  };

  // Event Handlers
  onPracticeMath(): void {
    console.log('Navigate to Math practice');
    // Add navigation logic here
  }

  onViewMathResults(): void {
    console.log('Navigate to Math results');
    // Add navigation logic here
  }

  onPracticeReading(): void {
    console.log('Navigate to Reading practice');
  }

  onViewReadingResults(): void {
    console.log('Navigate to Reading results');
  }

  onPracticeReasoning(): void {
    console.log('Navigate to Reasoning practice');
  }

  onViewReasoningResults(): void {
    console.log('Navigate to Reasoning results');
  }

  onPracticeGeneral(): void {
    console.log('Navigate to General Knowledge practice');
  }

  onViewGeneralResults(): void {
    console.log('Navigate to General Knowledge results');
  }

  onStartSimulacro(): void {
    console.log('Starting full exam simulation...');
  }
}
