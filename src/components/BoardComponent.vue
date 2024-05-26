<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDragEvents } from '../composables/useDragEvents';

type ImgOrder = {
  id:string,
  src:string,

}

const dragEvents = useDragEvents();

const properties = ref({
  rows: 3,
  cols: 3,
});

const boardStyle = ref({
  gridTemplateColumns: `repeat(${properties.value.cols}, 200px)`,
  gridTemplateRows: `repeat(${properties.value.rows}, 200px)`,
  gap: `2px`,
});

const turns = ref<number>(0);

const pictureName = ref<string>('defo');
const imagesContainer = ref<HTMLDivElement>()

const imgOrder = ref<ImgOrder[]>([]);

const fillImgOrder = () => {
    let order = 0;
    imgOrder.value = []
    for (let i = 0; i < properties.value.rows; i++) {
      for (let j = 0; j < properties.value.cols; j++) {
        order++
        imgOrder.value.push({
          id:i.toString() + '-' + j.toString(),
          src:new URL(`../assets/${pictureName.value}/${order}.png`, import.meta.url).href,
        })
      }
    } 
}


const shuffleImg = () => {
  for (let i = imgOrder.value.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgOrder.value[i].src, imgOrder.value[j].src] = [imgOrder.value[j].src, imgOrder.value[i].src];
   
  }
};
const newGame = () => {
  fillImgOrder()
  shuffleImg()
  turns.value = 0
}

onMounted(()=>{
  fillImgOrder()

})

</script>

<template>

  <div class="board">
    <div class="board__inner" id="board-container" :style="boardStyle" ref="imagesContainer">
      <img
        v-for="img,idx in imgOrder"
        :key="idx"
        :src="img.src"
        :alt="img.id"
        :id="img.id"
        draggable="true"
        @dragstart="dragEvents.dragStart"
        @dragover="dragEvents.dragOver"
        @dragenter="dragEvents.dragEnter"
        @drop="dragEvents.dragDrop"
        @dragend="turns += dragEvents.dragEnd()"
        @touchstart="dragEvents.touchStart"
        @touchend="turns += dragEvents.touchEnd($event)"
        @touchmove="dragEvents.touchMove"
      >
    </div>
  </div>

  <h2 class="turns">Turns:{{turns}}</h2>
  <button class="new-game" @click="newGame">New Game</button>
 
</template>

<style scoped>
.board {
  margin: 0 auto;
  border: 10px solid rgb(95, 255, 47);
}

.board__inner {
  display: grid;
  background-color: rgba(95, 255, 47, 0.2);
}

img{
  width: 200px;
  height: 200px;
}

</style>
