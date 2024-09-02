import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';
import { Color_palette } from '@theme/Colors';
import { fonts } from '@theme/globalStyles';
import { Cart } from '@interfaces/cart.interfaces';
import { StatusText } from './StatusText';
import { useAppNavigation } from '@hooks/useAppNavigation';
import { useCart } from '@store/cart-store';

interface Props {
    cart: Cart;
    index: number;
}
export function CartItem({
    cart,
    index
}: Props) {

    const { navigation } = useAppNavigation();
    const { deleteCart } = useCart();
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    let longPressTimeout: any;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.05,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();

        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false,
        }).start();

        longPressTimeout = setTimeout(() => {
            deleteCart(cart.id);
        }, 1500);
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();

        Animated.timing(progressAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();

        clearTimeout(longPressTimeout);
    };

    const progressInterpolate = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%']
    });

    const progressStyle = {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        width: progressInterpolate,
    };
    
    return (
        <Animated.View
        style={{
            transform: [{ scale: scaleAnim }]
        }}>
            <Pressable
            onPress={() => navigation.navigate('CartDetails', {cartId: cart.id, index})}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({pressed}) => ({
                ... styles.container,
                opacity: pressed ? 0.7 : 1
            })}>
                <View style={styles.itemBackground} />
                <Animated.View style={[styles.progressBackground, progressStyle]} />
                <View style={styles.leftSide}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.numberText}>{index}</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.title}>{cart.title}</Text>
                    <Text>Creado el {cart.created_at}.</Text>
                    <Text>{cart.itemsLength} Objetos agregados.</Text>
                    <StatusText status={cart.status} />
                </View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    itemBackground: {
        backgroundColor: Color_palette.white,
        position: 'absolute',
        opacity: .3,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    progressBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
    },
    container: {
        width: '100%',
        minHeight: 120,
        borderRadius: 15,
        padding: 5,
        overflow: 'hidden',
        flexDirection: 'row',
        marginVertical: 6,
    },
    leftSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightSide: {
        flex: 4,
        justifyContent: 'center'
    },
    numberText: {
        fontFamily: fonts.extraBold,
        color: Color_palette.dark,
        opacity: .8,
        marginEnd: 12,
        fontSize: 60,
        transform: [
            { rotate: '-90deg' }
        ],
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 20,
        color: Color_palette.dark,
    }
});