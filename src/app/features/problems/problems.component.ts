import { Component } from '@angular/core';
import {
  ChevronLeftIcon,
  ClockIcon,
  LucideAngularModule,
} from 'lucide-angular';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent {
  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ClockIcon = ClockIcon;
  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
