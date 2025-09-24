import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";

export async function updateCardName(cardId: UniqueIdentifier, newName: string){
  try{
    const {data , error} = await supabase.from("Card")
    .update({name: newName})
    .eq("id", cardId)
    .select("*");
    console.log(data,error)
    return true; 
  } catch (error){
    console.log(error)
    return false;
  }
}