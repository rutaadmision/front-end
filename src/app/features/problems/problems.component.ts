import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-problems',
  standalone: true,
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css'],
})
export class ProblemsComponent {
  constructor(private auth: AuthService) {}
  logout() {
    this.auth.logout();
  }
}
