import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheduling-pay',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './scheduling-pay.component.html',
  styleUrl: './scheduling-pay.component.css',
  providers: [HttpClient]
})
export class SchedulingPayComponent {
  formData = {
    destinationAgency: '',
    destinationAccount: '',
    originAgency: '',
    originAccount: '',
    transferAmount: 0,
    transferDate: ''
  };

  displayTransferAmount: string = '';
  formErrors = {
    destinationAgency: '',
    destinationAccount: '',
    originAgency: '',
    originAccount: '',
    transferAmount: '',
    transferDate: ''
  };
  isFormValid = false;
  touchedFields = new Set<string>();
  tipoModal: 'sucesso' | 'erro' = 'sucesso';
  mensagemModal = '';
  exibirModal = false;

  private http = inject(HttpClient);
  private router = inject(Router);
  @ViewChild('destinationAgencyInput') destinationAgencyInput!: ElementRef;
  @ViewChild('destinationAccountInput') destinationAccountInput!: ElementRef;
  @ViewChild('originAgencyInput') originAgencyInput!: ElementRef;
  @ViewChild('originAccountInput') originAccountInput!: ElementRef;
  @ViewChild('transferAmountInput') transferAmountInput!: ElementRef;
  @ViewChild('transferDateInput') transferDateInput!: ElementRef;

  formatarValor(valorDigitado: string): { formattedValue: string; numericValue: number } {
    let valorNumerico = 0;
    let valorFormatado = '';

    if (valorDigitado) {
      const valorLimpo = valorDigitado.replace(/[R$\s.,]/g, '');
      valorNumerico = Number(valorLimpo) / 100;
      if (isNaN(valorNumerico)) {
        valorNumerico = 0;
        valorFormatado = valorDigitado;
      } else {
        valorFormatado = valorNumerico.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
    } else {
      valorFormatado = '';
    }
    return { formattedValue: valorFormatado, numericValue: valorNumerico };
  }

  onTransferAmountInput(event: any) {
    const valorDigitado = event.target.value;
    const resultado = this.formatarValor(valorDigitado);
    this.displayTransferAmount = resultado.formattedValue;
    this.formData.transferAmount = resultado.numericValue;
    this.validarFormulario('transferAmount');
  }

  validarFormulario(fieldName?: string) {
    if (fieldName) {
      this.touchedFields.add(fieldName);
    }

    this.formErrors = {
      destinationAgency: '',
      destinationAccount: '',
      originAgency: '',
      originAccount: '',
      transferAmount: '',
      transferDate: ''
    };
    this.isFormValid = true;

    if (this.formData.destinationAgency.length !== 4) {
      this.formErrors.destinationAgency = 'Agência de destino deve ter 4 dígitos.';
      this.isFormValid = false;
    }
    if (this.formData.destinationAccount.length !== 6) {
      this.formErrors.destinationAccount = 'Conta de destino deve ter 6 dígitos.';
      this.isFormValid = false;
    }
    if (this.formData.originAgency.length !== 4) {
      this.formErrors.originAgency = 'Agência de origem deve ter 4 dígitos.';
      this.isFormValid = false;
    }
    if (this.formData.originAccount.length !== 6) {
      this.formErrors.originAccount = 'Conta de origem deve ter 6 dígitos.';
      this.isFormValid = false;
    }
    if (this.formData.transferAmount <= 0) {
      this.formErrors.transferAmount = 'Valor da transferência deve ser maior que zero.';
      this.isFormValid = false;
    }

    // Validação da data
    if (this.formData.transferDate) {
      const dataAgendamento = new Date(this.formData.transferDate);
      const hoje = new Date();
      dataAgendamento.setDate(dataAgendamento.getDate() + 1);

      const dataAgendamentoValida = dataAgendamento >= hoje;

      if (!dataAgendamentoValida) {
        this.formErrors.transferDate = 'A data de agendamento deve ser igual ou posterior à data atual.';
        this.isFormValid = false;
      }
    } else {
      this.formErrors.transferDate = 'Data de agendamento é obrigatória.';
      this.isFormValid = false;
    }
  }

  enviarTransferencia() {
    this.validarFormulario();

    if (!this.isFormValid) {
      this.tipoModal = 'erro';
      this.mensagemModal = 'Por favor, preencha todos os campos corretamente.';
      this.exibirModal = true;
      return;
    }


    const formDataParaApi = {
      ...this.formData,
      transferAmount: this.formData.transferAmount.toFixed(2)
    };


    const apiUrl = 'http://localhost:8080/v1/payments/scheduling';

    this.http.post(apiUrl, formDataParaApi)
      .subscribe(
        (response: any) => {
          console.log('Resposta do backend:', response);
          this.tipoModal = 'sucesso';
          if (response && response.message) {
            this.mensagemModal = response.message;
          } else {
            this.mensagemModal = 'Transferência agendada com sucesso!';
          }
          this.exibirModal = true;
        },
        (error: any) => {
          console.error('Erro ao agendar transferência:', error);
          this.tipoModal = 'erro';
          if (error.error && error.error.detail === "There is no applicable tax for this transfer.") {
            this.mensagemModal = "A data de agendamento não está disponível. Por favor, verifique a data.";
          }
          else {
            this.mensagemModal = 'Erro ao agendar transferência: ' + (error.error?.message || 'Erro desconhecido');
          }
          this.exibirModal = true;
        }
      );
  }

  fecharModal() {
    this.exibirModal = false;
    window.location.reload();
  }

  verAgendamentos() {
    this.exibirModal = false;
    this.router.navigate(['/list-payments']);
  }

  focusNext(nextInputId: string) {
    const nextInput = document.getElementById(nextInputId);
    if (nextInput) {
      nextInput.focus();
    }
  }

  onBlur(fieldName: string) {
    this.touchedFields.add(fieldName);
    this.validarFormulario(fieldName);
  }
}

