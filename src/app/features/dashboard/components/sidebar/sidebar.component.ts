import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  CompassIcon,
  CrownIcon,
  LucideAngularModule,
  MedalIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  StarIcon,
} from 'lucide-angular';
import { UserService } from '../../../../core/services/api/user.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LucideAngularModule, AngularSvgIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  collapsed = signal(false);
  public selectedTest: 'UCR-UNA' | 'TEC' = 'UCR-UNA';
  readonly PanelLeftCloseIcon = PanelLeftCloseIcon;
  readonly CompassIcon = CompassIcon;
  readonly CrownIcon = CrownIcon;
  readonly MedalIcon = MedalIcon;
  readonly PanelLeftOpenIcon = PanelLeftOpenIcon;

  tierMap: Record<string, { icon: any; label: string }> = {
    Explorador: { icon: CompassIcon, label: 'Explorador' },
    Avanzado: { icon: StarIcon, label: 'Avanzado' },
    Experto: { icon: CrownIcon, label: 'Expertoo' },
  };

  constructor(
    private auth: AuthService,
    public userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.fetchCurrentUser().subscribe();
  }

  public selectTest(test: 'UCR-UNA' | 'TEC'): void {
    this.selectedTest = test;
  }

  toggleCollapse() {
    this.collapsed.update((collapsed) => !collapsed);
  }

  upgradeMembership() {
    //this.router.navigateByUrl('/upgrade-membership');
    this.auth.logout();
  }

  get user() {
    return this.userService.user;
  }
}
