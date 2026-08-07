import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketService, Ticket } from '../../services/ticket';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  totalTickets = 0;
  ticketsAbiertos = 0;
  ticketsResueltos = 0;
  ticketsEnProgreso = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.totalTickets      = tickets.length;
      this.ticketsAbiertos   = tickets.filter(t => t.estado === 'Abierto').length;
      this.ticketsResueltos  = tickets.filter(t => t.estado === 'Resuelto').length;
      this.ticketsEnProgreso = tickets.filter(t => t.estado === 'En Progreso').length;
    });
  }
}