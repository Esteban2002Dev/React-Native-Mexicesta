import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../config/Colors';
import { SmallButton } from '../../components/shared/SmallButton';
import { useAppNavigation } from '../../hooks/useAppNaviagtion';

export function CartListScreen() {
    const navigation = useAppNavigation();

    return (
        <View>
            <Text style={Styles.title} numberOfLines={1} lineBreakMode='clip'>Lista de compras</Text>
            <View style={Styles.optionsContainer}>
                <SmallButton
                message='Filtrar'
                color='purple'
                onPress={() => console.log('Filtro')}
                disabled={false}
                iconName='filter' />

                <SmallButton
                message='Nueva lista'
                color='aqua'
                onPress={() => navigation.navigate('NewCart')}
                disabled={false}
                iconName='add' />
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