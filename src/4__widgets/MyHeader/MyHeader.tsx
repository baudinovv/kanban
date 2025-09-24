import { useUserStore } from "../../1__App/store/store";

import supabase from "../../2__processes/supabase";
import type { StoreType } from "../../1__App/store/StoreType";

import { ThemeSwitch } from "../../5__features/ThemeSwitch/ThemeSwitch";
import { MyInput } from "../../7__shared/ui/MyInput";
import trellologo from './assets/trellologo.png'
import { NavLink } from "react-router";


const MyHeader = () => {
  
  const setLogin = useUserStore((state: StoreType) => state.setLogin);

  function signOut(){
    setLogin(false);
    supabase.auth.signOut();
    localStorage.removeItem("session");
  }

  return (
    <header className="flex justify-between items-center pt-2 px-4">

      <NavLink to="/" className="flex items-center cursor-pointer">
        <img  className="w-12" src={trellologo} alt="" />
        <div className="text-theme-text font-bold">Trello</div>
      </NavLink>

      <div className="w-1/2">
        <MyInput 
          id="search"
          placeholder="Поиск"
        />
      </div>

      <ThemeSwitch />

      <button type="button" 
        className="transition cursor-pointer text-theme-text hover:text-theme-text-hover font-bold"
        onClick={signOut}
      >
        Выйти
      </button>

    </header>
  )
}

export default MyHeader;