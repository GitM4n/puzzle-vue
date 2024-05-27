<script setup lang="ts">
import {computed} from 'vue'
const emit = defineEmits<{
    (e:'openModal'):void
}>()

const props = defineProps<{
    folderName:string
}>()

const imgSrc = computed(()=>{
    return new URL(`../assets/images/${props.folderName}/preview.jpg`, import.meta.url).href
})


</script>

<template>
    <div class="select-image" >
        <div class="select-image__inner">
            <div class="current-image">
                <img :src="imgSrc" alt="img">
            </div>
        </div>

        <button @click="emit('openModal')">Change Picture</button>
    </div>
</template>


<style scoped>
.select-image{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.current-image{
    position: relative;
    border-radius: 10px;
    border: 1px solid rgb(95, 255, 47);
    width: 300px;
   
}

.current-image img{
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
   
}



</style>