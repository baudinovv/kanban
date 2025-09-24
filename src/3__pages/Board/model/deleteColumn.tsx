import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CardsInColumns } from "./CardsInColumns";
import { deleteColumnById } from "../../../7__shared/api/deleteColumnById";

export default function deleteColumn(columnId: UniqueIdentifier, data: CardsInColumns[]) : CardsInColumns[]{
  const copyData = [...data];
  const columnIndex = data.findIndex((i) => i.column.id === columnId);
  copyData.splice(columnIndex, 1);

  console.log(deleteColumnById(columnId));

  return copyData;
}