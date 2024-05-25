import { ref } from 'vue';

const currTile = ref<HTMLImageElement | null>(null);
const targetTile = ref<HTMLImageElement | null>(null);

export const useDragEvents = () => {
    const dragStart = (event: DragEvent) => {
        currTile.value = event.target as HTMLImageElement;
  
    };

    const dragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const dragEnter = (e: DragEvent) => {
        e.preventDefault();
    };

    const dragDrop = (event: DragEvent) => {
        targetTile.value = event.target as HTMLImageElement;
       
    };
    
    const dragEnd = () => {

        if (!currTile.value || !targetTile.value) return;

        const emptyImgId = currTile.value?.src.slice(-5,-4)

    
        if(emptyImgId === '9') return


      



        const r1 = parseInt(currTile.value.id.split('-')[0]);
        const c1 = parseInt(currTile.value.id.split('-')[1]);

        const r2 = parseInt(targetTile.value.id.split('-')[0]);
        const c2 = parseInt(targetTile.value.id.split('-')[1]);

        const moveLeft = r1 == r2 && c2 == c1-1
        const moveRight = r1 == r2 && c2 == c1+1
        const moveUp = c1 == c2 && r2 == r1-1
        const moveDown = c1 == c2 && r2 == r1+1
        const isEmpty = targetTile.value.src.includes('9.png')



        const isMoveValid = (moveLeft || moveRight || moveUp || moveDown)&&isEmpty

        if(!isMoveValid) return
        
        const currSrc = currTile.value.src;
        const targetSrc = targetTile.value.src;

        currTile.value.src = targetSrc;
        targetTile.value.src = currSrc;
    };

    return {
        dragStart,
        dragOver,
        dragDrop,
        dragEnter,
        dragEnd,
        currTile,
        targetTile
    };
};
