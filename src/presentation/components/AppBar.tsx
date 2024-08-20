import React from 'react'
import { View, StyleSheet, Image, Pressable } from 'react-native'
import { useAppNavigation } from '../hooks/useAppNavigation';
import { IonIcon } from './shared/IonIcon';
import { Color_palette } from '../../config/theme/Colors';
import BackButton from './BackButton';

export function AppBar() {
    const { navigation } = useAppNavigation();

    return (
        <View>
            <View style={styles.appBarContainer}>
                <View style={styles.leftSide}>
                    {navigation.canGoBack() && (
                        <BackButton />
                    )}
                </View>
                <View style={styles.rightSide}>
                    <Image source={require('../../../assets/images/logo.png')} />
                    <Pressable
                    style={({pressed}) => ({
                        opacity: pressed ? .7 : 1
                    })}>
                        <IonIcon name='ellipsis-vertical' color={Color_palette.dark} size={30} />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appBarContainer: {
        height: 90,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightSide: {
        position: 'absolute',
        flexDirection: 'row',
        right: 0,
        padding: 5,
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSide: {
        position: 'absolute',
        left: 0,
        padding: 5,
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
