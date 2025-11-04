import { Routes } from '@angular/router';

import { NotificacionListaComponent } from './notificacion-lista.component';
import { NotificacionCrearComponent } from './notificacion-crear.component';
import { NotificacionEditarComponent } from './notificacion-editar.component';
import { NotificacionBorrarComponent } from './notificacion-borrar.component';

export const NOTIFICACIONES_ROUTES: Routes = [
  { path: '', component: NotificacionListaComponent },
  { path: 'crear', component: NotificacionCrearComponent },
  { path: 'editar/:id', component: NotificacionEditarComponent },
  { path: 'borrar/:id', component: NotificacionBorrarComponent },
];
