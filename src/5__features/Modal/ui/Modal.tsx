import type { ReactNode } from "react"
import { useUserStore } from "../../../1__App/store/store";
import type { StoreType } from "../../../1__App/store/StoreType";

type Props = {
  children: ReactNode;
}

export const Modal = (props: Props) => {

  const setModal = useUserStore((state: StoreType) => state.setModal)
  
  return (
    <>
      <div 
        onClick={() => setModal(false)}
        className="transition absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50">
        
      </div>
      {props.children}
    </>
  )
}