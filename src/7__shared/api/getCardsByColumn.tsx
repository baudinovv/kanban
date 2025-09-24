import type { UniqueIdentifier } from "@dnd-kit/core";
import supabase from "../../2__processes/supabase";
import type { CardType } from "../../6__entities/Card/model/CardType";

export async function getCardsByColumn(columnId: UniqueIdentifier): Promise<CardType[]>{
  try {

    const {data} = await supabase.from("Card")
    .select("*")
    .eq("column", columnId)

    return data ?? [];
  } catch (error) {
    console.log(error);
    return [];
  }
}