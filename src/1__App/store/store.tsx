import { create } from "zustand"
import type { StoreType } from "./StoreType"

export const useUserStore = create<StoreType>((set) => ({
  isLogged: false,
  theme: "dark",
  isLoading: true,
  isModalOpen: false,
  setLogin: (arg: boolean) => set(() => ({ isLogged: arg })),
  setTheme: (arg: string) => set(() => ({ theme: arg })),
  setLoading: (arg: boolean) => set(() => ({ isLoading: arg })),
  setModal: (arg: boolean) => set(() => ({ isModalOpen: arg })),
}))
