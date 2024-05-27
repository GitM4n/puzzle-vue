<script setup lang="ts">
import {computed} from 'vue'
import { useSetImages } from '../composables/useSetImages';

const emit = defineEmits<{
    (e: 'setImg', value: string): void
}>()

const imageNames = useSetImages().imageFolders

const imagesSrc = computed(()=>{
    return imageNames.value.map(name => {
        return {
            url: new URL(`../assets/images/${name}/preview.jpg`, import.meta.url).href,
            folderName:name
        }
    })
}) 

</script>

<template>
    <div class="select-images-modal">
        <div class="select-images-modal__inner">
            <h2 class="select-images-modal__title">Choose picture</h2>
            <ul class="images">
                <li class="image" v-for="img in imagesSrc" @click="emit('setImg', img.folderName)">
                    <img :src="img.url" alt="img">
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.select-images-modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.904);
    z-index: 99;
}

.select-images-modal__inner{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    border: 4px solid green;
    border-radius: 10px;
}



.images{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.image {
    position: relative;
    cursor: pointer;
    transition: transform .4s ease-in-out;
    width: 200px;
    height: 150px;
   
}

.image::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow:  0 0 10px 15px rgba(0, 0, 0, 0.233) inset;
   
}

.image:hover{
    transform: scale(1.1);
}

.image img{
    width: 100%;
    height: 100%;
   
}


@media (max-width:970px) {
    .images{
       
    }
}


</style>