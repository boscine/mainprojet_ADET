// app.route.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) 
  },
  { 
    path: 'feed', 
    loadComponent: () => import('./pages/student/feed/feed.component').then(m => m.FeedComponent) 
  },
  { 
    path: 'post/create', 
    loadComponent: () => import('./pages/student/post-create/post-create.component').then(m => m.PostCreateComponent) 
  },
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { path: '**', redirectTo: 'feed' }
];