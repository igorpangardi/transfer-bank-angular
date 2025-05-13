import { Routes } from '@angular/router';
import { SchedulingPayComponent } from './scheduling-pay/scheduling-pay.component';
import { SchedulingPayListComponent } from './scheduling-pay-list/scheduling-pay-list.component';

export const routes: Routes = [
  { path: 'create-payment', component: SchedulingPayComponent },
  { path: 'list-payments', component: SchedulingPayListComponent },
  { path: '', redirectTo: '/schedule-payment', pathMatch: 'full' }
];