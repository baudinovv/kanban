import supabase from "../../../2__processes/supabase";

export async function register(
  
  setLogin : (arg: boolean) => void , 
  setError : (arg: boolean) => void ,
  email : string,
  password : string

) : Promise<void>{
  
  try {
    const value = await supabase.auth.signUp({
      email: email,
      password: password
    })


    await supabase.auth.signInWithPassword({email , password}).then(async (res) => {
      setLogin(true);
      const session = await supabase.auth.getSession();
      console.log(value);
      localStorage.setItem("session", JSON.stringify(session.data.session));
      console.log(res);
    })


    } catch (error) {
      console.log("f error again: " , error)      
      setError(true);
  }

}
