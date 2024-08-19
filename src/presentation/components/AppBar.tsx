import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { IonIcon } from './shared/IonIcon';
import { Color_palette } from '../../config/theme/Colors';
import BackButton from './BackButton';

type StackNavbarProps = StackHeaderProps;
export function AppBar({
    options,
}: StackNavbarProps) {

    const { navigation } = useAppNavigation();
    const title = options.title;

    return (
        <View style={styles.appBarContainer}>
            <View style={styles.leftSide}>
                {navigation.canGoBack() && (
                    <BackButton />
                )}
            </View>
            <View style={styles.rightSide}>
                {title 
                    ? <Text>{title}</Text> 
                    : <Image source={require('../../../assets/images/logo.png')} /> 
                }
                <Pressable style={({pressed}) => ({
                    opacity: pressed ? .7 : 1
                })}>
                    <IonIcon name='ellipsis-vertical' color={Color_palette.dark} size={30} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    appBarContainer: {
        height: 75,
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
