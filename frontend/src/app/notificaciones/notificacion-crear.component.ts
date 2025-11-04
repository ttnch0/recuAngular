import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Notificacion, NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-notificacion-crear',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="mb-4">Crear Nuevo Mensajje</h2>

        <form (ngSubmit)="guardar()">
          <div class="mb-3">
            <label for="notificacionId" class="form-label">ID de de notificacion:</label>
            <input type="number" id="notificacionId" [(ngModel)]="notificacion.notificacionId" name="notificacionId" class="form-control" required>
          </div>

          <div class="mb-3">
            <label for="titulo" class="form-label">titulo:</label>
            <input type="string" id="titulo" [(ngModel)]="notificacion.titulo" name="titulo" class="form-control">
          </div>
          <div class="mb-3">
            <label for="mensaje" class="form-label">mensaje:</label>
            <input type="string" id="mensaje" [(ngModel)]="notificacion.mensaje" name="mensaje" class="form-control">
          </div>
          
          <div class="mb-3">
            <label for="fecha" class="form-label">Fecha:</label>
            <input type="date" id="fecha" [(ngModel)]="notificacion.fecha" name="fecha" class="form-control" required>
          </div>
          
          <div class="form-check mb-3">
            <input type="checkbox" id="leido" [(ngModel)]="notificacion.leido" name="leido" class="form-check-input">
            <label for="leido" class="form-check-label">Leido</label>
          </div>

          <button type="submit" class="btn btn-primary me-2">Guardar</button>
          <a routerLink="/" class="btn btn-secondary">Cancelar</a>
          

        </form>
      </div>
    </div>
  `
})
export class NotificacionCrearComponent {
    notificacion: Notificacion = {
    id: '',
    notificacionId: 0,
    titulo: '',
    mensaje: '',
    fecha: '',
    leido: true
  };

  constructor(
    private service: NotificacionService,
    private router: Router
  ) {}

  guardar() {
    this.service.crear(this.notificacion).subscribe({
      next: () => {
        this.mostrarMensaje('¡notificacion creada con éxito!', 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al crear notificacion', err);
        this.mostrarMensaje('Error al crear la notificacion', 'danger');
      }
    });
  }

  mostrarMensaje(mensaje: string, tipo: 'success' | 'danger') {
    const contenedor = document.querySelector('main');
    if (contenedor) {
      const divMensaje = document.createElement('div');
      divMensaje.className = `alert alert-${tipo} mt-3`;
      divMensaje.textContent = mensaje;
      contenedor.prepend(divMensaje);
      
      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    }
  }
}