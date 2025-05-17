import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { Status } from '@enums/status.enum';
import { Color_messages, Color_palette } from '@theme/Colors';
import { fonts, globalStyles } from '@theme/globalStyles';
import { BackgroundGradient } from '@components/BackgroundGradient';
import { AppBar } from '@components/AppBar';
import { IonIcon } from '@components/shared/IonIcon';
import { ItemComponent } from '@components/shared/ItemComponent';
import { useCartDetails } from '@hooks/cart/useCartDetails';
import { useAppNavigation } from '@hooks/useAppNavigation';
import { useCart } from '@store/cart-store';
import { useTheme } from '@store/themeCustomization/theme-store';
import { useToastContext } from '@store/toast/context/ToastContext';
import { ErrorScreen } from '@screens/utility/ErrorScreen';
import { LoadingScreen } from '@screens/utility/LoadingScreen';

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();
    const { cart, currentIndex, loading, items, total } = useCartDetails(params?.cartId, params?.index);
    const { updateCartStatus } = useCart();

    const { background, setBackground } = useTheme();
    const { showToast } = useToastContext();

    useEffect(() => {
        setBackground();
    }, [setBackground]);
    
    useEffect(() => {
        if (!cart || !items?.length) return;
        const hasPending = items.some(item => item.status === Status.PENDING);
        const allSameStatus = items.every(item => item.status === items[0].status);
        const allCompletedOrCancelled = items.every(item => 
            item.status === Status.COMPLETED || item.status === Status.CANCELLED
        );

        if (allSameStatus) {
            cart.status = items[0].status;
            updateCartStatus(cart.id, items[0].status);
        } else if (hasPending) {
            cart.status = Status.PENDING;
            updateCartStatus(cart.id, Status.PENDING);
        } else if (allCompletedOrCancelled) {
            cart.status = Status.COMPLETED;
            updateCartStatus(cart.id, Status.COMPLETED);
        }
    }, [items, cart]);

    useEffect(() => {
        if (!cart || !items?.length) return;
        const allSameStatus = items.every(item => item.status === items[0].status);
        const allCompletedOrCancelled = items.every(item => 
            item.status === Status.COMPLETED || item.status === Status.CANCELLED
        );

        if (allSameStatus && items[0].status === Status.CANCELLED) {
            showToast({
                title: `Carrito cancelado!`,
                message: `Se ha cancelado todo el carrito!`,
                duration: 3000,
                icon: 'trash',
                type: 'error'
            });
        } else if (allCompletedOrCancelled) {
            showToast({
                title: `Carrito completado!`,
                message: `Haz completado todos los productos de este carrito, felicidades!`,
                duration: 3000,
                icon: 'checkmark-circle',
                type: 'success'
            });
        }
    }, [cart?.status]);

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    if (!cart) {
        return (
            <ErrorScreen cartId={params!.cartId} />
        );
    }

    if (!items) {
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
                    }}>Algo salio mal!.</Text>
                    <IonIcon name='sad' color={Color_palette.dark} size={30} />
                </View>
            </View>
        );
    }

    return (
        <View style={globalStyles.container}>
            {background.colors.length > 2
            ? <BackgroundGradient colors={background.colors} />
            : <BackgroundGradient />}
            <ScrollView>
                <View style={styles.infoContainer}>
                    <AppBar />
                    <View style={{
                        padding: 15,
                    }}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                                {cart.title}
                            </Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.leftSide}>
                                <Text style={styles.subtitle}>
                                    Carrito #{currentIndex}
                                </Text>
                                <Text style={styles.description}>
                                    {cart.description}
                                </Text>
                                <Text style={styles.description}>
                                    Total: {total}
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
                </View>
                <View style={styles.itemsContainer}>
                    <View>
                        {items.map(item => <ItemComponent cartId={cart.id} item={item} key={item.id} showPriceInput={true} />)}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        overflow: 'hidden',
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
    itemsContainer: {
        padding: 15,
    }
});

