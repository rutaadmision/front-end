import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

initializeApp(environment.firebase);
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideClientHydration(),
  provideHttpClient(withInterceptors([AuthInterceptor])),
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()), provideSweetAlert2()
  ]
};
