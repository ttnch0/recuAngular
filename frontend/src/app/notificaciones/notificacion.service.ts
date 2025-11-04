import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacion {
  id?: string;
  notificacionId: number;
  titulo:string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = 'http://localhost:3000/notificaciones';

  constructor(private http: HttpClient) { }

  listar(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  obtener(id: string): Observable<Notificacion> {
    return this.http.get<Notificacion>(`${this.apiUrl}/${id}`);
  }

  crear(suscripcion: Notificacion): Observable<Notificacion> {
    return this.http.post<Notificacion>(this.apiUrl, suscripcion);
  }

  actualizar(id: string, suscripcion: Notificacion): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/${id}`, suscripcion);
  }

  eliminar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}