import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TicketFormComponent } from './components/ticket-form/ticket-form';
import { TicketListComponent } from './components/ticket-list/ticket-list';

export const routes: Routes = [
  { path: '',          component: DashboardComponent },
  { path: 'reportar',  component: TicketFormComponent },
  { path: 'tickets',   component: TicketListComponent },
  { path: '**',        redirectTo: '' }
];