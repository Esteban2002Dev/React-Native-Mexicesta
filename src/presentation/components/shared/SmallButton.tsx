import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../../config/Colors'

interface Props {
    message: string;
    onPress: () => void;
    disabled?: boolean;
    color: 'aqua' | 'dark' | 'purple';
}
export function SmallButton({
    message,
    onPress,
    disabled = false,
    color,
}: Props) {
    return (
        <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => ({
            ... Styles.button,
            backgroundColor: Colors[color][600],
            opacity: pressed ? .8 : 1
        })}>
            <Text style={Styles.buttonText}>{message}</Text>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.purple[100],
    }
});