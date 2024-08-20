import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Background_colors, Color_palette } from '../../../config/theme/Colors';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { AppBar } from '../../components/AppBar';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import PrimaryButton from '../../components/shared/PrimaryButton';
import { IonIcon } from '../../components/shared/IonIcon';

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
            <AppBar />
            <View style={styles.contentContainer}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
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
    }
});