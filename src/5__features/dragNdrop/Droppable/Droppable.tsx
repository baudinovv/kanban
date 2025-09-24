import {  type ReactNode } from 'react'
import { useDroppable, type UniqueIdentifier } from '@dnd-kit/core';


type Props = {
  className?: string;
  id: UniqueIdentifier;
  children?: ReactNode[] | ReactNode;
  type: string;
}

export default function Droppable(props: Props) {

  const {setNodeRef} = useDroppable({
    id: props.id,
    data: {
      columnId: props.id,
      type: props.type
    }
  });

  return (
    <ul className={props.className} ref={setNodeRef}>
      {
        props.children
      }
    </ul>
  );
}