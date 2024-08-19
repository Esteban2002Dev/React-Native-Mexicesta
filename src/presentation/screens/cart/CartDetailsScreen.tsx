import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { globalStyles } from '../../../config/theme/globalStyles';
import { Cart } from '../../../data/interfaces/cart.interfaces';
import { Status } from '../../../data/enums/status.enum';
import { IonIcon } from '../../components/shared/IonIcon';
import { Colors } from '../../../config/theme/Colors';
import { WavyLine } from '../../components/shared/WavyLine';
import { Item } from '../../../data/interfaces/item.interface';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { BackgroundGradient } from '../../components/BackgroundGradient';

const cart: Cart = {
    id: '1234',
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

const getStatusStyles = (status: Status) => {
    switch (status) {
        case Status.COMPLETED:
            return { color: Colors.success };
        case Status.CANCELLED:
            return { color: Colors.error };
        default:
            return { color: Colors.dark[600] };
    }
};

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();
    const statusStyles = getStatusStyles(cart.status);

    return (
        <View style={styles.container}>
            <BackgroundGradient />
            <View style={[styles.container, globalStyles.mainContainer]}>
                <Text style={globalStyles.title} numberOfLines={1}>Carrito #444</Text>
                <Text style={globalStyles.subtitle}>Creado el Martes 25 de mayo del 2024.</Text>
                <View style={styles.sectionTitleContainer}>
                    <IonIcon
                        style={{ marginHorizontal: 15 }}
                        name='cart'
                        color={Colors.dark[950]}
                        size={35}
                    />
                    <View>
                        <Text style={styles.sectionTitle}>{cart.title}</Text>
                        <View>
                            <Text style={statusStyles}>Estado: {cart.status}</Text>
                            {cart.status === Status.CANCELLED && (
                                <WavyLine stroke={Colors.dark[300]} strokeWidth='3' width={120} height={20} />
                            )}
                        </View>
                    </View>
                </View>
                <View style={{padding: 10}}>
                    <Text style={styles.sectionTitle}>Descripcion:</Text>
                    <Text>{cart.description}</Text>
                </View>
                <View style={cartItemStyles.sectionContainer}>
                    <View style={cartItemStyles.headerContainer}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <IonIcon name='receipt' color={Colors.aqua[950]} />
                            <Text style={cartItemStyles.sectionTitle}>Cosas a comprar:</Text>
                        </View>
                    </View>
                    <View style={cartItemStyles.listContainer}>
                        <ScrollView>
                            {cart.items?.map((item: Item) => <RenderCartItem {... item} />)}
                        </ScrollView>
                    </View>

                </View>
            </View>
        </View>
    );
}

function RenderCartItem(item: Item) {
    return (
        <View style={cartItemStyles.itemContainer}>
            <Pressable
            style={({pressed}) => ({
                ... cartItemStyles.imageContainer,
                opacity: pressed ? .8 : 1,
            })}>
                <Image 
                style={cartItemStyles.img}
                source={require('../../../../assets/images/no_image.jpg')} />
            </Pressable>
            <View style={cartItemStyles.cartContentContainer}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                    }}>{item.name}</Text>

                    <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        alignSelf: 'flex-end'
                    }}>Cantidad: {item.quantity}</Text>
                </View>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row'
                }}>
                    {item.price && (
                        <Text style={{
                            fontSize: 12,
                            fontWeight: '600',
                        }}>Precio: {item.price}</Text>
                    )}
                </View>
                <Text style={{
                    textAlign: 'justify',
                    fontSize: 14
                }}>{item.description && item.description.length > 120 ? item.description?.slice(0, 120) + '...': item.description }</Text>
            </View>
        </View>
    )
}

const cartItemStyles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        backgroundColor: Colors.purple[200],
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
        marginTop: 14,
        shadowColor: Colors.dark[950],
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        elevation: 5,

    },
    headerContainer: {
        position: 'absolute',
        top: -10,
        left: 10,
        padding: 10,
        minHeight: 30,
        backgroundColor: Colors.aqua[200],
        borderRadius: 10,

        shadowColor: Colors.dark[950],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    listContainer: {
        marginTop: 60,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.aqua[950],
    },
    itemContainer: {
        minHeight: 80,
        backgroundColor: Colors.aqua[50],
        flexDirection: 'column',
        marginTop: 15,
        marginBottom: 15,

        shadowColor: Colors.dark[950],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    imageContainer: {
        width: 80,
        height: 80,
        backgroundColor: Colors.dark[500],
        borderRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

        shadowColor: Colors.dark[950],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,

        position: 'absolute',
        top: -20
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cartContentContainer: {
        marginStart: 100,
        paddingEnd: 6
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitleContainer: {
        minHeight: 50,
        width: '100%',
        marginTop: 15,
        paddingEnd: 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: Colors.dark[800],
        borderBottomWidth: 0.5,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    }
});
