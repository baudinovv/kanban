import supabase from "../../2__processes/supabase";
import type { BoardType } from "../../6__entities/Board/BoardType";

export async function createNewBoard(board: BoardType){
  try {
    const user = await supabase.auth.getUser();
    
    const {data} = await supabase
    .from("Boards")
    .insert([
      {...board, user_id: user.data.user?.id}
    ])
    .select("*")
    .single()
  
  
  
    await supabase.from("Column")
    .insert(
      [
        { name: "", user_id: user.data.user?.id, board_id: data?.id, is_startColumn: true }
      ]
    )
  
    console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
}