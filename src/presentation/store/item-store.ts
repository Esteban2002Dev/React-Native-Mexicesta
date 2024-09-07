import { create } from 'zustand';
import { Item } from '@interfaces/item.interface';
import { Status } from '@enums/status.enum';
import { getData, saveData } from '@services/storageService';
import { STORAGE_KEYS } from '@constants/storageKeys';
import { ItemForStorage } from '@interfaces/itemToStorage';

export interface ItemState {
    allItems: Item[];
    getItemsByCartId: (cartId: string) => void;
    saveGroupItems: (groupItems: ItemForStorage) => void;
    changeState: (cartId: string, itemId: string, newState: Status) => void;
    addPrice: (cartId: string, item: Item) => void;
}

export const useItem = create<ItemState>()((set, get) => ({
    allItems: [],
    
    getItemsByCartId: async (cartId: string) => {
        const groupItems: ItemForStorage[] = await getData(STORAGE_KEYS.ITEMS_BY_CART_KEY) || [];
        const items = groupItems.find(item => item.cartId === cartId);
        set({ allItems: items?.items });
    },
    saveGroupItems: async (groupItem: ItemForStorage) => {
        let groupItems: ItemForStorage[] = await getData(STORAGE_KEYS.ITEMS_BY_CART_KEY) || [];
        groupItems = [groupItem, ... groupItems];

        await saveData(STORAGE_KEYS.ITEMS_BY_CART_KEY, groupItems);
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
    },
    addPrice: async (cartId: string, updatedItem: Item) => {
        let groupItems: ItemForStorage[] = await getData(STORAGE_KEYS.ITEMS_BY_CART_KEY) || [];
        const cartIndex = groupItems.findIndex(groupItem => groupItem.cartId === cartId);
        if (cartIndex === -1) return;
    
        const items = groupItems[cartIndex].items;
        const itemIndex = items.findIndex(item => item.id === updatedItem.id);
        if (itemIndex === -1) return;

        items[itemIndex] = { ...items[itemIndex], price: updatedItem.price };
        groupItems[cartIndex] = { cartId, items };

        await saveData(STORAGE_KEYS.ITEMS_BY_CART_KEY, groupItems);
        set({ allItems: items });
    }
}));
