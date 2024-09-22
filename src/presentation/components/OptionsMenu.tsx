import { useAppNavigation } from '@hooks/useAppNavigation';
import { Color_palette } from '@theme/Colors';
import { fonts } from '@theme/globalStyles';
import { useState, useRef, useEffect } from 'react';
import { Text, StyleSheet, Pressable, Animated, View, Modal, TouchableWithoutFeedback } from 'react-native';
import { IonIcon } from './shared/IonIcon';

interface Props {
    visible: boolean;
    onClose: () => void;
}

export function Popover({ visible, onClose }: Props) {
    const [animation] = useState(new Animated.Value(0));
    const popoverRef = useRef<View>(null);

    const { navigation } = useAppNavigation();

    const navigate = (route: any) => {
        navigation.navigate(route);
        onClose();
    };

    useEffect(() => {
        Animated.timing(animation, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
    });

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    });

    if (!visible) return null;

    return (
        <Modal
        transparent={true}
        animationType="none"
        visible={visible}
        onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <View style={styles.popoverContainer}>
                        <TouchableWithoutFeedback>
                            <Animated.View
                            ref={popoverRef}
                            style={[
                                styles.popover,
                                {
                                    transform: [{ translateX }, { scale }],
                                    opacity: animation,
                                },
                            ]}>
                                <Pressable
                                style={styles.option}
                                onPress={() => navigate('VisualSettings')}>
                                    <Text style={styles.optionText}>Personalizar</Text>
                                    <IonIcon style={{alignSelf: 'center'}} name='color-palette' color={Color_palette.dark} />
                                </Pressable>
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 45,
        paddingEnd: 20,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popoverContainer: {
        padding: 10,
        width: '60%'
    },
    popover: {
        backgroundColor: Color_palette.white,
        borderRadius: 8,
        shadowColor: Color_palette.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: 'hidden'
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionText: {
        fontSize: 16,
        fontFamily: fonts.bold,
        color: Color_palette.dark
    },
});
