import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LogOutIcon,
  LucideAngularModule,
  TargetIcon,
  UserIcon,
} from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';
import { MapRoutes } from '../../../map-routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  MapRoutes = MapRoutes;
  readonly TargetIcon = TargetIcon;
  readonly LogOutIcon = LogOutIcon;
  readonly UserIcon = UserIcon;
  private authService = inject(AuthService);
  isLogin = signal(false);
  ngOnInit(): void {
    this.isLogin.set(this.authService.isLoggedIn());
  }

  logout() {
    this.isLogin.set(false);
    this.authService.logout();
  }
}
