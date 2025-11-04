import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Notificacion, NotificacionService } from './notificacion.service';

@Component({
  selector: 'app-notificacion-lista',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <h2 class="mb-3">Listado de mensajes </h2>
    
    <a routerLink="crear" class="btn btn-primary mb-3"> Nuevo mensaje</a>
    



    <div class="table-responsive">
      <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>Notificacion ID</th>
            <th>Titulo</th>
            <th>Mensaje</th>
            <th>Fecha</th>
            <th>Leido</th>
            
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of notificaciones">
            <td>{{ s.notificacionId}}</td>
            <td>{{ s.titulo }}</td>
            <td>{{ s.mensaje }}</td>
            <td>{{ s.fecha | date:'fullDate' }}</td>
            <td>
              <span *ngIf="s.leido" class="badge bg-success">Sí</span>
              <span *ngIf="!s.leido" class="badge bg-danger">No</span>
            </td>
            <td>
              <a [routerLink]="['/editar', s.id]" class="btn btn-sm btn-warning me-2">Editar</a>
              <a [routerLink]="['/borrar', s.id]" class="btn btn-sm btn-danger">Borrar</a>
            </td>
          </tr>
        </tbody>
      </table>
     


    </div>
  `
})
export class NotificacionListaComponent implements OnInit {
  notificaciones: Notificacion[] = [];
  constructor(private service: NotificacionService) {}

  ngOnInit() {
    this.cargarNotificaciones();
  }
  cargarNotificaciones() {
    this.service.listar().subscribe({
      next: (data) => {
        this.notificaciones = data;
      },
      error: (err) => {
        console.error('Error al cargar notificaciones', err);
      }
    });
  }



}
