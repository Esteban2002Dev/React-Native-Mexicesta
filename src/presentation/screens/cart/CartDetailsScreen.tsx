import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Cart } from '../../../data/interfaces/cart.interfaces';
import { Status } from '../../../data/enums/status.enum';
import { Color_messages, Color_palette } from '../../../config/theme/Colors';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { IonIcon } from '../../components/shared/IonIcon';
import { useCart } from '../../store/cart-store-';

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();
    
    // State to hold the cart data
    const [cart, setCart] = useState<Cart | undefined>(undefined);
    const [number, setNumber] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const { getCartById } = useCart();

    // Fetch the cart when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const fetchedCart = await getCartById(params!.cartId);
                setNumber(params!.index);
                setCart(fetchedCart);
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [params!.cartId, getCartById]);

    if (loading) {
        return (
            <View style={globalStyles.container}>
                <BackgroundGradient />
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.bold,
                        color: Color_palette.dark,
                        fontSize: 30,
                        textAlign: 'center'
                    }}>Cargando datos ...</Text>
                </View>
            </View>
        );
    }

    if (!cart) {
        return (
            <View style={globalStyles.container}>
                <BackgroundGradient />
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.bold,
                        color: Color_palette.dark,
                        fontSize: 30,
                        textAlign: 'center'
                    }}>No se encontró el carrito {params!.cartId}.</Text>
                    <IonIcon name='sad' color={Color_palette.dark} size={30} />
                </View>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            <BackgroundGradient />
            <ScrollView>
                <AppBar />
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                            {cart.title}
                        </Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.leftSide}>
                            <Text style={styles.subtitle}>
                                Carrito #{number}
                            </Text>
                            <Text style={styles.description}>
                                {cart.description}
                            </Text>
                        </View>
                        <View style={styles.rightSide}>
                            {cart.status === Status.CANCELLED
                            ? <IonIcon style={{alignSelf: 'center'}} name='warning' color={Color_messages.danger} size={40} />
                            : cart.status === Status.COMPLETED 
                            ? <IonIcon style={{alignSelf: 'center'}} name='checkmark-circle' color={Color_messages.success} size={40} />
                            : cart.status === Status.PENDING
                            ? <IonIcon style={{alignSelf: 'center'}} name='time' color={Color_messages.info} size={40} />
                            : null}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 15,
    },
    titleContainer: {
        marginTop: 5
    },
    title: {
        color: Color_palette.dark,
        fontFamily: fonts.extraBold,
        fontSize: 55,
        letterSpacing: -0.5,
        lineHeight: 50,
        paddingTop: 5
    },
    contentContainer: {
        flexDirection: 'row'
    },
    leftSide: {
        flex: 6,
    },
    rightSide: {
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    subtitle: {
        color: Color_palette.dark,
        fontFamily: fonts.bold,
        fontSize: 24,
    },
    description: {
        color: Color_palette.dark,
        fontFamily: fonts.regular,
    },
});

