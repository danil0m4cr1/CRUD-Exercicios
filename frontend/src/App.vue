<script setup>
</script>

<template>
  <main style="max-width:960px;margin:2rem auto;font-family:system-ui,Arial">
    <h1>CRUD de Usuários</h1>
    <nav style="display:flex;gap:1rem;margin:1rem 0">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/users">Usuários</RouterLink>
      <RouterLink to="/maquinas">Máquinas</RouterLink>
    </nav>
    <RouterView/>
  </main>
</template>
