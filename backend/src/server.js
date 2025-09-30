/**
 * API REST de Usuários
 * Stack: Node.js + Express + Mongoose (MongoDB local/Compass)
 * Rotas base: /api/users
 */
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import usersRouter from "./routes/users.routes.js";
import maquinasRouter from "./routes/maquinas.routes.js";


config(); // carrega .env
const app = express();

// Middlewares básicos
app.use(cors());             // libera o acesso do front-end
app.use(express.json());     // habilita JSON no body
app.use(morgan("dev"));      // logs de requests no console

// Conectar ao MongoDB
await connectDB();

// Rotas de usuários
app.use("/api/users", usersRouter);
app.use("/api/maquinas", maquinasRouter);

// Sobe o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
