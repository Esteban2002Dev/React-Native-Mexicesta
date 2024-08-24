import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { fonts, globalStyles } from '../../../config/theme/globalStyles';
import { BackgroundGradient } from '../../components/BackgroundGradient';
import { ScrollView } from 'react-native-gesture-handler';
import { AppBar } from '../../components/AppBar';
import { Color_palette } from '../../../config/theme/Colors';

export function NewCartScreen() {
    return (
        <View style={globalStyles.container}>
            <BackgroundGradient />
            <ScrollView>
                <AppBar />
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                            Agregar Nuevo carrito
                        </Text>
                        <Text style={styles.description}>
                            Agrega un nuevo carrito para organizar tu lista de compras.
                        </Text>
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
    },
    description: {
        color: Color_palette.dark,
        fontFamily: fonts.regular,
    },
});