import { type UniqueIdentifier } from '@dnd-kit/core';
import { updateCardName } from '../../../7__shared/api/updateCardName';
import { debounce } from '../../../7__shared/api/debounce';
import { updateCardDone } from '../../../7__shared/api/updateCardDone';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  id: UniqueIdentifier;
  title? : string;
  isDone? : boolean;
  columnId?: UniqueIdentifier;
  index?: number;
  className?: string;
}

export default function Card(props: Props) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: props.id,
    data: {
      columnId: props.columnId,
      index: props.index,
      title: props.title,
      isDone: props.isDone,
      type: "Card"
    }
  });

  const style = {
    transition,
    transform : CSS.Transform.toString(transform),
  };

  return (
    <li className={"w-full overflow-y-hidden " + props.className} ref={setNodeRef}  {...listeners} {...attributes} style={style}> 
      <label 
          className='parentInput transition flex cursor-pointer items-center gap-3 p-3 text-theme-text rounded-xl w-full text-xs bg-opposite/80'
        >
        
        <input 
          type="checkbox" 
          defaultChecked={props.isDone} 
          id='' 
          name="cardInput" 
          className='cursor-pointer'
          onChange={(e) => debounce(updateCardDone, 1000)(props.id!, e.target.checked)}
        />

        <input 
          type="text" 
          defaultValue={props.title}
          className='cursor-pointer'
          onChange={(e) => debounce(updateCardName, 1000)(props.id!, e.target.value)} 
        />
      </label>
    </li>
  )
}