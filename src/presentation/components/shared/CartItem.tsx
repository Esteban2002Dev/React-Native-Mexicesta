import { View, Text, StyleSheet, Pressable, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Color_palette } from '../../../config/theme/Colors';
import { fonts } from '../../../config/theme/globalStyles';
import { Cart } from '../../../data/interfaces/cart.interfaces';
import { StatusText } from './StatusText';
import { useAppNavigation } from '../../hooks/useAppNavigation';

interface Props {
    cart: Cart;
}
export function CartItem({
    cart
}: Props) {
    const {navigation} = useAppNavigation();
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.05,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 100,
            useNativeDriver: true,
        }).start();
    };
    
    return (
        <Animated.View
        style={{
            transform: [{ scale: scaleAnim }]
        }}>
            <Pressable
            onPress={() => navigation.navigate('CartDetails', {cartId: cart.id})}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({pressed}) => ({
                ... styles.container,
                opacity: pressed ? 0.7 : 1
            })}>
                <View style={styles.itemBackground} />
                <View style={styles.leftSide}>
                    <Text adjustsFontSizeToFit numberOfLines={1} style={styles.numberText}>{cart.id}</Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.title}>{cart.title}</Text>
                    <Text>Creado el {cart.created_at}.</Text>
                    <Text>{cart.items?.length} Objetos agregados.</Text>
                    <StatusText status={cart.status} />
                </View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    itemBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Color_palette.white,
        opacity: .3,
    },
    container: {
        width: '100%',
        minHeight: '15%',
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