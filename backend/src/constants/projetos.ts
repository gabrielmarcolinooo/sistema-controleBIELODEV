export const TIPOS_SERVICO = [
  "LANDING_PAGE",
  "SITE_INSTITUCIONAL",
  "SISTEMA_WEB",
] as const;

export const STATUS_PAGAMENTO = [
  "PENDENTE",
  "SINAL_PAGO",
  "QUITADO",
] as const;

export type TipoServico = (typeof TIPOS_SERVICO)[number];
export type StatusPagamento = (typeof STATUS_PAGAMENTO)[number];

export const DEFAULT_PORCENTAGEM_COMISSAO = 15;