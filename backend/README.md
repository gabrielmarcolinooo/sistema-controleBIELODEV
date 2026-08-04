# Backend - Sistema de Controle BieloDev

API REST em TypeScript com Node.js, Express e Prisma ORM (MySQL).

## Requisitos

- Node.js 18+
- MySQL (local ou remoto)
- Banco criado (ex.: `sistema_controle`)

## Configuração

1. Configure a conexão em `.env`:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/sistema_controle"
PORT=3000
```

2. Instale as dependências e gere o cliente Prisma:

```bash
npm install
npm run prisma:generate
```

3. Crie a tabela no banco:

```bash
npm run prisma:migrate
```

## Como rodar

```bash
npm run dev      # modo desenvolvimento (com reload)
npm run build    # compilar
npm run start    # rodar a compilação
```

## Endpoints

### `GET /projetos`
Lista todos os projetos.

### `GET /projetos/:id`
Busca um projeto por id.

### `POST /projetos`
Cria um projeto. Campos:

```json
{
  "nomeCliente": "Cliente Exemplo",
  "nomeProspector": "Prospector Exemplo",
  "tipoServico": "LANDING_PAGE",
  "valorTotal": 5000,
  "porcentagemComissao": 15,
  "statusPagamento": "PENDENTE"
}
```

- `tipoServico`: `LANDING_PAGE`, `SITE_INSTITUCIONAL`, `SISTEMA_WEB`
- `statusPagamento`: `PENDENTE`, `SINAL_PAGO`, `QUITADO`
- `porcentagemComissao` e `statusPagamento` são opcionais (padrão 15 e `PENDENTE`).

### `PUT /projetos/:id`
Atualiza um projeto existente (envie apenas os campos a alterar).

### `DELETE /projetos/:id`
Remove um projeto.

### `GET /projetos/estatisticas`
Retorna:

```json
{
  "totalProjetos": 3,
  "faturamentoTotal": 15000,
  "totalProspectadores": 2250,
  "receitaLiquidaTotal": 12750,
  "cotasDevs": {
    "cotaDev1": 6375,
    "cotaDev2": 6375
  }
}
```

## Cálculos automáticos

- `valorComissao = valorTotal * porcentagemComissao / 100`
- `valorLiquidoDevs = valorTotal - valorComissao`
- `cotaDev1 = valorLiquidoDevs / 2`
- `cotaDev2 = valorLiquidoDevs / 2`

## Estrutura

```
src/
  app.ts
  server.ts
  routes/projetoRoutes.ts
  services/projetoService.ts
  validators/projetoValidator.ts
  constants/projetos.ts
  utils/calculo.ts
  lib/prisma.ts
  generated/prisma/   (gerado pelo Prisma)
prisma/
  schema.prisma
  migrations/
```