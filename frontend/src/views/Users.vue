
<template>
  <section>
    <h2>Usuários ({{ store.totalUsers }})</h2>

    <UserForm
      v-if="!editing"
      @submit="store.addUser"
      :submitting="store.loading"
    />

    <UserForm
      v-else
      :initial="editing"
      :submitting="store.loading"
      @submit="(payload) => { store.updateUser(editing._id, payload); editing=null; }"
      @cancel="cancelEdit"
      edit
    />

    <p v-if="store.error" style="color:#b00020">{{ store.error }}</p>

    <UserList :users="store.users" @edit="edit" @remove="store.removeUser" />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import UserForm from "../components/UserForm.vue";
import UserList from "../components/UserList.vue";

const store = useUserStore();
const editing = ref(null);

onMounted(() => {
  store.fetchUsers();
});

function edit(user) {
  editing.value = { ...user };
}

function cancelEdit() {
  editing.value = null;
}
</script>


