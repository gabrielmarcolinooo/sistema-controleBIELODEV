"use client";

import type { Projeto, StatusPagamento } from "@/lib/types";
import { formatBRL } from "@/lib/format";

const STATUS: Record<StatusPagamento, { rotulo: string; classes: string }> = {
  PENDENTE: {
    rotulo: "Pendente",
    classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  },
  SINAL_PAGO: {
    rotulo: "Sinal Pago 50%",
    classes: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  },
  QUITADO: {
    rotulo: "Quitado",
    classes: "bg-green-500/10 text-green-400 border-green-500/30",
  },
};

const STATUS_ORDEM: StatusPagamento[] = [
  "PENDENTE",
  "SINAL_PAGO",
  "QUITADO",
];

const SERVICO_ROTULO: Record<Projeto["tipoServico"], string> = {
  LANDING_PAGE: "Landing Page",
  SITE_INSTITUCIONAL: "Site Institucional",
  SISTEMA_WEB: "Sistema Web",
};

interface SalesTableProps {
  projetos: Projeto[];
  onUpdateStatus: (id: number, status: StatusPagamento) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function SalesTable({
  projetos,
  onUpdateStatus,
  onDelete,
}: SalesTableProps) {
  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 p-5 pb-4">
        <h2 className="text-lg font-semibold text-white">Vendas Registradas</h2>
        <span className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-300">
          {projetos.length} projeto(s)
        </span>
      </div>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-800 text-xs uppercase tracking-wide text-neutral-500">
              <th className="px-6 py-3 font-medium">Cliente</th>
              <th className="px-6 py-3 font-medium">Prospector</th>
              <th className="px-6 py-3 font-medium">Serviço</th>
              <th className="px-6 py-3 font-medium">Valor Total</th>
              <th className="px-6 py-3 font-medium">Comissão</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 text-right font-medium">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {projetos.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-neutral-500"
                >
                  Nenhum projeto registrado ainda.
                </td>
              </tr>
            ) : (
              projetos.map((p) => {
                const status = STATUS[p.statusPagamento];
                return (
                  <tr key={p.id} className="transition hover:bg-neutral-800/40">
                    <td className="px-6 py-4 font-medium text-white">
                      {p.nomeCliente}
                    </td>
                    <td className="px-6 py-4 text-neutral-400">
                      {p.nomeProspector}
                    </td>
                    <td className="px-6 py-4 text-neutral-400">
                      {SERVICO_ROTULO[p.tipoServico]}
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {formatBRL(p.valorTotal)}
                    </td>
                    <td className="px-6 py-4 text-neutral-400">
                      {p.porcentagemComissao}% ·{" "}
                      <span className="font-medium text-amber-400">
                        {formatBRL(p.valorComissao)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={p.statusPagamento}
                        onChange={(e) =>
                          onUpdateStatus(
                            p.id,
                            e.target.value as StatusPagamento,
                          )
                        }
                        className={`inline-flex cursor-pointer items-center rounded-full border px-3 py-1 text-xs font-semibold outline-none ${status.classes}`}
                      >
                        {STATUS_ORDEM.map((s) => (
                          <option key={s} value={s}>
                            {STATUS[s].rotulo}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDelete(p.id)}
                        className="rounded-lg px-2 py-1 text-xs font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-neutral-800 p-4 sm:hidden">
        {projetos.map((p) => (
          <div
            key={p.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-white">{p.nomeCliente}</span>
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${STATUS[p.statusPagamento].classes}`}
              >
                {STATUS[p.statusPagamento].rotulo}
              </span>
            </div>
            <div className="mt-2 space-y-1 text-sm text-neutral-400">
              <p>
                Prospector: <span className="text-neutral-200">{p.nomeProspector}</span>
              </p>
              <p>
                Serviço: <span className="text-neutral-200">{SERVICO_ROTULO[p.tipoServico]}</span>
              </p>
              <p>
                Valor: <span className="font-semibold text-white">{formatBRL(p.valorTotal)}</span>
              </p>
              <p>
                Comissão:{" "}
                <span className="font-medium text-amber-400">
                  {formatBRL(p.valorComissao)}
                </span>
              </p>
            </div>
            <button
              onClick={() => onDelete(p.id)}
              className="mt-3 w-full rounded-lg border border-red-500/30 px-2 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}