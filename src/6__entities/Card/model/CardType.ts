import type { UniqueIdentifier } from "@dnd-kit/core";

export interface CardType {
  id?: UniqueIdentifier;
  name?: string;
  column?: number;
  is_done?: boolean;
  board?: UniqueIdentifier;
  user_id?: UniqueIdentifier;
}