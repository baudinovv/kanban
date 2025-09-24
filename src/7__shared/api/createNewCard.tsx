import type { User } from "@supabase/supabase-js";
import supabase from "../../2__processes/supabase";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CardsInColumns } from "../../3__pages/Board/model/CardsInColumns";

import { v4 } from 'uuid';

export async function createNewCard(cardName: string, boardId: string, user: User, startColumnId: UniqueIdentifier, data: CardsInColumns[]): Promise<CardsInColumns[]>{
  const copyData = [...data];
  await supabase
  .from("Card")
  .insert([
    {name: cardName, user_id: user.id, board: boardId, column : startColumnId }
  ])
  .select("*")

  const columnIdx = copyData?.findIndex(i => i.column.id === startColumnId);
  const cardId = v4();

  if(columnIdx == -1){
    return data;
  }

  // return [...data, {...column, cards: [...column.cards, {name: cardName, id: cardId,  user_id: user.id, board: boardId, column : startColumnId}]}]
  copyData.splice(columnIdx, 1, {...copyData[columnIdx], cards: [...copyData[columnIdx].cards, {name: cardName, id: cardId,  user_id: user.id, board: boardId, column : startColumnId}]});
  return copyData;
}