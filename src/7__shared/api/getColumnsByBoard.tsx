import supabase from "../../2__processes/supabase";
import type { ColumnType } from "../../6__entities/Column/ColumnType";

export async function getColumnsByBoard(setLoading : (arg: boolean) => void , boardId: string, userId: string): Promise<ColumnType[]>{
  try {
    setLoading(true);
    const { data } = await supabase
    .from('Column')
    .select("*")
    
    .eq("user_id", userId)
    .eq("board_id", boardId);

    // console.log(data)

    return data ?? [];
  } catch (error) {
    console.log(error)
    return [];
  } finally{
    setLoading(false)
  }
  

}