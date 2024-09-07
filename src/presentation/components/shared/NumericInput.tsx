import { Color_palette } from '@theme/Colors';
import { fonts } from '@theme/globalStyles';
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

interface Props {
    value: number;
    onChange: (value: number) => void;
}
export function NumericInput({ value, onChange }: Props) {
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(() => {
        setInputValue(value !== null ? value.toString() : '');
    }, [value]);

    const handleTextChange = (text: string) => {
        if (text === '') {
            setInputValue('');
            onChange(0);
        } else if (!isNaN(Number(text))) {
            const numericValue = parseFloat(text);
            setInputValue(text);
            onChange(numericValue);
        }
    };

    return (
        <View>
            <Text style={styles.label}>Precio del producto:</Text>
            <TextInput
                style={styles.input}
                onChangeText={handleTextChange}
                value={inputValue}
                keyboardType='numeric'
                placeholder='Ej: 10.55'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: fonts.extraBold,
        color: Color_palette.dark,
        fontSize: 22,
        width: '100%',
        height: 50,
        paddingTop: 0,
        overflow: 'visible',
        borderColor: Color_palette.dark,
        borderBottomWidth: 1,
    },
    label: {
        fontFamily: fonts.bold
    }
});
