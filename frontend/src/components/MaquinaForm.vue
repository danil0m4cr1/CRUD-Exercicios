<template>
  <form @submit.prevent="onSubmit" style="display:grid; gap:0.5rem; margin:1rem 0">
    <input v-model="state.name" placeholder="Nome da máquina" required />
    <input v-model="state.series" placeholder="ID de série" required />
    <select v-model="state.status">
      <option disabled value="">Escolha uma opção:</option>
      <option value="Em Manutenção">Em Manutenção</option>
      <option value="Funcionando">Funcionando</option>
    </select>
    <div style="display:flex; gap:0.5rem">
      <button :disabled="submitting">{{ edit ? "Salvar" : "Adicionar" }}</button>
      <button v-if="edit" type="button" @click="$emit('cancel')">Cancelar</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, toRefs, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  initial: { type: Object, default: null },
  submitting: { type: Boolean, default: false },
  edit: { type: Boolean, default: false }
});
const emit = defineEmits(["submit", "cancel"]);

const state = reactive({
  name: "",
  series: "",
  status: ""
});

watch(() => props.initial, (val) => {
  if (val) {
    state.name = val.name || "";
    state.series = val.series || "";
    state.status = val.status || "";
  } else {
    state.name = ""; state.series = ""; state.status = "";
  }
}, { immediate: true });

function onSubmit() {
  emit("submit", { name: state.name, series: state.series, status: state.status });
}
</script>
