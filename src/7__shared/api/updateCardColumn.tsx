import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";

export async function updateCardColumn(cardId: number, newColumn: UniqueIdentifier){
  try{
    
    const {error} = await supabase.from("Card")
    .update({column: newColumn})
    .eq("id", cardId)
    .select("*");
    
    return error ?? true; 
  } catch (error){
    console.log(error)
    return false;
  }
}