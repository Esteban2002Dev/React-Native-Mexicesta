import { create } from "zustand";
import { Item } from '../../data/interfaces/item.interface';
import { Status } from "../../data/enums/status.enum";
import { getData, saveData } from "../../services/storageService";
import { STORAGE_KEYS } from "../../constants/storageKeys";
import { ItemForStorage } from "../../data/interfaces/itemToStorage";

export interface ItemState {
    allItems: Item[];
    getItemsByCartId: (cartId: string) => void;
    saveItems: (items: Item[]) => void;
    changeState: (cartId: string, itemId: string, newState: Status) => void;
}

export const useItem = create<ItemState>()((set, get) => ({
    allItems: [] as Item[],
    
    getItemsByCartId: async (cartId: string) => {
        const groupItems: ItemForStorage[] = await getData(STORAGE_KEYS.ITEMS_BY_CART_KEY) || [];
        const items = groupItems.find(item => item.cartId === cartId);
        set({ allItems: items?.items });
    },

    saveItems: async (items: Item[]) => {
        let allItems: Item[] = await getData(STORAGE_KEYS.ITEMS_KEY) || [];
        allItems = [...allItems, ...items];
        await saveData(STORAGE_KEYS.ITEMS_KEY, allItems);
    },

    changeState: async (cartId: string, itemId: string, newState: Status) => {
        let groupItems: ItemForStorage[] = await getData(STORAGE_KEYS.ITEMS_BY_CART_KEY) || [];
        
        const cartIndex = groupItems.findIndex(item => item.cartId === cartId);
        if (cartIndex === -1) return;

        // Obtener los ítems actuales del carrito
        const items = groupItems[cartIndex].items;

        // Actualizar el estado del ítem específico
        const updatedItems = items.map((item: Item) =>
            item.id === itemId
                ? { ...item, status: newState }
                : item
        );
        groupItems[cartIndex] = { cartId, items: updatedItems };

        set({ allItems: updatedItems });
        await saveData(STORAGE_KEYS.ITEMS_BY_CART_KEY, groupItems);
    }
}));
