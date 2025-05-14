# 💸 Frontend - Agendamento de Transferências Financeiras

## 📝 Descrição

Este projeto representa o **frontend** de um sistema para **agendamento de transferências financeiras**, consumindo uma API RESTful construída com Spring Boot.  
A interface foi desenvolvida com **Angular 19** e permite que o usuário agende e visualize transferências financeiras de forma simples e intuitiva.

---

## 🚀 Funcionalidades

- **Agendamento de transferências**  
  O usuário pode preencher um formulário com:
  - Conta de origem (agência e conta)
  - Conta de destino (agência e conta)
  - Valor da transferência
  - Data de agendamento  
    A data da transferência é automaticamente definida como a data atual.

- **Visualização de extrato**  
  Listagem de todas as transferências já agendadas.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Angular 19
- **Linguagens:** TypeScript, HTML, CSS
- **Gerenciador de pacotes:** npm
- **HTTP Client:** Angular `HttpClient`

---

## ▶️ Como Executar

### 1. Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (recomendado: versão 18 ou superior)
- npm (gerenciador de pacotes)
- Angular CLI (caso não tenha, instale com o comando abaixo):

```bash
npm install -g @angular/cli
```

---

### 2. Clone o repositório

```bash
git clone https://github.com/igorpangardi/transfer-bank-angular
cd transfer-bank-angular
```

---

### 3. Instale as dependências

```bash
npm install
```

---


### 4. Inicie a aplicação

```bash
npm start
```



#### A aplicação irá rodar no endereço: 
http:localhost:4200


---

### 5. Backend necessário
#### Este frontend consome a API disponibilizada pelo backend descrito neste repositório:
https://github.com/igorpangardi/transfer-bank
