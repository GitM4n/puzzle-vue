<script setup lang="ts">
import {ref, watch} from 'vue'
import BoardComponent from './components/BoardComponent.vue'
import SwitchUI from './components/SwitchUI.vue';

const isDrag = ref<boolean>(true)

watch(isDrag, ()=>{
  console.log(isDrag.value)
})

</script>

<template>
<div class="wrapper">
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

  <div class="drag-mode">
    <p class="drag-mode__title">Used {{ isDrag ? 'Drag and Drop' : 'Click' }} Mode</p>
    <SwitchUI v-model="isDrag"/>
  </div>
  
  <BoardComponent :isDrag />
</div>
</template>

<style scoped>

.wrapper{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.powered{
  font-size: 2rem;
  line-height: 1;
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
