import { Router } from "express";
import Maquina from "../models/Maquina.js";
// Importa as bibliotecas

const router = Router();

// Inserindo usuários no BD
router.post("/", async (req, res) => {
  try {
    const maquina = await Maquina.create(req.body);
    return res.status(201).json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao criar máquina", details: err.message });
  }
});

// Puxando os usuários do BD
router.get("/", async (req, res) => {
  try {
    const maquinas = await Maquina.find().sort({ createdAt: -1 });
    return res.json(maquinas);
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar máquinas" });
  }
});

// Puxa apenas um usuário do BD
router.get("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findById(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada" });
    return res.json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

// Atualiza um usuário no BD
router.put("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada" });
    return res.json(maquina);
  } catch (err) {
    return res.status(400).json({ error: "Erro ao atualizar", details: err.message });
  }
});

// Deleta um usuário no BD
router.delete("/:id", async (req, res) => {
  try {
    const maquina = await Maquina.findByIdAndDelete(req.params.id);
    if (!maquina) return res.status(404).json({ error: "Máquina não encontrada" });
    return res.status(204).send();
  } catch (err) {
    return res.status(400).json({ error: "ID inválido" });
  }
});

export default router;
