import express from "express";
import cors from "cors";
import projetoRoutes from "../src/routes/projetoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/projetos", projetoRoutes);

export default app;