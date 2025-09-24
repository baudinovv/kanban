import { useParams } from 'react-router'
import { useEffect, useMemo, useState } from 'react'
import { useUserStore } from '../../../1__App/store/store'

import { getBoardsByName } from '../../../7__shared/api/getBoardByName'

import {
  horizontalListSortingStrategy,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { closestCorners } from '@dnd-kit/core';

import { createNewColumn } from '../../../7__shared/api/createNewColumn'
import { MyButton } from '../../../7__shared/ui/MyButton'
import { MyInput } from '../../../7__shared/ui/MyInput'
import { MyLoader } from '../../../7__shared/ui/MyLoader'
import { Modal } from '../../../5__features/Modal/ui/Modal'
import MyHeader from '../../../4__widgets/MyHeader/MyHeader'
import Droppable from '../../../5__features/dragNdrop/Droppable/Droppable'
import Column from '../../../6__entities/Column/ui/Column';

import { DragOverlay } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import Card from '../../../6__entities/Card/ui/Card'

import type { StoreType } from '../../../1__App/store/StoreType'
import type { BoardType } from '../../../6__entities/Board/BoardType'
import type { ColumnType } from '../../../6__entities/Column/ColumnType'
import type { CardType } from '../../../6__entities/Card/model/CardType'

import { useSensors } from '../../../5__features/dragNdrop/sensors/useSensors'
import { getColumnsByBoard } from '../../../7__shared/api/getColumnsByBoard'
import { getCardsByColumn } from '../../../7__shared/api/getCardsByColumn'
import { createNewCard } from '../../../7__shared/api/createNewCard';
import { generateUniqueId } from '@dnd-kit/dom/utilities';
import deleteColumn from '../model/deleteColumn';
import { useDragNDrop } from '../../../5__features/dragNdrop/useDragNDrop/useDragNDrop';
import { useBoardStore } from '../../../1__App/store/useBoardStore';

export const Board : React.FC = () => {

  const setLoading = useUserStore((state: StoreType) => state.setLoading);
  const setModal = useUserStore((state: StoreType) => state.setModal);
  const params = useParams();
  const sensors = useSensors();

  const [newCardName, setNewCardName] = useState<string | null>(null);

  const {startDrag, handleDragEnd} = useDragNDrop();

  const {
    data,
    board,
    activeCard,
    activeColumn,
    activeId,
    activeType,
    setBoard,
    setData
  } = useBoardStore();

  const startColumn = useMemo(
    () => data.find((i) => i.column.is_startColumn),
    [data]
  )
  
  const [addBtn, showAddBtn ] = useState(false);
  
  const user = JSON.parse(localStorage.getItem("session")!).user

  const boardId = board.id;
  const userId = user.id;
  
  const [inputColumn, setInputCol] = useState("");

  
  useEffect(() => {
    setModal(true);

    getBoardsByName(setLoading, params.name!, userId).then((res: BoardType) => {
      setBoard(res);
      setModal(false);
    });

  } , [params.name, setModal, setLoading, userId, setBoard]);
  
  useEffect(() => {

    if(!boardId) return;

    setModal(true);
    
    getColumnsByBoard(setLoading, boardId!, userId).then(async (cardCol: ColumnType[]) => {

        for(const column of cardCol){
          const res = await getCardsByColumn(column.id);
          setData((prev) => [...prev, { column: {...column}, cards: res}]);
        }
        
        setModal(false);
        
    });

  }, [params.name, setLoading, setModal, userId, boardId, setData])

  return (
    <>
      <MyHeader />

      <main className='w-full h-full max-h-11/12 flex gap-4 p-7'>
        <DndContext onDragStart={startDrag} onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCorners}>
          <DragOverlay>
            {
              activeType === "Card" ?
                <Card id={activeId ?? -1} title={activeCard?.name ?? ""} isDone={activeCard?.is_done ?? false}/>
              :
                <Column column={activeColumn?.column ?? {}} cards={activeColumn?.cards ?? []} className="border-1 border-theme-text rounded-2xl min-w-56 h-96 bg-theme-blue" />
            }
          </DragOverlay>
          <section className='h-full gap-8 items-center w-[15%] overflow-hidden flex flex-col border-1 border-theme-text/40 rounded-xl bg-theme-blue'>
            
            <section className='flex flex-col items-center'>
              <MyInput 
                  className='text-xs max-w-[95%] mt-5 bg-opposite/90 hover:bg-opposite hover:text-theme-text border-none focus:shadow-opposite'
                  placeholder='Введите название карточки'
                  onChange={(e) => setNewCardName(e.target.value)}
                />
              <MyButton 
                  className='text-xs max-w-[95%] mt-2 bg-opposite/90 hover:bg-opposite hover:text-theme-text border-none hover:shadow-opposite shadow'
                  onClick={() => {
                    createNewCard(newCardName ?? "", boardId!, user, startColumn?.column.id ?? 0, data).then(val => setData(val))
                  }}
                >
                Добавить
              </MyButton>
            </section>

            <Droppable 
              className='mt-6 w-[85%] flex flex-col items-center gap-2 mx-auto h-[80%]'
              id={startColumn?.column.id ?? -1}
              key={startColumn?.column.id}
              type='Column'
            >
              { startColumn?.cards && (
                <SortableContext items={startColumn?.cards.map(i => i.id!)} strategy={verticalListSortingStrategy}>
                    {startColumn?.cards.map((card: CardType, index) => 
                      <Card title={card.name}
                      columnId={startColumn.column.id} 
                      key={card.id} 
                      id={card.id!} 
                      isDone={card.is_done}
                      index={index}
                      className={(card?.id === activeId ? "opacity-0" : "")}
                      
                    />  )}
                </SortableContext>)
              }
            </Droppable>
          </section>
          <section className={'h-full w-[85%] border-1 border-theme-text/40 rounded-2xl bg-linear-to-r from-sky-500 to-purple-500 overflow-hidden ]'}>
            <h2 className='text-xl p-4 text-theme-text w-full backdrop-brightness-75'>{board.name}</h2>
            <section className="overflow-x-scroll h-[90%] scroll-custom">
              <Droppable 
                className='flex gap-5 p-6'
                type='Board'
                id={generateUniqueId("SortableColumn")}
              >
                <SortableContext items={data.map(i => i.column.id)} strategy={horizontalListSortingStrategy}>
                  {
                    data?.map(({cards, column}) => !column.is_startColumn ? 
                     <Column
                       className={`rounded-2xl min-w-56 w-56 min-h-80 bg-theme-blue ` + (column?.id == activeId ? "opacity-0" : "")}
                       key={column.id} 
                       cards={cards} 
                       column={column} 
                       deleteColumn={() => {
                        setData(deleteColumn(column.id, data));
                       }} 
                       activeId={activeId!}
                     /> : null)
                  }
                </SortableContext>
              {
                    addBtn ?
                    
                    <section className="w-xs flex flex-col items-center">
                      <MyInput 
                          className='text-xs w-full bg-opposite/90 hover:bg-opposite hover:text-theme-text border-none focus:shadow-opposite'
                          placeholder='Введите название новой колонны'
                          onChange={(event) => setInputCol(event.target.value)}
                          />
                      <section className='flex gap-2 w-full'>
                        <MyButton 
                          onClick={async () => {
                            await createNewColumn(inputColumn, board.id!, user);
                          }}
                          className='text-xs w-full mt-2 bg-opposite/90 hover:bg-opposite hover:text-theme-text border-none hover:shadow-opposite shadow'
                          >
                          Добавить
                        </MyButton>
                        <MyButton 
                          onClick={() => showAddBtn(false)}
                          className='text-xs w-full mt-2 bg-opposite/90 hover:bg-opposite hover:text-theme-text border-none hover:shadow-opposite shadow'
                          >
                          Отмена
                        </MyButton>
                      </section>
                    </section>
  
                    : <>
                        <MyButton 
                          onClick={() => showAddBtn(true)}
                          className='h-12 min-w-xs'
                        >
                          Добавить еще одну колонку
                        </MyButton>
                      </>
                  }
                
              </Droppable>
            </section>
          </section> 
        </DndContext>
      </main>

      {
        useUserStore((state: StoreType) => state.isModalOpen) ? 
        <Modal>
          <MyLoader className="absolute top-1/2 left-1/2"/>
        </Modal>
        : <></>
      }

    </>
  )
}