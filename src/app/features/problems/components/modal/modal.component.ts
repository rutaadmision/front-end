import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() isCorrect!: boolean;
  @Input() correctAnswer!: string;
  @Input() userAnswer!: string;
}
