import { View, Text } from 'react-native'
import React from 'react'
import { useAppNavigation } from '../../hooks/useAppNaviagtion'

export function CartDetailsScreen() {
    const { params } = useAppNavigation<'CartDetails'>();
    console.log(params);

    return (
        <View>
            <Text>CartDetailsScreen</Text>
        </View>
    )
}