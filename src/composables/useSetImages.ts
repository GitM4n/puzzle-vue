import {ref} from 'vue'

const imageFolders = ref<string[]>([
    'cats',
    'defo',
    'mamont',
    'tulpans'
])

export const useSetImages = () => {
    return {
        imageFolders
    }
}