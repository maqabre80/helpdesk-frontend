import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
  id?: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  prioridad: string;
  estado?: string;
  tecnico?: string;
  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  // URL del backend — cambiar por la URL de Render al desplegar
  private apiUrl = 'https://helpdesk-backend-ghxp.onrender.com/api/tickets';

  constructor(private http: HttpClient) {}

  // GET — listar todos los tickets
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiUrl);
  }

  // GET — obtener ticket por ID
  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  // POST — crear nuevo ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  // PUT — actualizar ticket
  updateTicket(id: string, ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket);
  }

  // DELETE — eliminar ticket
  deleteTicket(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}