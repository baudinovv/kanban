import type { ColumnType } from '../ColumnType'
import type { CardType } from '../../Card/model/CardType';
import type { UniqueIdentifier } from '@dnd-kit/core';


import { verticalListSortingStrategy } from '@dnd-kit/sortable';

import Droppable from '../../../5__features/dragNdrop/Droppable/Droppable'
import Card from '../../Card/ui/Card';
import { MyInput } from '../../../7__shared/ui/MyInput';
import { DeleteBtn } from '../../../5__features/DeleteBtn/DeleteBtn';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { debounce } from '../../../7__shared/api/debounce';
import { updateColumnName } from '../../../7__shared/api/updateColumnName';
import { useState } from 'react';

type Props = {
  column : ColumnType;
  cards : CardType[];
  deleteColumn?: () => void;  
  activeId?: UniqueIdentifier;
  className?: string;
}

export default function Column({cards, column, deleteColumn, activeId, className}: Props) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: column?.id,
    data: {
      column: {column: column, cards: cards},
      columnId: column.id,
      type: "Column"
    }
  });


  const style = {
      transition,
      transform : CSS.Transform.toString(transform),
   };

  const updateColumn = debounce(updateColumnName, 500);

  const [inputValue, setInputValue] = useState(column.name)


  return (
    <li 
      key={column?.id} 
      className={className}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
    >
      <section className='flex items-center gap-5 justify-center mt-4 mx-2'>
        <MyInput
          placeholder=''
          onChange={(e) => {
            updateColumn(column.id, e.target.value)
            setInputValue(e.target.value);
          }}
          value={inputValue}
          className='max-w-[75%] border-none focus:border-1'
        /> 
        <DeleteBtn
          className='text-theme-text hover:text-button-hover cursor-pointer'
          onClick={deleteColumn}
        />
      </section>
      <Droppable 
        className='mt-6 w-[85%] flex flex-col items-center gap-2 mx-auto h-auto'
        id={column?.id}
        key={column?.id}
        type='Column'
      >
        <SortableContext items={cards?.map(i => i.id!)} strategy={verticalListSortingStrategy}>
          {
            cards?.map((card: CardType, index) => 
              <Card title={card?.name}
              columnId={column?.id} 
              key={card?.id} 
              id={card.id!} 
              isDone={card?.is_done}
              index={index}
              className={(card?.id === activeId ? "opacity-0" : "")}
            />  )
          }
        </SortableContext>
      </Droppable>
    </li>
  )
}