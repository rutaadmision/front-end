import { Component, inject, OnInit } from '@angular/core';
import { QuestionService } from '../../core/services/question.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  questionService = inject(QuestionService);

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.category().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        let errorMessage =
          error.message || 'Hubo un error al cargar las preguntas.';
        console.log(errorMessage);
      },
    });
  }
}
