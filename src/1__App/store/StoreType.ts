
export interface StoreType {
  isLogged : boolean;
  theme : string;
  isLoading: boolean;
  isModalOpen: boolean;
  setLogin: (arg: boolean) => void;
  setTheme: (arg: string) => void;
  setLoading: (arg: boolean) => void;
  setModal: (arg: boolean) => void;
}