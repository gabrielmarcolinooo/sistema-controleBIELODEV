import type {
  Projeto,
  Estatisticas,
  CriarProjetoInput,
  AtualizarProjetoInput,
} from "@/lib/types";

const API_BASE = "/projetos";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => {
    return { erro: "Erro interno do servidor" };
  });

  if (!res.ok) {
    throw new Error(data?.erro ?? "Erro na requisição");
  }

  return data as T;
}

export function listarProjetos() {
  return request<Projeto[]>(API_BASE);
}

export function obterEstatisticas() {
  return request<Estatisticas>(`${API_BASE}/estatisticas`);
}

export function criarProjeto(dados: CriarProjetoInput) {
  return request<Projeto>(API_BASE, {
    method: "POST",
    body: JSON.stringify(dados),
  });
}

export function atualizarProjeto(id: number, dados: AtualizarProjetoInput) {
  return request<Projeto>(`${API_BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}

export function excluirProjeto(id: number) {
  return request<void>(`${API_BASE}/${id}`, { method: "DELETE" });
}