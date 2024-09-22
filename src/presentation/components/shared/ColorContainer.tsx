import { Color } from "@interfaces/Color";
import { Color_messages, Color_palette } from "@theme/Colors";
import { fonts } from "@theme/globalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
    name: string;
    colors: string[];
    setBackgroundColor: (colors: Color) => void;
    isSelected: boolean;
}

export function ColorContainer({
    name,
    colors,
    setBackgroundColor,
    isSelected
}: Props) {
    return (
        <View style={[
            colorStyles.container,
            {
                borderColor: Color_messages.success,
                borderWidth: isSelected ? 2 : 0
            }
        ]}>
            <Pressable
            style={({ pressed }) => ({

                ... colorStyles.pressable,
                opacity: pressed ? 0.7 : 1,
                transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
            })}
            onPress={() => setBackgroundColor({ name, colors })}>
                <View style={colorStyles.pressableContent}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={colorStyles.nameText}>{name}</Text>
                    <View style={colorStyles.colorContainer}>
                        {colors.map((color, index) => (
                            <View key={index} style={[colorStyles.colorBox, { backgroundColor: color }]}>
                                <Text style={colorStyles.colorText}>{color}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const colorStyles = StyleSheet.create({
    container: {
        width: '48%',
        padding: 10,
        backgroundColor: Color_palette.white,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 2,
    },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressableContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        fontSize: 15,
        fontFamily: fonts.bold,
        textAlign: 'center',
        marginBottom: 10,
        color: Color_palette.dark,
    },
    colorContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    colorBox: {
        width: '48%',
        height: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        aspectRatio: 1,
    },
    colorText: {
        color: Color_palette.dark,
        fontFamily: fonts.regular,
        textAlign: 'center',
        fontSize: 13
    },
});
