import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const globalStyles = StyleSheet.create({
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