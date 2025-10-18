import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MapRoutes } from '../../../map-routes';
@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  MapRoutes = MapRoutes;

  private authService = inject(AuthService);
  isLogin = signal(false);
  ngOnInit(): void {
    this.isLogin.set(this.authService.isLoggedIn());
  }
}
