import { useEffect, useState } from 'react';
import { Cart } from '@interfaces/cart.interfaces';
import { useItem } from '@store/item-store';
import { Item } from '@interfaces/item.interface';
import { useCart } from '@store/cart-store';

export function useCartDetails(cartId?: string, index?: number) {
    // State to hold the cart data
    const [cart, setCart] = useState<Cart | undefined>(undefined);
    const { getCartById } = useCart();
    
    const [currentIndex, setCurrentIndex] = useState<number>(index || 0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [items, setItems] = useState<Item[] | undefined>(undefined);
    const { getItemsByCartId, allItems } = useItem();

    useEffect(() => {
        const fetchCart = async () => {
            if (!cartId) {
                setError('Cart ID is required');
                setLoading(false);
                return;
            }
            try {
                const fetchedCart = await getCartById(cartId);
                setCurrentIndex(index || 0);
                setCart(fetchedCart);
                await getItemsByCartId(cartId);
            } catch (error) {
                setError('Failed to fetch cart');
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [cartId, getCartById, getItemsByCartId, index]);

    useEffect(() => {
        setItems(allItems);
    }, [allItems]);

    return {
        cart,
        currentIndex,
        loading,
        items,
        error
    }
}
