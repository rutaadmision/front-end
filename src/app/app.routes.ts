import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { dashboardRedirectGuard } from './core/guards/dashboard-redirect.guard';
import { MainLayoutComponent } from './layouts/main/main-layout/main-layout.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    /*canActivateChild: [dashboardRedirectGuard],*/
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        canActivate: [dashboardRedirectGuard],
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./layouts/main/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    canActivateChild: [dashboardRedirectGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./features/auth/signup/signup.component').then(
            (m) => m.SignupComponent
          ),
      },
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./features/auth/verify-email/verify-email.component').then(
            (m) => m.VerifyEmailComponent
          ),
      },
    ],
  },

  {
    path: 'problems',
    loadComponent: () =>
      import('./features/problems/problems.component').then(
        (m) => m.ProblemsComponent
      ),
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
