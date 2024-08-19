import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const fonts = {
    regular: 'RalewayRegular',
    italic: 'RalewayItalic',
    bold: 'RalewayBold',
};

export const globalStyles = StyleSheet.create({
    mainContainer: {
        marginTop: 75
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        color: Colors.text
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
    },
});