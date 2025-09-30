
<template>
  <section>
    <h2>Máquinas ({{ store.totalMaquinas }})</h2>

    <MaquinaForm
      v-if="!editing"
      @submit="store.addMaq"
      :submitting="store.loading"
    />

    <MaquinaForm
      v-else
      :initial="editing"
      :submitting="store.loading"
      @submit="(payload) => { store.updateMaq(editing._id, payload); editing=null; }"
      @cancel="cancelEdit"
      edit
    />

    <p v-if="store.error" style="color:#b00020">{{ store.error }}</p>

    <MaquinaList :maquinas="store.maquinas" @edit="edit" @remove="store.removeMaq" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMaquinaStore } from "../stores/maquinas";
import MaquinaForm from "../components/MaquinaForm.vue"
import MaquinaList from "../components/MaquinaList.vue";

const store = useMaquinaStore();
const editing = ref(null);

onMounted(() => {
  store.fetchMaq();
});

function edit(maquina) {
  editing.value = { ...maquina };
}

function cancelEdit() {
  editing.value = null;
}
</script>


