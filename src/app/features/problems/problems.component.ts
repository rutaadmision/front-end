import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ChevronLeftIcon,
  ClockIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { MapRoutes } from '../../map-routes';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent implements OnInit {
  readonly questions = [
    {
      id: 1,
      category: 'Matemáticas y Lógica',
      question: 'Si x + 5 = 12, ¿cuál es el valor de x?',
      options: [
        { label: 'A.', value: '5' },
        { label: 'B.', value: '7' },
        { label: 'C.', value: '12' },
        { label: 'D.', value: '17' },
      ],
    },
    {
      id: 2,
      category: 'Matemáticas y Lógica',
      question: '¿Cuál es el resultado de 15 × 3?',
      options: [
        { label: 'A.', value: '35' },
        { label: 'B.', value: '45' },
        { label: 'C.', value: '50' },
        { label: 'D.', value: '55' },
      ],
    },
    {
      id: 3,
      category: 'Matemáticas y Lógica',
      question:
        'Si un triángulo tiene ángulos de 60°, 60° y X°, ¿cuál es el valor de X?',
      options: [
        { label: 'A.', value: '30°' },
        { label: 'B.', value: '45°' },
        { label: 'C.', value: '60°' },
        { label: 'D.', value: '90°' },
      ],
    },
  ];

  readonly MapRoutes = MapRoutes;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ClockIcon = ClockIcon;
  currentQuestionIndex = signal(0);
  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    console.log('pre', this.currentQuestion());
  }

  logout() {
    this.auth.logout();
  }
}
