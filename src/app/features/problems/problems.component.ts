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
  constructor(private auth: AuthService) { }

  userAnswer = signal<string>('');
  isCorrectAnswer = signal<boolean>(false);
  showModal = signal<boolean>(false);
  correctAnswerText = signal<string>('');
  endTest = signal<boolean>(false);
  showReview = signal<boolean>(false);
  currentQuestion = signal<Question | null>(null);
  selectedChoiceId = signal<string>('');


  @ViewChild('navigationDiv') navigationDiv!: ElementRef;


  //Remplazo de los suscribe
  //Se ejecuta al cargar el comoponente

  /*currentQuestion = computed<Question>(() => {
    const questions = this.questions();
    const index = this.currentQuestionIndex();
    return questions[index] || null;
  });*/

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
    this.loadQuestion();
  }

  loadQuestion(ifSolved: boolean = false): void {
    this.questionService.getQuestion({
      category: 'Math',
      solved: ifSolved,
      random: true,
      limit: 1
    }).subscribe({
      next: (question) => {
        if (question.length > 0) {
          this.currentQuestion.set(question[0]);
          this.userAnswer.set('');
          this.showReview.set(false);
        }

      },
      error: (error) => {
        let errorMessage =
          error.message || 'Hubo un error al cargar las preguntas.';
        console.log(errorMessage);
      }
    });
  }

  handleAnswer(choice: Choice) {
    this.userAnswer.set(choice.choiceText);
    this.selectedChoiceId.set(choice.id.toString());
  }

  nextQuestion() {
    this.loadQuestion();
  }


  validate() {
    this.questionService.submitAnswer(this.currentQuestion()!.id.toString(), this.selectedChoiceId()).subscribe({
      next: (result) => {
        this.isCorrectAnswer.set(result.isCorrect);
        this.correctAnswerText.set(
          this.currentChoices().find((choice) => choice.isCorrect)!.choiceText
        );
        this.showReview.set(true);
      },
      error: (error) => {
        let errorMessage =
          error.message || 'Hubo un error al cargar las preguntas.';
        console.log(errorMessage);
      }
    });


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
