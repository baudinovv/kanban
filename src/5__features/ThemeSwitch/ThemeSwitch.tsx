import { useUserStore } from "../../1__App/store/store"
import type { StoreType } from "../../1__App/store/StoreType"
import { useRef } from "react";

export const ThemeSwitch = () => {
  
  const setTheme = useUserStore((state: StoreType) => state.setTheme);
  const theme = useUserStore((state: StoreType) => state.theme);
  const input = useRef(null);

  function switchTheme(){
    if(theme === 'dark') setTheme('light');
    else setTheme('dark');
  }


  return (
    <input
      ref={input}
      onClick={switchTheme}
      type="checkbox" name="" id="" />    
  )
}