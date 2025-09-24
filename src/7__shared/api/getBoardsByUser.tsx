import type { User } from "@supabase/supabase-js";
import supabase from "../../2__processes/supabase";
import type { BoardType } from "../../6__entities/Board/BoardType";

export async function getBoardsByUser(setLoading : (arg: boolean) => void , user: User)
  : Promise<BoardType[]>
{
  try {
    setLoading(true);
    const { data } = await supabase
    .from('Boards')
    .select("*")
    
    .eq("user_id", user.id);
    console.log(data)

    return data ?? [];
  } catch (error) {
    console.log(error)
    return [];
  } finally{
    setLoading(false)
  }
  

}