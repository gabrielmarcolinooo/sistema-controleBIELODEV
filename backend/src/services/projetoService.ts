import { prisma } from "../lib/prisma";
import { DEFAULT_PORCENTAGEM_COMISSAO } from "../constants/projetos";
import { calcularValores, arredondar } from "../utils/calculo";

export interface CriarProjetoInput {
  nomeCliente: string;
  nomeProspector: string;
  tipoServico: string;
  valorTotal: number;
  porcentagemComissao?: number;
  statusPagamento?: string;
  dataFechamento?: Date;
}

export interface AtualizarProjetoInput {
  nomeCliente?: string;
  nomeProspector?: string;
  tipoServico?: string;
  valorTotal?: number;
  porcentagemComissao?: number;
  statusPagamento?: string;
  dataFechamento?: Date;
}

export async function listarProjetos() {
  return prisma.projeto.findMany({ orderBy: { dataFechamento: "desc" } });
}

export async function buscarProjeto(id: number) {
  return prisma.projeto.findUnique({ where: { id } });
}

export async function criarProjeto(dados: CriarProjetoInput) {
  const porcentagemComissao =
    dados.porcentagemComissao ?? DEFAULT_PORCENTAGEM_COMISSAO;

  const calculado = calcularValores(dados.valorTotal, porcentagemComissao);

  return prisma.projeto.create({
    data: {
      nomeCliente: dados.nomeCliente,
      nomeProspector: dados.nomeProspector,
      tipoServico: dados.tipoServico as never,
      valorTotal: dados.valorTotal,
      porcentagemComissao,
      statusPagamento: (dados.statusPagamento ?? "PENDENTE") as never,
      dataFechamento: dados.dataFechamento ?? new Date(),
      ...calculado,
    },
  });
}

export async function atualizarProjeto(id: number, dados: AtualizarProjetoInput) {
  const atual = await prisma.projeto.findUnique({ where: { id } });
  if (!atual) return null;

  const valorTotal = dados.valorTotal ?? atual.valorTotal;
  const porcentagemComissao =
    dados.porcentagemComissao ?? atual.porcentagemComissao;

  const calculados = calcularValores(valorTotal, porcentagemComissao);

  return prisma.projeto.update({
    where: { id },
    data: {
      nomeCliente: dados.nomeCliente,
      nomeProspector: dados.nomeProspector,
      tipoServico: dados.tipoServico as never,
      valorTotal,
      porcentagemComissao,
      statusPagamento: dados.statusPagamento as never,
      dataFechamento: dados.dataFechamento,
      ...calculados,
    },
  });
}

export async function excluirProjeto(id: number) {
  const atual = await prisma.projeto.findUnique({ where: { id } });
  if (!atual) return null;

  await prisma.projeto.delete({ where: { id } });
  return atual;
}

export async function obterEstatisticas() {
  const projetos = await prisma.projeto.findMany();

  const faturamentoTotal = projetos.reduce((soma, p) => soma + p.valorTotal, 0);
  const totalProspectadores = projetos.reduce(
    (soma, p) => soma + p.valorComissao,
    0,
  );
  const receitaLiquida = projetos.reduce(
    (soma, p) => soma + p.valorLiquidoDevs,
    0,
  );
  const cotaDev1 = projetos.reduce((soma, p) => soma + p.cotaDev1, 0);
  const cotaDev2 = projetos.reduce((soma, p) => soma + p.cotaDev2, 0);

  return {
    totalProjetos: projetos.length,
    faturamentoTotal: arredondar(faturamentoTotal),
    totalProspectadores: arredondar(totalProspectadores),
    receitaLiquidaTotal: arredondar(receitaLiquida),
    cotasDevs: {
      cotaDev1: arredondar(cotaDev1),
      cotaDev2: arredondar(cotaDev2),
    },
  };
}