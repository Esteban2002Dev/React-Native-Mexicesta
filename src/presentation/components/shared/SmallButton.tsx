import React from 'react'
import { Text, Pressable, StyleSheet } from 'react-native'
import { Colors } from '../../../config/theme/Colors'
import { IonIcon } from './IonIcon';

interface Props {
    message: string;
    onPress: () => void;
    disabled?: boolean;
    color: 'aqua' | 'dark' | 'purple';
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
}
export function SmallButton({
    message,
    onPress,
    disabled = false,
    color,
    iconName,
    iconSize,
    iconColor
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
            {iconName 
            ? <IonIcon name={iconName} color={iconColor} size={iconSize} /> 
            : null}
            <Text style={Styles.buttonText}>{message}</Text>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.purple[100],
    }
});