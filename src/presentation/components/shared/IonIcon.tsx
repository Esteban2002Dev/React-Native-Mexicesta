import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../config/theme/Colors';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Props {
    name: string;
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
}
export function IonIcon({
    name,
    size = 20,
    color = Colors.purple[100],
    style
}: Props) {
    const defaultStyle: ViewStyle = {
        paddingEnd: 10
    };
    
    return (
        <Icon style={style ? style : defaultStyle} name={name} size={size} color={color} />
    )
}