<script setup lang="ts">
import {ref, watch} from 'vue'
import BoardComponent from './components/BoardComponent.vue'
import SwitchUI from './components/SwitchUI.vue';
import SelectImagesModal from './components/SelectImagesModal.vue';
import SelectImage from './components/SelectImage.vue';


const isDrag = ref<boolean>(true)
const folderName = ref<string>('defo');
const isModal = ref<boolean>(false)
const rerender = ref<number>(0)



const setImg = (name:string) => {
    folderName.value = name
    isModal.value = false

}

watch(folderName, ()=>{
    rerender.value++
})




</script>

<template>
  <SelectImagesModal v-if="isModal" @setImg="setImg"/>
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
  
  <div class="content">
    <BoardComponent class="board-component" :isDrag  :folderName :key="rerender"/>
    <SelectImage :folderName @openModal="isModal=true"/>
  </div>
</div>
</template>

<style scoped>

.wrapper{
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.content{
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
  gap: 40px;
}
.board-component{
  flex: 0 0 60%;
}
</style>
