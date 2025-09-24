import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";

export async function updateCardDone(cardId: UniqueIdentifier, newState: boolean){
  try{
    const {data , error} = await supabase.from("Card")
    .update({is_done: newState})
    .eq("id", cardId)
    .select("*");
    console.log(data,error)
    return true; 
  } catch (error){
    console.log(error)
    return false;
  }
}