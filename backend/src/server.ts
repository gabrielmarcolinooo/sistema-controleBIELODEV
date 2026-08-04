import "dotenv/config";
import { criarApp } from "./app";

const PORT = Number(process.env.PORT) || 3000;

const app = criarApp();

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});