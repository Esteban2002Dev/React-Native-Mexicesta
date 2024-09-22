import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { useAppNavigation } from '@hooks/useAppNavigation';
import { IonIcon } from './shared/IonIcon';
import { Color_palette } from '@theme/Colors';
import BackButton from './BackButton';
import { fonts } from '@theme/globalStyles';
import { Popover } from './OptionsMenu';

interface Props {
    title?: string;
}
export function AppBar({
    title = `Mexi\nCesta`
}: Props) {
    const { navigation, route } = useAppNavigation();
    const [popoverVisible, setPopoverVisible] = useState(false);

    return (
        <View>
            <View style={styles.appBarContainer}>
                <View style={styles.leftSide}>
                    {route.name !== 'CartList' && navigation.canGoBack() && (
                        <BackButton />
                    )}
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.title}>{title}</Text>
                    <Pressable
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.7 : 1,
                    })}
                    onPress={() => setPopoverVisible(!popoverVisible)}>
                        <IonIcon name='ellipsis-vertical' color={Color_palette.dark} size={30} />
                    </Pressable>
                </View>
                <Popover visible={popoverVisible} onClose={() => setPopoverVisible(false)} />
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
