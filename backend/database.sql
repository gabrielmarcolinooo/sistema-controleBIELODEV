CREATE DATABASE IF NOT EXISTS sistema_controle;
USE sistema_controle;

CREATE TABLE IF NOT EXISTS `Projeto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomeCliente` VARCHAR(191) NOT NULL,
  `nomeProspector` VARCHAR(191) NOT NULL,
  `tipoServico` ENUM('LANDING_PAGE', 'SITE_INSTITUCIONAL', 'SISTEMA_WEB') NOT NULL,
  `valorTotal` DOUBLE NOT NULL,
  `porcentagemComissao` DOUBLE NOT NULL DEFAULT 15,
  `valorComissao` DOUBLE NOT NULL,
  `valorLiquidoDevs` DOUBLE NOT NULL,
  `cotaDev1` DOUBLE NOT NULL,
  `cotaDev2` DOUBLE NOT NULL,
  `statusPagamento` ENUM('PENDENTE', 'SINAL_PAGO', 'QUITADO') NOT NULL,
  `dataFechamento` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
