import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { IonIcon } from './shared/IonIcon'
import { Color_palette } from '../../config/theme/Colors'
import { useAppNavigation } from '../hooks/useAppNavigation'

export default function BackButton() {
    const { navigation } = useAppNavigation();
    return (
        <Pressable
        onPress={() => navigation.goBack()}
        style={styles.button}>
            <IonIcon name='chevron-back' color={Color_palette.white} size={30} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 55,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 7,
        backgroundColor: Color_palette.green.base,


        // Para Android
    
        shadowColor: Color_palette.green.base,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
});