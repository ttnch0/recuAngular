import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Notificacion, NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-notificacion-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card">
      <div class="card-body">
        <h2 class="mb-4"> Editar Mensasaje</h2>

        <form (ngSubmit)="guardar()">
          <div class="mb-3">
            <label for="notificacionId" class="form-label">ID de Notificacion:</label>
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
            <input type="date" id="fecha" [(ngModel)]="notificacion.fecha" name="fecha" class="form-control">
          </div>


          
          <div class="form-check mb-3">
            <input type="checkbox" id="leido" [(ngModel)]="notificacion.leido" name="leido" class="form-check-input">
            <label for="leido" class="form-check-label">Leido</label>
          </div>

          <button type="submit" class="btn btn-primary me-2">Guardar Cambios</button>
          <a routerLink="/" class="btn btn-secondary">Cancelar</a>

        </form>
      </div>
    </div>
  `
})
export class NotificacionEditarComponent implements OnInit {
    notificacion: Notificacion = {
    id: '',
    notificacionId: 0,
    titulo: '',
    mensaje: '',
    fecha: '',
    leido: true
    
  };
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
          this.notificacion.fecha = this.formatearFecha(data.fecha);
        },
        error: (err) => {
          console.error('Error al cargar noti', err);
          this.mostrarMensaje('Error al cargar la noti', 'danger');
          this.router.navigate(['/']);
        }
      });
    }
  }

  private formatearFecha(fecha: string): string {
    if (!fecha) return '';
    return fecha.split('T')[0];
  }

  guardar() {

    this.service.actualizar(this.id, this.notificacion).subscribe({
      next: () => {
        this.mostrarMensaje('¡Notificacion actualizada!', 'success');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.mostrarMensaje('Error al actualizar la notificacion', 'danger');
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
