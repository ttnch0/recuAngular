import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <main class="container mt-4">
      <h1 class="mb-4 text-center">
        <span class="badge bg-info text-dark fs-2 w-100">Notificaciones</span>
      </h1>
      <router-outlet></router-outlet>
    </main>
  `
})
export class NotificacionesComponent {
}
