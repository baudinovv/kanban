import { useBoardStore } from "../../../1__App/store/useBoardStore"
import { updateCardColumn } from "../../../7__shared/api/updateCardColumn";

import { arrayMove } from "@dnd-kit/sortable";

import type {  DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import type { CardType } from "../../../6__entities/Card/model/CardType";

export const useDragNDrop = () => {
  const {
    data,
    setData,
    activeColumn,
    setActiveCard,
    setActiveId,
    setActiveColumn,
    setActiveType,
  } = useBoardStore();
  
  // Drag and drop handle events
  
  function startDrag(event: DragStartEvent){
    const { active } = event;
    
    if(active.data.current?.type === 'Column'){
      setActiveColumn({...active.data.current?.column})
    } else{
      setActiveCard({name: active.data.current?.title, is_done: active.data.current?.isDone})
    }

    setActiveId(active?.id)
    setActiveType(active.data.current?.type)
    console.log(active, activeColumn);
  }
  
  function handleDragEnd(event: DragEndEvent) {
    const {active,over} = event;

    if(!over) return;

    if(active.data.current?.type === 'Card'){
      const draggedTaskId = active.id as number;
      
      const newColumn = over.data.current?.columnId;
      const oldColumn = active.data.current?.columnId;
      const oldIndex = active.data.current?.index;
      
      updateCardColumn(draggedTaskId, newColumn);
  
      let draggedTask = {} as CardType;
  
  
      if(oldColumn === newColumn && over.data.current?.index !== undefined){
        // Case if it is sortable
        setData(prev => {
          return prev.map((item) => {
            const oldIndex = item.cards.findIndex( (c) => c.id == active.id );
            const newIndex = item.cards.findIndex( (c) => c.id == over.id );
              
            if (oldIndex !== -1 && newIndex !== -1) {
              return { ...item, cards: arrayMove(item.cards, oldIndex, newIndex) };
            }
            return item;
          })
        })
      } else{
        setData(prev =>
          prev.map(item => {
            if (item.column.id === oldColumn) {
              draggedTask = item.cards[oldIndex]; // find card by index
              return {
                ...item,
                cards: item.cards.filter(c => c.id !== draggedTaskId) // delete by id 
              };
            }
            return item;
          })
        );
    
        setData(prev => 
          prev.map((item) => {
            if (item.column.id === newColumn){
              return {...item, cards: [...item.cards, draggedTask] } // adding to new column
            } else{
              return item;
            }
          }
        ));

      }
      
      setActiveCard({});
    }
    
    if(active.data.current?.type === 'Column'){
      const oldIndex = data.findIndex( (c) => c.column.id == active.id );
      const newIndex = data.findIndex( (c) => c.column.id == over.id );
      
      setData(arrayMove(data, oldIndex, newIndex))
      
    }
    
    setActiveId(null);

  }

  return { 
    startDrag, 
    handleDragEnd, 
  };
}