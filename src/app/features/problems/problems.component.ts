import { NgClass } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
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
import { FinishScreenComponent } from './components/finish-screen/finish-screen.component';
import { ReviewAnswerComponent } from './components/review-answer/review-answer.component';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    NgClass,
    ReviewAnswerComponent,
    FinishScreenComponent,
  ],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent implements OnInit, AfterViewChecked {
  questionService = inject(QuestionService);
  readonly MapRoutes = MapRoutes;
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ClockIcon = ClockIcon;
  currentQuestionIndex = signal(0);
  constructor(private auth: AuthService) {}

  userAnswer = signal<string>('');
  isCorrectAnswer = signal<boolean>(false);
  showModal = signal<boolean>(false);
  correctAnswer = signal<string>('');
  endTest = signal<boolean>(false);
  showReview = signal<boolean>(false);
  @ViewChild('navigationDiv') navigationDiv!: ElementRef;
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

  ngAfterViewChecked(): void {
    if (this.showReview()) {
      this.scrollToElement();
    }
  }

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
    this.userAnswer.set(choice.choiceText);
    this.isCorrectAnswer.set(choice.isCorrect);
  }

  nextQuestion() {
    this.userAnswer.set('');
    this.showReview.set(false);
    if (this.currentQuestionIndex() + 1 == this.questions().length) {
      this.endTest.set(true);
    } else {
      this.currentQuestionIndex.update((i) => i + 1);
    }
  }

  validate() {
    this.correctAnswer.set(
      this.currentChoices().find((choice) => choice.isCorrect)!.choiceText
    );
    this.showReview.set(true);
  }

  scrollToElement() {
    this.navigationDiv?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }

  logout() {
    this.auth.logout();
  }
}
