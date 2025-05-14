import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface SchedulingPaymentResponseModel {
  originAgency: string;
  originAccount: string;
  destinationAgency: string;
  destinationAccount: string;
  transferAmount: number;
  tax: number;
  transferDate: string;
  schedulingDate: string;
}

@Component({
  selector: 'app-scheduling-pay-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scheduling-pay-list.component.html',
  styleUrl: './scheduling-pay-list.component.css'
})
export class SchedulingPayListComponent implements OnInit {
  scheduledPayments: SchedulingPaymentResponseModel[] = [];
  loading = false;
  error: string | null = null;

  private apiUrl = 'http://localhost:8080/v1/payments';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadScheduledPayments();
  }

  loadScheduledPayments(): void {
    this.loading = true;
    this.error = null;

    this.http.get<SchedulingPaymentResponseModel[]>(this.apiUrl).pipe(
      catchError(this.handleError<SchedulingPaymentResponseModel[]>('loadScheduledPayments', []))
    ).subscribe(data => {
      this.scheduledPayments = data;
      this.loading = false;
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.error = `${operation} failed: ${error.message}`;
      this.loading = false;
      return of(result as T);
    };
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    try {
      const parts = dateString.split(/[-T :]/);
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erro ao formatar a data:', error);
      return dateString;
    }
  }

  formatAccount(accountNumber: string): string {
    if (accountNumber && accountNumber.length > 5) {
      const part1 = accountNumber.substring(0, accountNumber.length - 1);
      const part2 = accountNumber.substring(accountNumber.length - 1);
      return `${part1}-${part2}`;
    }
    return accountNumber;
  }

  formatCurrency(value: number | null): string {
    if (value === null || value === undefined) {
      return 'R$ 0,00'; // Ou outra representação para valores nulos
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }


}