import { View, Text } from 'react-native'
import React from 'react'
import { Status } from '../../../data/enums/status.enum'
import { WavyLine } from './WavyLine'
import { Color_messages, Color_palette } from '../../../config/theme/Colors'

interface Props {
    status: Status
}
export function StatusText({status}: Props) {
    const statusStyles = getStatusStyles(status);
    return (
        <View>
            <Text style={statusStyles}>Estado: {status}.</Text>
            {status === Status.COMPLETED && (
                <WavyLine stroke={Color_messages.success} strokeWidth='3' width={120} height={20} />
            )}
        </View>
    )
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