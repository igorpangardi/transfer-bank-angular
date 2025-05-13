import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { SchedulingPayComponent } from './scheduling-pay/scheduling-pay.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SchedulingPayListComponent } from './scheduling-pay-list/scheduling-pay-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, SchedulingPayComponent, HeaderComponent, FooterComponent, SchedulingPayListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}