import { Routes } from '@angular/router';
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
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent)
  },
  { path: 'login', 
    loadComponent: () => import('./features/login/login.component').then((m)=> m.LoginComponent)
  },
  { path: 'problems', loadComponent: () => import('./features/problems/problems.component').then((m)=> m.ProblemsComponent), 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];
