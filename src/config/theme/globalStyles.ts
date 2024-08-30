import { StyleSheet } from 'react-native';
import { Color_palette } from './Colors';

export const fonts = {
    regular: 'RalewayRegular',
    italic: 'RalewayItalic',
    bold: 'RalewayBold',
    extraBold: 'RalewayBlack',
    extraBoldItalic: 'RalewayBlackItalic',
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        color: Color_palette.dark
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
    },
});