import mongoose from "mongoose";

const MaquinaSchema = new mongoose.Schema( // Define o template de objeto que deve ser retornado ao BD
  {
    name: { type: String, required: true, trim: true },
    series: { type: String, required: true, unique: true, lowercase: true, trim: true },
    status: { type: String, enum: ["Em Manutenção", "Funcionando"], default: "Funcionando" }
  },
  { timestamps: true }
);

export default mongoose.models.Maquina || mongoose.model("Maquina", MaquinaSchema); // Exporta o modelo