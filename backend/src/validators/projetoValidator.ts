import {
  TIPOS_SERVICO,
  STATUS_PAGAMENTO,
} from "../constants/projetos";

export class ErroValidacao extends Error {
  constructor(mensagens: string[]) {
    super(mensagens.join(", "));
    this.name = "ErroValidacao";
  }
}

export function ehTipoServico(v: string): boolean {
  return (TIPOS_SERVICO as readonly string[]).includes(v);
}

export function ehStatusPagamento(v: string): boolean {
  return (STATUS_PAGAMENTO as readonly string[]).includes(v);
}

export function validarCriarProjeto(dados: any) {
  const erros: string[] = [];

  if (!dados.nomeCliente || typeof dados.nomeCliente !== "string") {
    erros.push("'nomeCliente' é obrigatório");
  }

  if (!dados.nomeProspector || typeof dados.nomeProspector !== "string") {
    erros.push("'nomeProspector' é obrigatório");
  }

  if (!dados.tipoServico || !ehTipoServico(dados.tipoServico)) {
    erros.push("'tipoServico' inválido");
  }

  if (
    dados.valorTotal == null ||
    typeof dados.valorTotal !== "number" ||
    isNaN(dados.valorTotal) ||
    dados.valorTotal < 0
  ) {
    erros.push("'valorTotal' deve ser um número maior ou igual a zero");
  }

  if (
    dados.porcentagemComissao != null &&
    (typeof dados.porcentagemComissao !== "number" ||
      dados.porcentagemComissao < 0)
  ) {
    erros.push("'porcentagemComissao' deve ser um número maior ou igual a zero");
  }

  if (
    dados.statusPagamento != null &&
    !ehStatusPagamento(dados.statusPagamento)
  ) {
    erros.push("'statusPagamento' inválido");
  }

  if (erros.length > 0) throw new ErroValidacao(erros);
}

export function validarAtualizarProjeto(dados: any) {
  const erros: string[] = [];

  if (dados.nomeCliente != null && typeof dados.nomeCliente !== "string") {
    erros.push("'nomeCliente' inválido");
  }

  if (dados.nomeProspector != null && typeof dados.nomeProspector !== "string") {
    erros.push("'nomeProspector' inválido");
  }

  if (dados.tipoServico != null && !ehTipoServico(dados.tipoServico)) {
    erros.push("'tipoServico' inválido");
  }

  if (
    dados.valorTotal != null &&
    (typeof dados.valorTotal !== "number" || dados.valorTotal < 0)
  ) {
    erros.push("'valorTotal' deve ser um número maior ou igual a zero");
  }

  if (
    dados.porcentagemComissao != null &&
    (typeof dados.porcentagemComissao !== "number" ||
      dados.porcentagemComissao < 0)
  ) {
    erros.push("'porcentagemComissao' deve ser um número maior ou igual a zero");
  }

  if (dados.statusPagamento != null && !ehStatusPagamento(dados.statusPagamento)) {
    erros.push("'statusPagamento' inválido");
  }

  if (erros.length > 0) throw new ErroValidacao(erros);
}

export function validarId(v: string): number {
  const id = Number(v);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ErroValidacao(["'id' inválido"]);
  }
  return id;
}