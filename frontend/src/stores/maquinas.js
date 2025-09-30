import { defineStore } from "pinia";
import api from "../services/api";
// Importa as bibliotecas

export const useMaquinaStore = defineStore("maquinas", { // Criando um store
  state: () => ({ // States
    maquinas: [],
    loading: false,
    error: null
  }),
  getters: { // Getters
    totalMaquinas: (state) => state.maquinas.length
  },
  actions: { // Actions
    async fetchMaq(){
        this.loading = true;
        this.error = null;
        try {
          const res = await api.get('/maquinas');
            this.maquinas = res.data;
        } catch(e){
            this.error = e?.response?.data?.error || "Erro ao buscar máquinas";
        } finally {
            this.loading = false;
        }
    },
    async addMaq(maquina) { // Req de add users
      this.error = null;
      try {
        const res = await api.post("/maquinas", maquina);
        
        this.maquinas.unshift(res.data);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao adicionar máquina";
      }
    },
    async updateMaq(id, payload) { // Req de atualização de user
      this.error = null;
      try {
        const res = await api.put(`/maquinas/${id}`, payload);
        const idx = this.maquinas.findIndex(m => m._id === id);
        if (idx !== -1) this.maquinas[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar máquina";
      }
    },
    async removeMaq(id) { // Req de remoção de user
      this.error = null;
      try {
        await api.delete(`/maquinas/${id}`);
        this.maquinas = this.maquinas.filter(m => m._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover máquina";
      }
    }
  }
});
