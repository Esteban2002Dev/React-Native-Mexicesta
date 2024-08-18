import { View, Text, Pressable, StyleSheet, ViewStyle, StyleProp, ImageBackground } from 'react-native'
import React from 'react'
import { Colors } from '../../../config/Colors';
import { SmallButton } from '../../components/shared/SmallButton';
import { useAppNavigation } from '../../hooks/useAppNaviagtion';
import { IonIcon } from '../../components/shared/IonIcon';
import { ScrollView } from 'react-native-gesture-handler';

export function CartListScreen() {
    const { navigation } = useAppNavigation();

    return (
        <ScrollView>
            <View>
                <Text style={Styles.title} numberOfLines={1} lineBreakMode='clip'>Lista de compras</Text>
                <View style={Styles.buttonsContainer}>
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

                <View>
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd123123123123123' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                    <RenderCartItem
                        onPress={() => navigation.navigate('CartDetails', { cartId: 'asd' })} />
                </View>
            </View>
        </ScrollView>
    )
}

interface RenderItemProps {
    onPress: () => void;
    onLongPress?: () => void;
}
function RenderCartItem({
    onPress
}: RenderItemProps) {
    return(
        <Pressable
        onPress={onPress}
        onLongPress={() => console.log('on item logn press')}
        android_ripple={{ color: Colors.dark[200], borderless: false }}>
            <View style={cartItemStyles.container}>
                <View style={cartItemStyles.backgroundWrapper}>
                    <ImageBackground
                        source={require('../../../../assets/images/hexagons.png')}
                        style={cartItemStyles.backgroundPattern}
                        resizeMode="repeat"
                    />
                </View>
                <View style={cartItemStyles.cartItem}>
                    <View>
                        <Text style={cartItemStyles.cartTitle}>1° Utiles escolares</Text>
                        <Text style={cartItemStyles.cartSmallText}>Creada el 19/08/2024.</Text>
                        <Text style={cartItemStyles.cartSmallText}>15 objetos agregados.</Text>
                        <Text style={cartItemStyles.cartSmallText}>Estado: Pendiente por terminar.</Text>
                    </View>
                    <View style={cartItemStyles.iconContainer}>
                        <IonIcon name='chevron-forward' size={35} color={Colors.dark[950]} />
                    </View>
                </View>
            </View>
        </Pressable>
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10
    }
});

const cartItemStyles = StyleSheet.create({
    container: {
        position: 'relative',
        overflow: 'hidden',
        borderColor: Colors.dark[400],
        borderTopWidth: .5,
        borderBottomWidth: 1
    },
    backgroundWrapper: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.1,
    },
    backgroundPattern: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    cartItem: {
        minHeight: 80,
        padding: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
        position: 'relative',
    },
    cartTitle: {
        color: Colors.dark[950],
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartSmallText: {
        color: Colors.dark[950],
        fontSize: 14,
    },
    iconContainer: {
        justifyContent: 'center',
    },
});