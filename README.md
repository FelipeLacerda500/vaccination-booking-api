# Vaccination Booking API

## Requisitos

- Node.js - v20.15.1
- npm - 10.7.0

## Guia de execução

**1. Clonar o Repositório**

Abra o terminal e clone o repositório usando o comando `git clone`:

```bash
git clone https://github.com/FelipeLacerda500/vaccination-booking-api.git
```

**2. Navegar até o Diretório do Projeto**

```bash
cd vaccination-booking-api
```

**3. Instalar Dependências**

```bash
npm install
```

**4. Iniciar o Servidor de Desenvolvimento**

```bash
npm run dev
```

## Requisitos e regras

### Requisitos funcionais

- [x] Deve ser possível cadastrar um agendamento;
- [x] Deve ser possível listar todos os agendamentos;
- [x] Deve ser possível listar os agendamentos por data e hora do agendamento e/ou pelo nome do paciente;
- [x] Deve ser possível confirmar se um agendamento foi realizado;

### Regras de negócio

- [x] Para realizar o cadastro de um agendamento, é necessário que o paciente informe o nome, a data de nascimento, além do dia e hora do agendamento;
- [x] Cada horário só possui a disponibilidade para 2 agendamentos;
- [x] O intervalo de tempo entre um horário de agendamento e outro é de 1 hora;
- [x] Podem ser cadastrados no máximo 20 agendamentos por dia, portanto, os agendamentos devem ser realizados apenas no intervalo de 08:00 às 18:00;

### Requisitos não funcionais

- [x] Os dados da aplicação precisam estar persistidos em memória;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;

## Rotas do backend

- GET /schedules -
  Listar todos os agendamentos.

- GET /schedules/search -
  Listar agendamentos filtrados.

- POST /schedules -
  Criar um novo agendamento.

- PATCH /schedules/confirm/:id
  Confirmar um agendamento específico.
