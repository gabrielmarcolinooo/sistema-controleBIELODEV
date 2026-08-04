import express, { Express } from "express";
import cors from "cors";
import projetoRoutes from "./routes/projetoRoutes";

export function criarApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/projetos", projetoRoutes);

  return app;
}