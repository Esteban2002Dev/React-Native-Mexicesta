import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from '../data/interfaces/cart.interfaces';
import { Item } from '../data/interfaces/item.interface';
import { StorageKey } from '../constants/storageKeys';


export const saveData = async (key: StorageKey, data: Cart | Item) => {
    try {
        const JSONData = JSON.stringify(data);
        await AsyncStorage.setItem(key, JSONData); 
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getData = async (key: StorageKey) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const deleteData = async (key: StorageKey) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error: any) {
        throw new Error(error);
    }
}
