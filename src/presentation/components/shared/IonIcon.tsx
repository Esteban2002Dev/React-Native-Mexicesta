import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../config/Colors';

interface Props {
    name: string;
    size?: number;
    color?: string;
}
export function IonIcon({
    name,
    size = 20,
    color = Colors.purple[100]
}: Props) {
    return (
        <Icon style={{paddingEnd: 10}} name={name} size={size} color={color} />
    )
}