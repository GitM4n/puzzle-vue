<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue'
</script>

<template>
  <p class="powered">Powered by</p>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1 class="title">Puzzle Game</h1>
  <BoardComponent />
</template>

<style scoped>
.powered{
  font-size: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  padding-top: 0;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
