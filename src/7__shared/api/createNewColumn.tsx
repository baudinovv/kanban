import type { User } from "@supabase/supabase-js";
import supabase from "../../2__processes/supabase";


export async function createNewColumn(columnName: string, boardId: string, user: User) {
  try {
    const {data} = await supabase.from("Column")
    .insert([
      {name: columnName, board_id: boardId, user_id: user.id} 
    ])
    .select("*")
    .single()

    return data ?? {};
  } catch (error) {
    console.log(error)
    return {};
  }
}
