import { create } from "zustand";

import type { CardType } from "../../6__entities/Card/model/CardType";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CardsInColumns } from "../../3__pages/Board/model/CardsInColumns";
import type { BoardType } from "../../6__entities/Board/BoardType";

interface BoardState {
  data: CardsInColumns[] ;
  board: BoardType;
  activeId: UniqueIdentifier | null;
  activeColumn: CardsInColumns | null;
  activeType: string | null;
  activeCard: CardType | null;

  setData: ( data: CardsInColumns[] | ((prev: CardsInColumns[]) => CardsInColumns[])) => void;
  setActiveId: (id: UniqueIdentifier | null) => void;
  setActiveColumn: (column: CardsInColumns | null) => void;
  setActiveType: (type: string | null) => void;
  setActiveCard: (card: CardType) => void;
  setBoard: (arg: BoardType) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  data: [],
  board: {},
  activeId: null,
  activeColumn: null,
  activeType: null,
  activeCard: {},
  
  setData: (arg) =>
    set((state) => ({
      data: typeof arg === "function" ? arg(state.data) : arg,
    })),
  setActiveId: (id) => set({ activeId: id }),
  setActiveColumn: (column) => set({ activeColumn: column }),
  setActiveType: (type) => set({ activeType: type }),
  setActiveCard: (card) => set({activeCard: card}),
  setBoard: (arg) => set({board: arg})
}));