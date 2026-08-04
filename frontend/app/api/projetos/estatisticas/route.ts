import { NextResponse } from "next/server";
import * as service from "@/lib/services/projetoService";

export async function GET() {
  try {
    const estatisticas = await service.obterEstatisticas();
    return NextResponse.json(estatisticas);
  } catch {
    return NextResponse.json({ erro: "Erro interno do servidor" }, { status: 500 });
  }
}