-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TipoServico" AS ENUM ('LANDING_PAGE', 'SITE_INSTITUCIONAL', 'SISTEMA_WEB');

-- CreateEnum
CREATE TYPE "StatusPagamento" AS ENUM ('PENDENTE', 'SINAL_PAGO', 'QUITADO');

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "nomeProspector" TEXT NOT NULL,
    "tipoServico" "TipoServico" NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "porcentagemComissao" DOUBLE PRECISION NOT NULL DEFAULT 15,
    "valorComissao" DOUBLE PRECISION NOT NULL,
    "valorLiquidoDevs" DOUBLE PRECISION NOT NULL,
    "cotaDev1" DOUBLE PRECISION NOT NULL,
    "cotaDev2" DOUBLE PRECISION NOT NULL,
    "statusPagamento" "StatusPagamento" NOT NULL,
    "dataFechamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

