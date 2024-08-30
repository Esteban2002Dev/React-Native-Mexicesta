import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native'
import { Color_palette } from '@theme/Colors';
import { fonts } from '@theme/globalStyles';

interface Props { 
    label: string;
    color?: string;
    textColor?: string;
    onPress: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}
export default function PrimaryButton({
    label,
    color,
    textColor = Color_palette.white,
    onPress,
    disabled = false,
    children,
}: Props) {
    return (
        <Pressable
        disabled={disabled}
        onPress={() => onPress()}
        style={({pressed}) => ({
            opacity: pressed || disabled ? .8 : 1,
            backgroundColor: color,
            ... styles.button,
        })}>
            {children ? children : null}
            <Text style={{
                ... styles.textButton,
                color: textColor,
            }}>
                {label}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        flexDirection: 'row',

        shadowColor: Color_palette.dark,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        
        elevation: 20,
    },
    textButton: {
        fontFamily: fonts.bold,
    }
});