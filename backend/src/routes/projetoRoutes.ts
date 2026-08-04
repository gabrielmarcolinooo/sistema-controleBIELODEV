import { Router, Request, Response, NextFunction } from "express";
import * as service from "../services/projetoService";
import {
  validarCriarProjeto,
  validarAtualizarProjeto,
  validarId,
} from "../validators/projetoValidator";
import { ErroValidacao } from "../validators/projetoValidator";

const router = Router();

router.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const projetos = await service.listarProjetos();
      res.json(projetos);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/estatisticas",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const estatisticas = await service.obterEstatisticas();
      res.json(estatisticas);
    } catch (error) {
      next(error);
    }
  },
);

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = validarId(String(req.params.id));
      const projeto = await service.buscarProjeto(id);
      if (!projeto) {
        res.status(404).json({ erro: "Projeto não encontrado" });
        return;
      }
      res.json(projeto);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dados = req.body ?? {};
      validarCriarProjeto(dados);
      const projeto = await service.criarProjeto(dados);
      res.status(201).json(projeto);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = validarId(String(req.params.id));
      const dados = req.body ?? {};
      validarAtualizarProjeto(dados);
      const projeto = await service.atualizarProjeto(id, dados);
      if (!projeto) {
        res.status(404).json({ erro: "Projeto não encontrado" });
        return;
      }
      res.json(projeto);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = validarId(String(req.params.id));
      const projeto = await service.excluirProjeto(id);
      if (!projeto) {
        res.status(404).json({ erro: "Projeto não encontrado" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

router.use(
  (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (error instanceof ErroValidacao) {
      res.status(400).json({ erro: error.message });
      return;
    }
    res.status(500).json({ erro: "Erro interno do servidor" });
  },
);

export default router;
