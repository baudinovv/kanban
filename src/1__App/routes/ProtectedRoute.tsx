import { useNavigate } from "react-router";
import { useUserStore } from "../store/store";
import type { StoreType } from "../store/StoreType";
import { useEffect, type ReactElement } from "react";
import supabase from "../../2__processes/supabase";
import type { AuthResponse } from "@supabase/supabase-js";

type Props = {

  children?: ReactElement
}

interface Session {
  access_token: string;
  refresh_token: string;
}

export const ProtectedRoute = (props : Props) => {

  const navigate = useNavigate();
  
  const isLogged = useUserStore((state: StoreType) => state.isLogged);
  const setLogin = useUserStore((state: StoreType) => state.setLogin)

  const session = localStorage.getItem("session");

  
  useEffect(() => {

    // if(location.pathname !== "/login" && location.pathname !== "/register") setLoading(true);

    if(session !== null){
      
      const storageSession : Session = JSON.parse(session);

      supabase.auth.setSession(
        storageSession
      ).then((value: AuthResponse) => {
        console.log(value)

        if(value.error === null) {
          setLogin(true)
        } else {
          navigate("/login");
          localStorage.removeItem("session")
        }
      }) 

    } else if(location.pathname !== "/register"){
      navigate("/login")
      localStorage.removeItem("session");
    }

  }, [isLogged, navigate, setLogin, session]);

  
  return (
    <>
      {props.children}
    </>
  )
}