import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

import { getBoardsByUser } from "../../7__shared/api/getBoardsByUser"

import { useUserStore } from "../../1__App/store/store";
import { MyLoader } from "../../7__shared/ui/MyLoader";
import { createNewBoard } from "../../7__shared/api/createNewBoard";
import { Modal } from "../../5__features/Modal/ui/Modal";
import { MyInput } from "../../7__shared/ui/MyInput";

import type { StoreType } from "../../1__App/store/StoreType";
import type { BoardType } from "../../6__entities/Board/BoardType";
import { MyButton } from "../../7__shared/ui/MyButton";
import type { User } from "@supabase/supabase-js";

type Props = {
  className?: string;
}

export const Feed = (props: Props) => {
  const setLoading = useUserStore((state: StoreType) => state.setLoading);
  const isLoading = useUserStore((state: StoreType) => state.isLoading);
  const setModal = useUserStore((state: StoreType) => state.setModal);
  const navigate = useNavigate();
  const user = useRef(JSON.parse(localStorage.getItem("session") || "{}")?.user as User);
  
  const [createInput, setInput] = useState("")
  
  const [boards, setBoards] = useState([] as BoardType[]);
  
  useEffect(() => {
    getBoardsByUser(setLoading, user.current).then((res: BoardType[]) => {
      setBoards(res);
    })

  }, [setLoading])

  return (
    <>
    
    <main {...props}>
        <nav className="flex flex-col">
          <a href="" className="transition text-theme-text font-semibold mt-5 text-sm hover:text-theme-text-hover" >Доски</a>
          <a href="" className="transition text-theme-text font-semibold mt-5 text-sm hover:text-theme-text-hover" >Рабочие пространства</a>
        </nav>
        
        <ul className="flex gap-3 flex-wrap w-full">
          {
            isLoading ?
              <MyLoader className="m-auto"/>
            :
            <>
              {/* All boards render */}
              {boards?.map((value : BoardType) => 
                <li onClick={() => navigate("/board/" + value.name)} key={value.id} 
                  className='transition w-52 h-20 border-2 border-theme-text opacity-30 hover:opacity-100 rounded-xl flex items-end cursor-pointer justify-center'>
                  
                  <h4 className='text-theme-text text-md'>{value.name}</h4>
                </li>
              ) }         
              
              {/* Add new board */}
              <button
                type="button"
                onClick={() => setModal(true)} 
                className='transition w-52 h-20 border-2 border-theme-text opacity-30 hover:opacity-100 rounded flex items-center cursor-pointer justify-center'>
                
                <h4 className='text-theme-text text-5xl'>+</h4>
              </button>

            </>
          }
        </ul>
      </main>

      {/* Create new board modal */}
      {(useUserStore((state : StoreType) => state.isModalOpen) ? 

        <Modal>

          <section
            className="absolute w-full top-1/2 left-0 m-auto flex flex-col justify-center items-center gap-5"
          >

            <MyInput 
              className="max-w-1/3 border-white text-white shadow-white"
              placeholder='Введите название новой доски'
              onChange={(event) => setInput(event.target.value)}
            />

            <MyButton 
              className="max-w-1/3 border-white text-white shadow-white hover:bg-white hover:border-white hover:text-black"

              onClick={async () => {
                createNewBoard({name: createInput});
                await getBoardsByUser(setLoading, user.current).then((state) => setBoards(state));
                setModal(false);
              }}
            >
              Создать
            </MyButton>

          </section>

        </Modal>
        
      : <></>
      )}
    </>
  )
} 