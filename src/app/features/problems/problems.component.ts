import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ChevronLeftIcon,
  ClockIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { Question } from '../../interfaces/question';
import { MapRoutes } from '../../map-routes';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent implements OnInit {
  questions: Question[] = [
    {
      title: 'Triángulo con ángulos de 60°, 60° y X°',
      body: 'Si un triángulo tiene ángulos de 60°, 60° y X°, ¿cuál es el valor de X?',
      category: 'Math',
      explanation:
        'La suma de los ángulos internos de cualquier triángulo siempre es 180°. Por lo tanto: 60° + 60° + X° = 180° → 120° + X° = 180° → X° = 60°',
      tags: ['math', 'geometry', 'triangles'],
      choices: [
        { choice_text: '30°', is_correct: false },
        { choice_text: '45°', is_correct: false },
        { choice_text: '60°', is_correct: true },
        { choice_text: '90°', is_correct: false },
      ],
    },
    {
      title: 'Multiplicación de 15 × 3',
      body: '¿Cuál es el resultado de 15 × 3?',
      category: 'Math',
      explanation:
        '15 × 3 = 45. Esto se puede calcular como: 15 + 15 + 15 = 45, o 10 × 3 = 30 más 5 × 3 = 15, sumando 30 + 15 = 45.',
      tags: ['math', 'arithmetic', 'multiplication'],
      choices: [
        { choice_text: '35', is_correct: false },
        { choice_text: '45', is_correct: true },
        { choice_text: '50', is_correct: false },
        { choice_text: '55', is_correct: false },
      ],
    },
    {
      title: 'Ecuación lineal x + 5 = 12',
      body: 'Si x + 5 = 12, ¿cuál es el valor de x?',
      category: 'Math',
      explanation:
        'Para resolver x + 5 = 12, restamos 5 a ambos lados de la ecuación: x + 5 - 5 = 12 - 5 → x = 7',
      tags: ['math', 'algebra', 'equations'],
      choices: [
        { choice_text: '5', is_correct: false },
        { choice_text: '7', is_correct: true },
        { choice_text: '12', is_correct: false },
        { choice_text: '17', is_correct: false },
      ],
    },
  ];

  readonly MapRoutes = MapRoutes;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ClockIcon = ClockIcon;
  currentQuestionIndex = signal(0);
  currentQuestion = computed(() => this.questions[this.currentQuestionIndex()]);
  constructor(private auth: AuthService) {}
  answer = signal<boolean>(false);
  ngOnInit(): void {
    console.log('pre', this.currentQuestion());
  }

  logout() {
    this.auth.logout();
  }
}
