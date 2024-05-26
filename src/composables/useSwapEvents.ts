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
    
    const dragEnd = ():number => {
       
        if (!currTile.value || !targetTile.value) return 0;

        const emptysrc= currTile.value?.src
        const pattern = /\/9.*\.png$/
    
        if(pattern.test(emptysrc)) return 0

        const r1 = parseInt(currTile.value.id.split('-')[0]);
        const c1 = parseInt(currTile.value.id.split('-')[1]);

        const r2 = parseInt(targetTile.value.id.split('-')[0]);
        const c2 = parseInt(targetTile.value.id.split('-')[1]);

        const moveLeft = r1 == r2 && c2 == c1-1
        const moveRight = r1 == r2 && c2 == c1+1
        const moveUp = c1 == c2 && r2 == r1-1
        const moveDown = c1 == c2 && r2 == r1+1
        const isEmpty = pattern.test(targetTile.value.src)

        const isMoveValid = (moveLeft || moveRight || moveUp || moveDown)&&isEmpty

        if(!isMoveValid) return 0
        
        const currSrc = currTile.value.src;
        const targetSrc = targetTile.value.src;

        currTile.value.src = targetSrc;
        targetTile.value.src = currSrc;
        return 1
    };


    const touchStart = (event: TouchEvent) => {
        currTile.value = event.target as HTMLImageElement;
      };
      
      const touchMove = (event: TouchEvent) => {
        event.preventDefault();
      };
      
      const touchEnd = (event: TouchEvent):number => {
        targetTile.value = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY) as HTMLImageElement;
        return dragEnd();
      };



    return {
        dragStart,
        dragOver,
        dragDrop,
        dragEnter,
        dragEnd,
        currTile,
        targetTile,
        touchEnd,
        touchMove,
        touchStart,
    };
};






export const useClickEvent = () => {
    
const checkAdjacentElements = (id: string) => {
    let turn = 0;

    const [row, col] = id.split('-').map(Number);
    const adjacentIds = [
      `${row - 1}-${col}`, // Top
      `${row + 1}-${col}`, // Bottom
      `${row}-${col - 1}`, // Left
      `${row}-${col + 1}`  // Right
    ];
  
    adjacentIds.forEach(adjId => {
      const adjacentElement = document.getElementById(adjId) as HTMLImageElement;
      if (adjacentElement && /\/9.*\.png$/.test(adjacentElement.src)) {
         swapImages(id, adjacentElement.id);
         turn++
      }
      
    });

    return turn
  };
  
  const swapImages = (id1: string, id2: string) => {
    const img1 = document.getElementById(id1) as HTMLImageElement;
    const img2 = document.getElementById(id2) as HTMLImageElement;
    
    if (img1 && img2) {
      const tempSrc = img1.src;
      img1.src = img2.src;
      img2.src = tempSrc;
      
     
    }

 
  }

 

  return {
    checkAdjacentElements,
    swapImages,
   
  }
}