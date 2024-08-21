import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Color_palette } from '../../../config/theme/Colors';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import PrimaryButton from '../../components/shared/PrimaryButton';
import { IonIcon } from '../../components/shared/IonIcon';
import { CartItem } from '../../components/shared/CartItem';
import { ScrollView } from 'react-native-gesture-handler';
import { useCart } from '../../store/cart-store-';

export function CartListScreen() {
    const { navigation } = useAppNavigation();
    const { setCarts, allCarts } = useCart();

    useEffect(() => {
        setCarts();
    }, []);

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
                            color={Color_palette.dark}>
                            <IonIcon name='cart' />
                        </PrimaryButton>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    {allCarts && allCarts.map((cart, index) => (
                        <CartItem cart={cart} index={index} />
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
