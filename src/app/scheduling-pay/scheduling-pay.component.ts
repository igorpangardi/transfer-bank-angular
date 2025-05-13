import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-scheduling-pay',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './scheduling-pay.component.html',
  styleUrl: './scheduling-pay.component.css',
  providers: [HttpClient] 
})
export class SchedulingPayComponent {
  formData = {
    agenciaDestino: '',
    contaDestino: '',
    agenciaOrigem: '',
    contaOrigem: '',
    valor: null,
    dataAgendamento: ''
  };

  private http = inject(HttpClient); 

  enviarTransferencia() {
    console.log('Dados do formulário:', this.formData);

    const apiUrl = 'URL_DO_SEU_SERVICO_BACKEND';

    this.http.post(apiUrl, this.formData)
      .subscribe(
        (response) => {
          console.log('Resposta do backend:', response);
          alert('Transferência agendada com sucesso!');
        },
        (error) => {
          console.error('Erro ao agendar transferência:', error);
          alert('Erro ao agendar transferência.');
        }
      );
  }
}