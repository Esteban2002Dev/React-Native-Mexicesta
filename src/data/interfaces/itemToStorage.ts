import { Item } from './item.interface';

export interface ItemForStorage {
    cartId: string;
    items: Item[];
}