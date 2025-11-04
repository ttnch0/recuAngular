import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { NotificacionesComponent } from './app/notificaciones/notificaciones.component';
import { NOTIFICACIONES_ROUTES } from './app/notificaciones/notificaciones.routes';

bootstrapApplication(NotificacionesComponent, {
  providers: [
    provideRouter(NOTIFICACIONES_ROUTES),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));