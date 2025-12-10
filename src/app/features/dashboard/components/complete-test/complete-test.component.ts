import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-complete-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complete-test.component.html',
  styles: [],
})
export class SimulacroCompletoComponent {
  @Output() startSimulacro = new EventEmitter<void>();

  onStartSimulacro(): void {
    this.startSimulacro.emit();
  }
}
