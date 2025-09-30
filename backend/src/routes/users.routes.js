import { Router } from "express";
import User from "../models/User.js";
// Importa as bibliotecas

const router = Router();

// Inserindo usuários no BD
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar usuário", details: err.message });
  }
});

// Puxando os usuários do BD
router.get("/", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Puxa apenas um usuário do BD
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

// Atualiza um usuário no BD
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

// Deleta um usuário no BD
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
