import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from '@interfaces/cart.interfaces';
import { Item } from '@interfaces/item.interface';
import { ItemForStorage } from '@interfaces/itemToStorage';
import { Settings } from '@interfaces/settings';

export const saveData = async (key: string, data: Cart[] | Item[] | ItemForStorage[] | Settings) => {
    try {
        const JSONData = JSON.stringify(data);
        await AsyncStorage.setItem(key, JSONData); 
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : [];
    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error: any) {
        throw new Error(error);
    }
}
