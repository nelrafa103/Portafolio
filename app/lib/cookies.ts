import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CookiesStore = create()(
	persist(
		(set, get) => ({
			isPending: false,
			userChoice: false,
			allowCookies: false,
			setCookies: () => set({ allowCookies: true }),
			setPending: (isPending: boolean) => set({ isPending }),
			setChoice: () => set({ userChoice: true }),
		}),
		{
			name: "preferences", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
		},
	),
);

type CookiesStoreType = {
	isPending: boolean;
	setPending: (isPending: boolean) => void;
	userChoice: boolean;
	allowCookies: boolean;
	setCookies: () => void;
	setChoice: () => void;
};

export type { CookiesStoreType };
export default CookiesStore;
