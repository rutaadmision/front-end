import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { ProblemsComponent } from './features/problems/problems.component';
import { AuthGuard } from './core/guards/auth.guard';

/*export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
];*/

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'problems', component: ProblemsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
