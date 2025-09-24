import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";

export async function deleteColumnById(columnId: UniqueIdentifier){
  try{
    
    const {data} = await supabase.from("Column")
    .delete()
    .eq("id", columnId)
    .select();

    return data; 
  } catch (error){
    console.log(error)
    return error;
  }
}