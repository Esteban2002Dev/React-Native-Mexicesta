import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../config/theme/globalStyles'

export function NewCartScreen() {
    return (
        <View>
            <Text style={globalStyles.title} numberOfLines={1} lineBreakMode='clip'>Crear un carrito</Text>
        </View>
    )
}