# SalesBud - Backend

Backend para o gerador de e-mails personalizados com IA.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- OpenAI API (via OpenRouter)
- Dotenv

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3001
NODE_ENV=development
AI_API_KEY=sua_chave_aqui
AI_MODEL=gpt-4.1-nano
```

## 🏃‍♂️ Executando

```bash
npm run dev
```

## 📁 Estrutura do Projeto

```
src/
├── controllers/         # Controladores da aplicação
│   ├── EmailController.ts
│   ├── MeetingController.ts
│   └── TranscriptionController.ts
├── services/           # Serviços de negócio
│   ├── EmailGenerator.ts
│   └── MeetingSummarizer.ts
├── utils/             # Utilitários
│   └── meetingValidator.ts
├── mocks/             # Dados mockados para teste
│   ├── meeting1.ts
│   ├── meeting2.ts
│   ├── meeting3.ts
│   └── index.ts
└── server.ts          # Arquivo principal
```

## 📝 API

### Endpoints

#### 1. Resumir Reunião
```http
POST /meetings/:meetingId/summarize
```

**Parâmetros de URL:**
- `meetingId` (obrigatório): ID da reunião a ser resumida

**Resposta de Sucesso:**
```json
{
  "summary": "Resumo estruturado da reunião em markdown...",
  "meetingId": "meeting-001",
  "generatedAt": "2024-03-21T10:00:00.000Z"
}
```

**Resposta de Erro:**
```json
{
  "error": "Invalid meeting ID. Available IDs are: meeting-001, meeting-002, meeting-003"
}
```

#### 2. Gerar E-mail
```http
POST /meetings/:meetingId/generate-email
```

**Parâmetros de URL:**
- `meetingId` (obrigatório): ID da reunião base para o e-mail

**Body:**
```json
{
  "context": {
    "name": "Nome do Cliente",
    "last_interaction": "Última interação",
    "objective": "Objetivo do e-mail (opcional)"
  }
}
```

**Resposta de Sucesso:**
```json
{
  "email": "Conteúdo do e-mail gerado...",
  "meetingId": "meeting-001",
  "generatedAt": "2024-03-21T10:00:00.000Z"
}
```

#### 3. Obter Transcrições
```http
GET /transcriptions
```

**Resposta de Sucesso:**
```json
[
  {
    "id": "meeting-001",
    "transcription": "Transcrição completa da reunião..."
  },
  {
    "id": "meeting-002",
    "transcription": "Transcrição completa da reunião..."
  },
  {
    "id": "meeting-003",
    "transcription": "Transcrição completa da reunião..."
  }
]
```

#### 4. Obter Transcrição Específica
```http
GET /transcriptions/:meetingId
```

**Parâmetros de URL:**
- `meetingId` (obrigatório): ID da reunião

**Resposta de Sucesso:**
```json
{
  "id": "meeting-001",
  "transcription": "Transcrição completa da reunião..."
}
```

**Resposta de Erro:**
```json
{
  "error": "Meeting not found"
}
```

### Reuniões Disponíveis

O sistema possui três reuniões mockadas para teste:

1. **meeting-001**
   - Empresa: Desenvolvimento de software
   - Problemas principais:
     - Uso de Excel para gestão de vendas
     - Perda de oportunidades por falta de follow-up
     - Queda de 20% na taxa de conversão
     - Perda de R$ 500 mil em receita recorrente
   - Orçamento: R$ 50 mil/ano
   - Próximo passo: Demonstração na terça-feira às 14h

2. **meeting-002**
   - Empresa: Consultoria em marketing digital
   - Problemas principais:
     - Uso ineficiente do HubSpot
     - Perda de 2 horas/dia por vendedor em tarefas manuais
     - Dificuldade com sincronização de dados
     - Problemas com relatórios
   - Orçamento: R$ 30 mil/ano
   - Próximo passo: Demonstração na quarta-feira às 15h

3. **meeting-003**
   - Entrevista: Urci - AI SDE Interview
   - Tipo: Entrevista técnica
   - Participantes: Rafael (CEO) e Leonardo
   - Foco: Experiência técnica e fit cultural
   - Resultado: Proposta de contrato enviada

## 🤖 Integração com IA

O sistema utiliza a API do OpenRouter para acessar modelos de IA. As principais funcionalidades são:

1. **Resumo de Reuniões**
   - Extrai pontos principais
   - Identifica dores e objeções
   - Estrutura informações em markdown

2. **Geração de E-mails**
   - Cria e-mails personalizados
   - Mantém tom profissional
   - Referencia pontos da reunião

## 🔧 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm start`: Inicia o servidor em modo produção
- `npm test`: Executa os testes

## 📚 Dependências Principais

- `express`: Framework web
- `openai`: Cliente para API de IA
- `dotenv`: Gerenciamento de variáveis de ambiente
- `cors`: Middleware para CORS
- `typescript`: Suporte a TypeScript

## Technologies

- Node.js
- TypeScript
- Express
- Jest (for testing)

## Prerequisites

- Node.js (version used in the creation of this)
- npm

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
4. Modify the `.env` file as needed

## Development

To run the server in development mode with hot reloading:

```bash
npm run dev
```

The server will be available at http://localhost:3001 (or the port specified in your .env file).


## API Documentation

### Resumo de Reunião
```http
POST /meetings/:meetingId/summarize
```
Gera um resumo estruturado de uma reunião específica de acordo com a transcrição da reunião

**Parâmetros de URL:**
- `meetingId` (obrigatório): ID da reunião a ser resumida

**Resposta de Sucesso:**
```json
{
  "summary": "Resumo estruturado da reunião em markdown...",
  "meetingId": "meeting-001",
  "generatedAt": "2024-03-21T10:00:00.000Z"
}
```

### Geração de E-mail
```http
POST /meetings/:meetingId/generate-email
```
Gera um e-mail personalizado baseado em uma reunião específica.

**Parâmetros de URL:**
- `meetingId` (obrigatório): ID da reunião base para o e-mail

**Body:**
```json
{
  "context": {
    "name": "Nome do Cliente",
    "last_interaction": "Última interação",
    "objective": "Objetivo do e-mail (opcional)"
  }
}
```

**Resposta de Sucesso:**
```json
{
  "email": "Conteúdo do e-mail gerado...",
  "meetingId": "meeting-001",
  "generatedAt": "2024-03-21T10:00:00.000Z"
}
```

### Códigos de Status

- `200 OK`: Requisição bem-sucedida
- `400 Bad Request`: Parâmetros inválidos
- `404 Not Found`: Reunião não encontrada
- `500 Internal Server Error`: Erro interno do servidor

### Autenticação

Atualmente, a API não requer autenticação para endpoints públicos. Para endpoints protegidos, será implementada autenticação via JWT em versões futuras.
