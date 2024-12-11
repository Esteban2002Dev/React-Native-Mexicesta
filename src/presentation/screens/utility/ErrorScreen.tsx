import { Text, View } from 'react-native'
import { useTheme } from '@store/themeCustomization/theme-store';
import React from 'react'
import { fonts, globalStyles } from '@theme/globalStyles';
import { BackgroundGradient } from '@components/BackgroundGradient';
import { Color_palette } from '@theme/Colors';
import { IonIcon } from '@components/shared/IonIcon';

interface Params {
    cartId: string;
}
export function ErrorScreen({
    cartId
}: Params) {
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
                        textAlign: 'center',
                        padding: 15
                    }}>No se encontró el carrito '{cartId}'.</Text>
                    <IonIcon name='sad' color={Color_palette.dark} size={30} />
                </View>
        </View>
    )
}