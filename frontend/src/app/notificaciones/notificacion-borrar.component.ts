import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Notificacion, NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-notificacion-borrar',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <h2 class="mb-4 text-danger">🗑️ Borrar mensaje</h2>

    <div *ngIf="!notificacion" class="alert alert-warning">
      Cargando notificacion...
    </div>

    <div *ngIf="notificacion">
      <p class="fs-5">¿Estás seguro de que quieres borrar el mensaje <strong>{{ notificacion.titulo }}</strong> (ID: {{ notificacion.id }})?</p>
      
      <ul class="list-group mb-4">
        <li class="list-group-item"><strong>Notificacion ID:</strong> {{ notificacion.notificacionId }}</li>
        <li class="list-group-item"><strong>Fecha :</strong> {{ notificacion.fecha | date:'fullDate' }}</li>
        <li class="list-group-item"><strong>Mensaje:</strong> {{ notificacion.mensaje }}</li>
        <li class="list-group-item"><strong>Leido:</strong> {{ notificacion.leido ? 'Sí' : 'No' }}</li>
        
      </ul>

      <button (click)="borrar()" class="btn btn-danger me-2">Sí, Borrar</button>
      <a routerLink="/" class="btn btn-secondary">No, Cancelar</a>
    </div>
  `
})
export class NotificacionBorrarComponent implements OnInit {
  notificacion: Notificacion | null = null;
  private id: string = '';

  constructor(
    private service: NotificacionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.id) {
      this.service.obtener(this.id).subscribe({
        next: (data) => {
          this.notificacion = data;
        },
        error: (err) => {
          console.error('Error al cargar suscripción', err);
          this.mostrarMensaje('Suscripción no encontrada', 'danger');
          this.router.navigate(['/']);
        }
      });
    }
  }

  borrar() {
    this.service.eliminar(this.id).subscribe({
      next: () => {
        this.mostrarMensaje('¡Suscripción eliminada!', 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al eliminar', err);
        this.mostrarMensaje('Error al eliminar la suscripción', 'danger');
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
