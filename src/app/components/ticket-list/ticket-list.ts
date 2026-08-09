import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketService, Ticket } from '../../services/ticket';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  cargando = true;
  error = '';
  mensaje = '';

  constructor(
    private ticketService: TicketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.cargando = true;
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los tickets.';
        this.cargando = false;
        this.cdr.detectChanges();
        console.error(err);
      }
    });
  }

  cambiarEstado(ticket: Ticket, nuevoEstado: string) {
    if (!ticket.id) return;
    this.ticketService.updateTicket(ticket.id, { estado: nuevoEstado }).subscribe({
      next: () => {
        ticket.estado = nuevoEstado;
        this.mensaje = `✅ Estado actualizado a "${nuevoEstado}"`;
        this.cdr.detectChanges();
        setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: () => {
        this.error = '❌ Error al actualizar el estado.';
        this.cdr.detectChanges();
        setTimeout(() => { this.error = ''; this.cdr.detectChanges(); }, 3000);
      }
    });
  }

  eliminarTicket(ticket: Ticket) {
    if (!ticket.id) return;
    if (!confirm(`¿Eliminar el ticket "${ticket.titulo}"?`)) return;
    this.ticketService.deleteTicket(ticket.id).subscribe({
      next: () => {
        this.tickets = this.tickets.filter(t => t.id !== ticket.id);
        this.mensaje = '✅ Ticket eliminado correctamente.';
        this.cdr.detectChanges();
        setTimeout(() => { this.mensaje = ''; this.cdr.detectChanges(); }, 3000);
      },
      error: () => {
        this.error = '❌ Error al eliminar el ticket.';
        this.cdr.detectChanges();
        setTimeout(() => { this.error = ''; this.cdr.detectChanges(); }, 3000);
      }
    });
  }

  getBadgeClass(valor: string): string {
    const mapa: Record<string, string> = {
      'Abierto':     'badge--warning',
      'En Progreso': 'badge--info',
      'Resuelto':    'badge--success',
      'Alta':        'badge--warning',
      'Critica':     'badge--danger',
      'Media':       'badge--neutral',
      'Baja':        'badge--neutral',
      'Hardware':    'badge--neutral',
      'Red':         'badge--info',
      'Software':    'badge--neutral',
    };
    return mapa[valor] || 'badge--neutral';
  }
}