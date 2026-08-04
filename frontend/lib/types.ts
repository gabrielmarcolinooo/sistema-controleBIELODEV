export type TipoServico = "LANDING_PAGE" | "SITE_INSTITUCIONAL" | "SISTEMA_WEB";

export type StatusPagamento = "PENDENTE" | "SINAL_PAGO" | "QUITADO";

export interface Projeto {
  id: number;
  nomeCliente: string;
  nomeProspector: string;
  tipoServico: TipoServico;
  valorTotal: number;
  porcentagemComissao: number;
  valorComissao: number;
  valorLiquidoDevs: number;
  cotaDev1: number;
  cotaDev2: number;
  statusPagamento: StatusPagamento;
  dataFechamento: string;
}

export interface CriarProjetoInput {
  nomeCliente: string;
  nomeProspector: string;
  tipoServico: TipoServico;
  valorTotal: number;
  porcentagemComissao?: number;
  statusPagamento?: StatusPagamento;
}

export interface AtualizarProjetoInput {
  nomeCliente?: string;
  nomeProspector?: string;
  tipoServico?: TipoServico;
  valorTotal?: number;
  porcentagemComissao?: number;
  statusPagamento?: StatusPagamento;
}

export interface Estatisticas {
  totalProjetos: number;
  faturamentoTotal: number;
  totalProspectadores: number;
  receitaLiquidaTotal: number;
  cotasDevs: {
    cotaDev1: number;
    cotaDev2: number;
  };
}