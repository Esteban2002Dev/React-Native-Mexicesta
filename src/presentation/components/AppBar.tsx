import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useAppNavigation } from '@hooks/useAppNavigation';
import { IonIcon } from './shared/IonIcon';
import { Color_palette } from '@theme/Colors';
import BackButton from './BackButton';
import { fonts } from '@theme/globalStyles';

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
                    <Text style={styles.title}>Cart{'\n'}Control</Text>
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
        gap: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontFamily: fonts.extraBoldItalic,
        lineHeight: 14,
        paddingTop: 14,
        fontSize: 24,
        color: Color_palette.dark,
        textAlign: 'right'
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
