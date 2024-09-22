import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BackgroundGradient } from '@components/BackgroundGradient';
import { fonts, globalStyles } from '@theme/globalStyles';
import { AppBar } from '@components/AppBar';
import { Color_palette } from '@theme/Colors';
import { IonIcon } from '@components/shared/IonIcon';
import PrimaryButton from '@components/shared/PrimaryButton';
import { ColorContainer } from '@components/shared/ColorContainer';
import { BackgroundColors } from '../../../data/BackgroundColors';
import { Color } from '@interfaces/Color';
import { useTheme } from '@store/themeCustomization/theme-store';

export function VisualSettings() {
    const [background, setBackground] = useState<Color>(BackgroundColors[0]);
    const { saveNewBackground } = useTheme();

    return (
        <View style={globalStyles.container}>
            <BackgroundGradient colors={background.colors} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <AppBar />
                <View style={styles.mainContent}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.title}>
                            Personaliza tus colores.
                        </Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.description}>
                            Selecciona una de las paletas de colores definidas o personaliza por completo a tu gusto.
                        </Text>
                    </View>
                    <PrimaryButton
                        label='Guardar configuración'
                        onPress={() => saveNewBackground(background)}
                        color={Color_palette.dark}
                        children={<IonIcon name='color-palette' />}
                    />
                </View>
                <View style={styles.colorPaletteContainer}>
                    <BackgroundGradient
                        colors={[Color_palette.white, Color_palette.white]}
                        style={styles.backgroundGradient}
                    />
                    <Text style={styles.subtitle}>Paletas de colores</Text>
                    <View style={styles.colorGrid}>
                        {BackgroundColors.map((color, index) => (
                            <ColorContainer
                                key={index}
                                name={color.name}
                                colors={color.colors}
                                setBackgroundColor={setBackground}
                                isSelected={color.name === background.name}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    mainContent: {
        padding: 15,
    },
    titleContainer: {
        marginTop: 5,
    },
    title: {
        color: Color_palette.dark,
        fontFamily: fonts.extraBold,
        fontSize: 55,
        letterSpacing: -0.5,
        lineHeight: 50,
        paddingTop: 5,
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    description: {
        flex: 1,
        color: Color_palette.dark,
        fontFamily: fonts.regular,
    },
    subtitle: {
        fontFamily: fonts.bold,
        color: Color_palette.dark,
        fontSize: 24,
        paddingBottom: 10,
    },
    colorPaletteContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
    },
    backgroundGradient: {
        opacity: 0.3,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 10,
        width: '100%',
    },
});
