import { create } from 'zustand';
import { Status } from '@enums/status.enum';
import { Cart } from '@interfaces/cart.interfaces';
import { deleteData, getData, saveData } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';

export interface CartState {
    allCarts: Cart[];

    setCarts: () => void;
    createCart: (cart: Cart) => void;
    updateCart?: (id: string, updatedCart: Cart) => void;
    getCartById: (id: string) => Promise<Cart | undefined>;

    updateCartStatus?: (id: string, status: Status) => void;
    deleteCart?: (key: string) => void;
}

export const useCart = create<CartState>()((set, get) => ({
    allCarts: [],

    setCarts: async () => {
        const carts = await getData(STORAGE_KEYS.CART_KEY);
        set({allCarts: carts});
    },
    getCartById: async (id: string) => {
        const allCarts: Cart[] = await getData(STORAGE_KEYS.CART_KEY);
        const cart = allCarts.find((cart: Cart) => cart.id === id);
        if ( cart ) {
            return cart;
        }
        return undefined;
    },
    createCart: async (cart: Cart) => {
        let allCarts = await getData(STORAGE_KEYS.CART_KEY);
        allCarts = [cart, ... allCarts];
        await saveData(STORAGE_KEYS.CART_KEY, allCarts);
        get().setCarts();
    },
    deleteCart: async (key: string) => {
        await deleteData(key);
        get().setCarts();
    }
}));

