import { View, Text, StyleSheet, Animated, TouchableOpacity, PanResponder } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Types } from '@enums/ToastType';
import { IonIcon } from './IonIcon';
import { Color_messages, Color_palette } from '@theme/Colors';

export interface ToastProps {
    visible?: boolean;
    title?: string;
    message?: string;
    icon?: string;
    type?: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    onHide?: () => void;
}

export function Toast({
    visible,
    title,
    message,
    icon,
    type = Types.info,
    onHide,
    duration
}: ToastProps) {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let hideTimeout: NodeJS.Timeout;

        if (visible) {
            // Animación de entrada
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();

            hideTimeout = setTimeout(() => {
                hideToast();
            }, duration);
        } else {
            hideToast();
        }

        return () => clearTimeout(hideTimeout);
    }, [visible]);

    const hideToast = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onHide ? onHide() : undefined;
        });
    };

    // PanResponder para detectar deslizamiento hacia arriba o abajo
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) =>
                // Detecta movimientos verticales
                Math.abs(gestureState.dy) > 20,
            onPanResponderMove: (_, gestureState) => {
                // Actualiza la posición del toast según el movimiento
                translateY.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (Math.abs(gestureState.dy) > 50) {
                    // Si se deslizó más de 50px, oculta el toast
                    hideToast();
                } else {
                    // Si no se deslizó lo suficiente, vuelve a la posición original
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    if (!visible) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.container,
                    { opacity, transform: [{ translateY }] },
                ]}>
                <View style={[styles.itemBackground, { backgroundColor: getToastColor(type) }]} />
                <TouchableOpacity onPress={hideToast} style={styles.content}>
                    {icon && <IonIcon name={icon} size={30} />}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const getToastColor = (type: string) => {
    switch (type) {
        case Types.success:
            return Color_palette.green.base;
        case Types.warning:
            return 'orange';
        case Types.error:
            return Color_messages.danger;
        case Types.info:
            return Color_messages.info;
        default:
            return 'blue';
    }
};

const styles = StyleSheet.create({
    itemBackground: {
        backgroundColor: Color_palette.white,
        position: 'absolute',
        opacity: .95,
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    container: {
        position: 'absolute',
        top: 20,
        left: 10,
        right: 10,
        padding: 10,
        borderRadius: 15,
        zIndex: 999,
        overflow: 'hidden'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        fontSize: 20,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
    },
    message: {
        fontSize: 14,
        color: 'white',
    },
});
