"use client";

import type { Estatisticas, Projeto } from "@/lib/types";
import { formatBRL } from "@/lib/format";

interface DashboardCardsProps {
  projetos: Projeto[];
  estatisticas: Estatisticas | null;
}

export default function DashboardCards({
  projetos,
  estatisticas,
}: DashboardCardsProps) {
  const totalComissoes = projetos.reduce(
    (soma, p) => soma + p.valorComissao,
    0,
  );
  const receitaLiquida = projetos.reduce(
    (soma, p) => soma + p.valorLiquidoDevs,
    0,
  );

  const cards = [
    {
      titulo: "Faturamento Total",
      valor: formatBRL(estatisticas?.faturamentoTotal ?? 0),
      icone: "R$",
      corIcone: "bg-indigo-500/15 text-indigo-400",
    },
    {
      titulo: "Comissões aos Prospectores",
      valor: formatBRL(totalComissoes),
      icone: "%",
      corIcone: "bg-amber-500/15 text-amber-400",
    },
    {
      titulo: "Receita Líquida dos Devs",
      valor: formatBRL(receitaLiquida),
      icone: "R$",
      corIcone: "bg-emerald-500/15 text-emerald-400",
    },
    {
      titulo: "Sua Cota / Cota do Sócio",
      valor: formatBRL(receitaLiquida / 2),
      icone: "50%",
      corIcone: "bg-sky-500/15 text-sky-400",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.titulo}
          className="flex items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-sm sm:p-5"
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${card.corIcone}`}
          >
            {card.icone}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-neutral-400 sm:text-sm">
              {card.titulo}
            </p>
            <p className="truncate text-lg font-bold text-white sm:text-xl">
              {card.valor}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}