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

const cart: Cart = {
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
        {
            id: 2,
            name: 'Product 2',
            quantity: 1,
            image: 'https://example.com/product2.jpg',
            description: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima illum vitae facere cum sit tempora autem qui velit odit, dolorem soluta consectetur impedit, incidunt provident quis. Et labore odit iste.',
            status: Status.COMPLETED
        },
        {
            id: 3,
            name: 'Product 3',
            price: 30,
            quantity: 3,
            image: 'https://example.com/product3.jpg',
            description: 'This is a third test product',
            status: Status.COMPLETED
        },
        {
            id: 4,
            name: 'Product 4',
            price: 40,
            quantity: 1,
            image: 'https://example.com/product4.jpg',
            description: 'This is a fourth test product',
            status: Status.COMPLETED
        },
        {
            id: 5,
            name: 'Product 5',
            price: 50,
            quantity: 2,
            image: 'https://example.com/product5.jpg',
            description: 'This is a fifth test product',
            status: Status.COMPLETED
        },
        {
            id: 6,
            name: 'Product 6',
            price: 60,
            quantity: 3,
            image: 'https://example.com/product6.jpg',
            description: 'This is a sixth test product',
            status: Status.COMPLETED
        },
        {
            id: 7,
            name: 'Product 7',
            price: 70,
            quantity: 1,
            image: 'https://example.com/product7.jpg',
            description: 'This is a seventh test product',
            status: Status.COMPLETED
        },
        {
            id: 8,
            name: 'Product 8',
            price: 80,
            quantity: 1,
            image: 'https://example.com/product8.jpg',
            description: 'This is an eighth test product',
            status: Status.COMPLETED
        }
    ],
    created_at: 'Martes 25 de Junio del 2024'
};

export function CartListScreen() {
    const { navigation } = useAppNavigation();

    return (
        <View style={globalStyles.container}>
            <BackgroundGradient
                colors={[
                    Background_colors.pistache.base,
                    Background_colors.sky.base,
                    Background_colors.berry.base
                ]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
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
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
                    <CartItem cart={cart} />
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
