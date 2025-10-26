import { NgClass } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  ChevronLeftIcon,
  ClockIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
import { QuestionService } from '../../core/services/question.service';
import { Choice, Question } from '../../interfaces/question';
import { MapRoutes } from '../../map-routes';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, NgClass],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent implements OnInit {
  //questions: Question[] = [];

  questionService = inject(QuestionService);
  readonly MapRoutes = MapRoutes;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ClockIcon = ClockIcon;
  currentQuestionIndex = signal(0);
  //currentQuestion = signal<Question | null>(null);

  constructor(private auth: AuthService) {}
  answerText = signal<string>('');
  isCorrectAnswer = signal<boolean>(false);
  showModal = signal<boolean>(false);

  //Remplazo de los suscribe
  questions = toSignal(this.questionService.category('Math'), {
    initialValue: [],
  });

  currentQuestion = computed<Question>(() => {
    const questions = this.questions();
    const index = this.currentQuestionIndex();
    return questions[index] || null;
  });

  currentChoices = computed<Choice[]>(() => {
    const question = this.currentQuestion();
    return question?.choices ?? [];
  });

  ngOnInit(): void {
    //this.loadQuestions();
  }

  /*loadQuestions(): void {
    this.questionService.category('Math').subscribe({
      next: (data) => {
        this.questions = data;
        this.currentQuestion.set(this.questions[this.currentQuestionIndex()]);
      },
      error: (error) => {
        let errorMessage =
          error.message || 'Hubo un error al cargar las preguntas.';
        console.log(errorMessage);
      },
    });
  }*/

  handleAnswer(choice: Choice) {
    this.answerText.set(choice.choiceText);
    this.isCorrectAnswer.set(choice.is_correct);
  }

  nextQuestion() {
    this.currentQuestionIndex.update((i) => i + 1);
  }

  ValidateQuestion() {}

  logout() {
    this.auth.logout();
  }
}
