import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { MainLayoutComponent } from './layouts/main/main-layout/main-layout.component';

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
    component:MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      }
    ]
  },
  
  
  
  { path: 'login', 
    loadComponent: () => import('./features/login/login.component').then((m)=> m.LoginComponent)
  },
  { path: 'problems', loadComponent: () => import('./features/problems/problems.component').then((m)=> m.ProblemsComponent), 
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];
