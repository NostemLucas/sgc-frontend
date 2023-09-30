import { create } from 'zustand';

interface State {
  open: boolean;
  setStateSideBar: (isOpen: boolean) => void;
  modalState: boolean,
  setModalState: (isOpen: boolean) => void,
}

export const useSystemOperations = create<State>((set) => ({
  open: true,
  setStateSideBar: (isOpen: boolean) => set({ open: isOpen }),
  modalState:false,
  setModalState: (isOpen: boolean) => set({ modalState: isOpen }),
}));
