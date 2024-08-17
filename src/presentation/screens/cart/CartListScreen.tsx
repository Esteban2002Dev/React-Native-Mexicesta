import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors } from '../../../config/Colors';
import { SmallButton } from '../../components/shared/SmallButton';

export function CartListScreen() {
    return (
        <View>
            <Text style={Styles.title} numberOfLines={1} lineBreakMode='clip'>Lista de compras</Text>
            <View style={Styles.optionsContainer}>
                <SmallButton
                message='Filtrar'
                color='purple'
                onPress={() => console.log('Filtro')}
                disabled={false} />

                <SmallButton
                message='Nueva lista'
                color='aqua'
                onPress={() => console.log('NewTask')}
                disabled={false} />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginVertical: 5,
        color: Colors.text
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.aqua[100],
        marginBottom: 10
    }
});