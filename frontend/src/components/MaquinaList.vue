<template>
  <table border="1" cellpadding="6" cellspacing="0" width="100%">
    <thead>
      <tr>
        <th>Nome</th><th>Series</th><th>Perfil</th><th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="m in maquinas" :key="m._id">
        <td>{{ m.name }}</td>
        <td>{{ m.series }}</td>
        <td>{{ m.status }}</td>
        <td>
          <button @click="$emit('edit', m)">Editar</button>
          <button @click="$emit('remove', m._id)">Excluir</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({ maquinas: { type: Array, default: () => [] }});
const emit = defineEmits(["edit", "remove"]);
</script>
