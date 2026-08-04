import { NextRequest, NextResponse } from "next/server";
import * as service from "@/lib/services/projetoService";
import {
  validarCriarProjeto,
  ErroValidacao,
} from "@/lib/validators/projetoValidator";

export async function GET() {
  try {
    const projetos = await service.listarProjetos();
    return NextResponse.json(projetos);
  } catch (error) {
    return tratarErro(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const dados = await request.json().catch(() => ({}));
    validarCriarProjeto(dados);
    const projeto = await service.criarProjeto(dados);
    return NextResponse.json(projeto, { status: 201 });
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