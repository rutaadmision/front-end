import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CircleCheckBigIcon,
  CircleXIcon,
  LucideAngularModule,
} from 'lucide-angular';
@Component({
  selector: 'app-review-answer',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './review-answer.component.html',
  styleUrl: './review-answer.component.css',
})
export class ReviewAnswerComponent {
  readonly CircleCheckBigIcon = CircleCheckBigIcon;
  readonly CircleXIcon = CircleXIcon;
  @Input() isCorrect!: boolean;
  @Input() correctAnswer!: string;
  @Input() userAnswer!: string;
  @Input() explanation!: string;
  @Input() showReview!: boolean;
}
