import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";

export async function updateColumnName(columnId: UniqueIdentifier, newName: string){
  try{
    const {data , error} = await supabase.from("Column")
    .update({name: newName})
    .eq("id", columnId)
    .select("*");
    console.log(data,error)
    return true; 
  } catch (error){
    console.log(error)
    return false;
  }
}