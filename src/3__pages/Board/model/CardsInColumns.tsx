import type { CardType } from "../../../6__entities/Card/model/CardType";
import type { ColumnType } from "../../../6__entities/Column/ColumnType";

export interface CardsInColumns {
  column: ColumnType;
  cards: CardType[];
}