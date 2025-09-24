import type { UniqueIdentifier } from "@dnd-kit/core";

export interface ColumnType {
  name: string;
  user_id?: string;
  id: UniqueIdentifier;
  board_id?: string;
  is_startColumn : boolean;
}