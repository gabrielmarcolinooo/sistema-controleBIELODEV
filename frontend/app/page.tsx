"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  Projeto,
  StatusPagamento,
  Estatisticas,
} from "@/lib/types";
import {
  listarProjetos,
  obterEstatisticas,
  criarProjeto,
  atualizarProjeto,
  excluirProjeto,
} from "@/lib/api";
import DashboardCards from "@/components/DashboardCards";
import ProjectForm from "@/components/ProjectForm";
import SalesTable from "@/components/SalesTable";

export default function Home() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      const [lista, stats] = await Promise.all([
        listarProjetos(),
        obterEstatisticas(),
      ]);
      setProjetos(lista);
      setEstatisticas(stats);
      setErro(null);
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível carregar os dados do servidor",
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  async function handleAdd(dados: {
    nomeCliente: string;
    nomeProspector: string;
    tipoServico: Projeto["tipoServico"];
    valorTotal: number;
    porcentagemComissao: number;
  }) {
    await criarProjeto(dados);
    await carregarDados();
  }

  async function handleUpdateStatus(id: number, status: StatusPagamento) {
    await atualizarProjeto(id, { statusPagamento: status });
    await carregarDados();
  }

  async function handleDelete(id: number) {
    await excluirProjeto(id);
    await carregarDados();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/15 text-sm font-black text-cyan-400">
              $
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Painel Administrativo
              </h1>
              <p className="hidden text-sm text-neutral-400 sm:block">
                Sistema interno de controle de vendas
              </p>
            </div>
          </div>
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-400">
            ADMIN
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        {carregando ? (
          <div className="flex items-center justify-center py-24 text-neutral-400">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-700 border-t-cyan-400" />
          </div>
        ) : erro ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="font-semibold text-red-400">{erro}</p>
            <button
              onClick={carregarDados}
              className="mt-4 rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <DashboardCards
              projetos={projetos}
              estatisticas={estatisticas}
            />
            <ProjectForm onAdd={handleAdd} />
            <SalesTable
              projetos={projetos}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </main>
  );
}