import { View, Text } from 'react-native'
import React from 'react'
import { BackgroundGradient } from '@components/BackgroundGradient'
import { useTheme } from '@store/themeCustomization/theme-store';
import { fonts, globalStyles } from '@theme/globalStyles';
import { Color_palette } from '@theme/Colors';

export function LoadingScreen() {
    const { background } = useTheme();

    return (
        <View style={globalStyles.container}>
            {background.colors.length > 2
            ? <BackgroundGradient colors={background.colors} />
            : <BackgroundGradient />}
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
    )
}