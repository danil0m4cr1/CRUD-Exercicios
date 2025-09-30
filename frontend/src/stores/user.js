import { defineStore } from "pinia";
import api from "../services/api";
// Importa as bibliotecas

export const useUserStore = defineStore("user", { // Criando um store
  state: () => ({ // States
    users: [],
    loading: false,
    error: null
  }),
  getters: { // Getters
    totalUsers: (state) => state.users.length
  },
  actions: { // Actions
    async fetchUsers() { // Req para API users
      this.loading = true;
      this.error = null;
      try {
        const res = await api.get("/users");
        this.users = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao buscar usuários";
      } finally {
        this.loading = false;
      }
    },
    async addUser(user) { // Req de add users
      this.error = null;
      try {
        const res = await api.post("/users", user);
        this.users.unshift(res.data);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao criar usuário";
      }
    },
    async updateUser(id, payload) { // Req de atualização de user
      this.error = null;
      try {
        const res = await api.put(`/users/${id}`, payload);
        const idx = this.users.findIndex(u => u._id === id);
        if (idx !== -1) this.users[idx] = res.data;
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao atualizar usuário";
      }
    },
    async removeUser(id) { // Req de remoção de user
      this.error = null;
      try {
        await api.delete(`/users/${id}`);
        this.users = this.users.filter(u => u._id !== id);
      } catch (e) {
        this.error = e?.response?.data?.error || "Erro ao remover usuário";
      }
    }
  }
});
