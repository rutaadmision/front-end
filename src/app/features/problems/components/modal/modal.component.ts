import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CircleCheckBigIcon,
  CircleXIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { MapRoutes } from '../../../../map-routes';
@Component({
  selector: 'app-modal',
  imports: [NgClass, LucideAngularModule, RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isCorrect!: boolean;
  @Input() correctAnswer!: string;
  @Input() userAnswer!: string;
  @Input() explanation!: string;
  @Output() exit = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  readonly MapRoutes = MapRoutes;
  readonly CircleCheckBigIcon = CircleCheckBigIcon;
  readonly CircleXIcon = CircleXIcon;

  nextQuestion() {
    this.next.emit();
  }
}
