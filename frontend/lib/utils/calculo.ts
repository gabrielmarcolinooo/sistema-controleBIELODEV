export function arredondar(valor: number, casas = 2): number {
  return Number(valor.toFixed(casas));
}

export interface ValoresCalculados {
  valorComissao: number;
  valorLiquidoDevs: number;
  cotaDev1: number;
  cotaDev2: number;
}

export function calcularValores(
  valorTotal: number,
  porcentagemComissao: number,
): ValoresCalculados {
  const valorComissao = (valorTotal * porcentagemComissao) / 100;
  const valorLiquidoDevs = valorTotal - valorComissao;
  const cotaDev1 = valorLiquidoDevs / 2;
  const cotaDev2 = valorLiquidoDevs / 2;

  return {
    valorComissao: arredondar(valorComissao),
    valorLiquidoDevs: arredondar(valorLiquidoDevs),
    cotaDev1: arredondar(cotaDev1),
    cotaDev2: arredondar(cotaDev2),
  };
}