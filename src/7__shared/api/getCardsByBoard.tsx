import type { User } from "@supabase/supabase-js";
import supabase from "../../2__processes/supabase";

export async function getCardsByBoard(boardId: string, user: User){
  try {
    const {data, error} = await supabase.from('Card')
    .select("*")
    .eq("board", boardId)
    .eq("user_id", user.id)

    return data ?? error;
  } catch (error) {
    console.log(error)
  }
}