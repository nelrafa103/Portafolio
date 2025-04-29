import { create } from "zustand";
const MenuStore = create<MenuStoreType>((set) => ({
	isOpen: false,
	setOpen: (isOpen: boolean) => set({ isOpen }),
}));

type MenuStoreType = {
    isOpen: boolean;    
    setOpen: (isOpen: boolean) => void;
};

export default MenuStore;