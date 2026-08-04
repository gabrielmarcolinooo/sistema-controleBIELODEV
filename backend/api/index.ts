import serverless from "serverless-http";
import { criarApp } from "../src/app";

const app = criarApp();

export const handler = serverless(app);