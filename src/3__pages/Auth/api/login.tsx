import supabase from "../../../2__processes/supabase";

export async function login(
  setLogin: (arg: boolean) => void,
  setError: (arg: boolean) => void,
  email: string,
  password: string
) {
  
  const value = await supabase.auth.signInWithPassword({ email, password });

  if (value.error == null) {
    setLogin(true);
    const session = await supabase.auth.getSession();

    console.log(session)
    localStorage.setItem("session", JSON.stringify(session.data.session));
  } else {
    setError(true);
  }
 
}