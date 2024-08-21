import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Cart } from '../../../data/interfaces/cart.interfaces';
import { Status } from '../../../data/enums/status.enum';
import { Color_messages, Color_palette } from '../../../config/theme/Colors';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { IonIcon } from '../../components/shared/IonIcon';


const cart: Cart = {
    id: '1234',
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
    created_at: 'today'
};

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();

    return (
        <View style={globalStyles.container}>
            <BackgroundGradient />
            <ScrollView>
                <AppBar />
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                        Compras para el tianguis
                        </Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.leftSide}>
                            <Text style={styles.subtitle}>
                                Carrito numero #444
                            </Text>
                            <Text style={styles.description}>
                                Soy una descripcion de este carrito.
                                Puedo contener instrucciones o anotaciones extra y cosas asi.
                            </Text>
                        </View>
                        <View style={styles.rightSide}>
                            {cart.status === Status.CANCELLED
                            ? <IonIcon name='warning' color={Color_messages.danger} size={40} />
                            : cart.status === Status.COMPLETED 
                            ? <IonIcon name='checkmark-circle' color={Color_messages.success} size={40} />
                            : cart.status === Status.PENDING
                            ? <IonIcon name='time' color={Color_messages.info} size={40} />
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
        alignItems: 'center',
        padding: 5
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

