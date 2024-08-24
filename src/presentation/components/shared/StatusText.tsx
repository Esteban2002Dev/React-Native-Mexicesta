import { View, Text } from 'react-native';
import React from 'react';
import { Status } from '../../../data/enums/status.enum';
import { SvgDrawer } from './SvgDrawer';
import { Color_messages, Color_palette } from '@theme/Colors';
import { crossPath, wavyPath } from '@constants/patronsPath';

interface Props {
    status: Status
}
export function StatusText({status}: Props) {
    const statusStyles = getStatusStyles(status);
    const dPath = getPath(status);
    const stroke = getStrokeColor(status);

    return (
        <View>
            <Text style={statusStyles}>Estado: {status}.</Text>
            {(status === Status.COMPLETED || status === Status.CANCELLED) && (
                <SvgDrawer d={dPath} stroke={stroke} strokeWidth='3' width={120} height={20} />
            )}
        </View>
    );
}

const getStatusStyles = (status: Status) => {
    switch (status) {
        case Status.COMPLETED:
            return { color: Color_messages.success };
        case Status.CANCELLED:
            return { color: Color_messages.danger };
        case Status.PENDING:
            return { color: Color_messages.info };
        default:
            return { color: Color_palette.dark };
    }
};

const getPath = (status: Status) => {
    switch (status) {
        case Status.COMPLETED:
            return wavyPath(120, 20);
        case Status.CANCELLED:
            return crossPath(120, 15);
        default:
            return crossPath(120, 20);
    }
};

const getStrokeColor = (status: Status) => {
    switch (status) {
        case Status.COMPLETED:
            return Color_messages.success;
        case Status.CANCELLED:
            return Color_messages.danger;
        case Status.PENDING:
            return Color_messages.info;
        default:
            return Color_palette.dark;
    }
};