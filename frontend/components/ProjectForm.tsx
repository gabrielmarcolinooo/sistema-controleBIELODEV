"use client";

import { useState } from "react";
import type { Projeto } from "@/lib/types";

const SERVICOS: { value: Projeto["tipoServico"]; rotulo: string }[] = [
  { value: "SISTEMA_WEB", rotulo: "Sistema Web" },
  { value: "SITE_INSTITUCIONAL", rotulo: "Site Institucional" },
  { value: "LANDING_PAGE", rotulo: "Landing Page" },
];

interface ProjectFormProps {
  onAdd: (dados: {
    nomeCliente: string;
    nomeProspector: string;
    tipoServico: Projeto["tipoServico"];
    valorTotal: number;
    porcentagemComissao: number;
  }) => Promise<void>;
}

export default function ProjectForm({ onAdd }: ProjectFormProps) {
  const [nomeCliente, setNomeCliente] = useState("");
  const [nomeProspector, setNomeProspector] = useState("");
  const [tipoServico, setTipoServico] = useState<Projeto["tipoServico"]>(
    SERVICOS[0].value,
  );
  const [valorText, setValorText] = useState("");
  const [porcentagemComissao, setPorcentagemComissao] = useState(15);
  const [salvando, setSalvando] = useState(false);

  const valorTotal = parseBRL(valorText);
  const comissao = (valorTotal * porcentagemComissao) / 100;
  const receitaLiquida = valorTotal - comissao;
  const cotaPorDev = receitaLiquida / 2;

  function handleValorChange(value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      setValorText("");
      return;
    }
    const numeric = parseInt(digits, 10) / 100;
    setValorText(
      new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(numeric),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (valorTotal <= 0 || salvando) return;
    setSalvando(true);
    try {
      await onAdd({
        nomeCliente: nomeCliente.trim(),
        nomeProspector: nomeProspector.trim(),
        tipoServico,
        valorTotal,
        porcentagemComissao,
      });
      setNomeCliente("");
      setNomeProspector("");
      setValorText("");
      setPorcentagemComissao(15);
    } finally {
      setSalvando(false);
    }
  }

  const previewItems = [
    {
      rotulo: "Comissão do Prospector",
      valor: formatBRL(comissao),
      cor: "text-amber-400",
    },
    {
      rotulo: "Receita Líquida dos Devs",
      valor: formatBRL(receitaLiquida),
      cor: "text-emerald-400",
    },
    {
      rotulo: "Cota por Dev",
      valor: formatBRL(cotaPorDev),
      cor: "text-sky-400",
    },
  ];

  const inputCls =
    "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder-neutral-500 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20";

  return (
    <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 shadow-sm sm:p-6">
      <h2 className="mb-5 text-lg font-semibold text-white">
        Entrada de Projeto
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Nome do Cliente
          </label>
          <input
            className={inputCls}
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            placeholder="Ex.: João da Silva"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Nome do Prospector
          </label>
          <input
            className={inputCls}
            value={nomeProspector}
            onChange={(e) => setNomeProspector(e.target.value)}
            placeholder="Ex.: Maria Souza"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Tipo de Serviço
          </label>
          <select
            className={inputCls}
            value={tipoServico}
            onChange={(e) =>
              setTipoServico(e.target.value as Projeto["tipoServico"])
            }
          >
            {SERVICOS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.rotulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Valor Total (R$)
          </label>
          <input
            className={inputCls}
            value={valorText}
            onChange={(e) => handleValorChange(e.target.value)}
            placeholder="0,00"
            inputMode="numeric"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            Comissão do Prospector: {porcentagemComissao}%
          </label>
          <input
            className={inputCls}
            type="range"
            min={0}
            max={100}
            step={1}
            value={porcentagemComissao}
            onChange={(e) => setPorcentagemComissao(Number(e.target.value))}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={valorTotal <= 0 || salvando}
            className="w-full rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Registrar Projeto"}
          </button>
        </div>
      </form>

      <div className="mt-6 rounded-xl border border-neutral-800 bg-black/40 p-4">
        <p className="mb-3 text-sm font-semibold text-neutral-200">
          Divisão em tempo real
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {valorTotal > 0 ? (
            previewItems.map((item) => (
              <div
                key={item.rotulo}
                className="flex items-center justify-between gap-2 rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3 sm:flex-col sm:items-start"
              >
                <span className="text-sm text-neutral-400">{item.rotulo}</span>
                <span className={`text-sm font-bold ${item.cor}`}>
                  {item.valor}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-neutral-500">
              Digite o valor total para ver a divisão.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function parseBRL(value: string): number {
  const digits = value.replace(/\D/g, "");
  if (!digits) return 0;
  return parseInt(digits, 10) / 100;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}