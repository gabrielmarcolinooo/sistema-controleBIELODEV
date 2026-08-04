import { NextRequest, NextResponse } from "next/server";
import * as service from "@/lib/services/projetoService";
import {
  validarAtualizarProjeto,
  validarId,
  ErroValidacao,
} from "@/lib/validators/projetoValidator";

interface Contexto {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, contexto: Contexto) {
  try {
    const { id: idRaw } = await contexto.params;
    const id = validarId(idRaw);
    const projeto = await service.buscarProjeto(id);
    if (!projeto) {
      return NextResponse.json({ erro: "Projeto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(projeto);
  } catch (error) {
    return tratarErro(error);
  }
}

export async function PUT(request: NextRequest, contexto: Contexto) {
  try {
    const { id: idRaw } = await contexto.params;
    const id = validarId(idRaw);
    const dados = await request.json().catch(() => ({}));
    validarAtualizarProjeto(dados);
    const projeto = await service.atualizarProjeto(id, dados);
    if (!projeto) {
      return NextResponse.json({ erro: "Projeto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(projeto);
  } catch (error) {
    return tratarErro(error);
  }
}

export async function DELETE(_request: NextRequest, contexto: Contexto) {
  try {
    const { id: idRaw } = await contexto.params;
    const id = validarId(idRaw);
    const projeto = await service.excluirProjeto(id);
    if (!projeto) {
      return NextResponse.json({ erro: "Projeto não encontrado" }, { status: 404 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return tratarErro(error);
  }
}

function tratarErro(error: unknown) {
  if (error instanceof ErroValidacao) {
    return NextResponse.json({ erro: error.message }, { status: 400 });
  }
  return NextResponse.json({ erro: "Erro interno do servidor" }, { status: 500 });
}