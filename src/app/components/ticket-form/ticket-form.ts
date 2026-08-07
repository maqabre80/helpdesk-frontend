import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketService, Ticket } from '../../services/ticket';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.css'
})
export class TicketFormComponent {
  ticket: Ticket = {
    titulo: '',
    descripcion: '',
    categoria: '',
    prioridad: 'Media'
  };

  enviando = false;
  mensaje = '';
  error = '';

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}

  // Sanitizar entrada para prevenir XSS
  sanitizar(texto: string): string {
    return texto
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  onSubmit() {
    if (!this.ticket.titulo || !this.ticket.descripcion || !this.ticket.categoria) {
      this.error = 'Por favor complete todos los campos obligatorios.';
      return;
    }

    // Aplicar sanitización XSS antes de enviar
    const ticketSanitizado: Ticket = {
      titulo:      this.sanitizar(this.ticket.titulo),
      descripcion: this.sanitizar(this.ticket.descripcion),
      categoria:   this.ticket.categoria,
      prioridad:   this.ticket.prioridad
    };

    this.enviando = true;
    this.error = '';

    this.ticketService.createTicket(ticketSanitizado).subscribe({
      next: () => {
        this.mensaje = '✅ Ticket registrado correctamente.';
        this.enviando = false;
        setTimeout(() => this.router.navigate(['/tickets']), 1500);
      },
      error: (err) => {
        this.error = '❌ Error al registrar el ticket. Verifique la conexión.';
        this.enviando = false;
        console.error(err);
      }
    });
  }

  limpiar() {
    this.ticket = { titulo: '', descripcion: '', categoria: '', prioridad: 'Media' };
    this.mensaje = '';
    this.error = '';
  }
}