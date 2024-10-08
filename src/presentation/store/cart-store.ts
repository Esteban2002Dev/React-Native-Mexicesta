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

    updateCartStatus: (cartId: string, status: Status) => void;
    deleteCart: (cartId: string) => void;
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

    // TODO Maybe this function should return the cart to update it in the detailsScreen
    updateCartStatus: async (cartId: string, status: Status) => {
        const allCarts = await getData(STORAGE_KEYS.CART_KEY);
        let cart = allCarts.find((cart: Cart) => cart.id === cartId);
        if ( cart ) {
            cart.status = status;
            await saveData(STORAGE_KEYS.CART_KEY, allCarts);
            get().setCarts();
        }
    },
    deleteCart: async (cartId: string) => {
        let allCarts: Cart[] = await getData(STORAGE_KEYS.CART_KEY);
        allCarts = allCarts.filter((cart: Cart) => cart.id!== cartId);
        await saveData(STORAGE_KEYS.CART_KEY, allCarts);
        get().setCarts();
    }
}));

