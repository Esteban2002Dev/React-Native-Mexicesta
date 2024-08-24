import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { Status } from '../../../data/enums/status.enum';
import { Color_messages, Color_palette } from '../../../config/theme/Colors';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { IonIcon } from '../../components/shared/IonIcon';
import { ItemComponent } from '../../components/shared/ItemComponent';
import { useCartDetails } from '../../hooks/cart/useCartDetails';

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();
    const { cart, currentIndex, loading, items } = useCartDetails(params?.cartId, params?.index);


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
            <BackgroundGradient />
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
                        {items.map(item => <ItemComponent cartId={cart.id} item={item} />)}
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

