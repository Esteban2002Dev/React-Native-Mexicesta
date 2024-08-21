import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Background_colors, Color_palette } from '../../../config/theme/Colors';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import PrimaryButton from '../../components/shared/PrimaryButton';
import { IonIcon } from '../../components/shared/IonIcon';
import { CartItem } from '../../components/shared/CartItem';
import { Status } from '../../../data/enums/status.enum';
import { Cart } from '../../../data/interfaces/cart.interfaces';
import { ScrollView } from 'react-native-gesture-handler';

const cart: Cart[] = [
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.COMPLETED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.PENDING,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.CANCELLED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.COMPLETED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.PENDING,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.CANCELLED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.COMPLETED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.PENDING,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
    {
        id: '0001',
        title: 'Compras del tianguis.',
        description: 'Soy una descripcion de ejemplo que debe ser muy larga para testear como se veria si fuera muuuuy larga we.',
        status: Status.CANCELLED,
        items: [
            {
                id: 1,
                name: 'Product 1',
                price: 10,
                quantity: 2,
                image: 'https://example.com/product1.jpg',
                description: 'Soy un Producto de prueba con una descripcion muuuuuuuy larga para ver si es posible que se vea bien o nadotototota.',
                status: Status.PENDING
            },
        ],
        created_at: 'Martes 25 de Junio del 2024'
    },
];

export function CartListScreen() {
    const { navigation } = useAppNavigation();

    return (
        <View style={globalStyles.container}>
            <BackgroundGradient />
            <ScrollView>
                <AppBar />
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Tus {'\n'}
                            Compras
                        </Text>
                        <Text style={styles.description}>
                            Aqui apareceran todas las listas de compras que hayas creado y podras crear nuevas.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton 
                            label='Nuevo carrito'
                            onPress={() => navigation.navigate('NewCart')}
                            color={Color_palette.dark}
                        >
                            <IonIcon name='cart' />
                        </PrimaryButton>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {cart && cart.map(cart => (
                        <CartItem cart={cart} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
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
    },
    description: {
        color: Color_palette.dark,
        fontFamily: fonts.regular,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    contentContainer: {
        marginHorizontal: 10,
    }
});
