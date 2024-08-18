import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackHeaderProps } from '@react-navigation/stack';
import { IonIcon } from './shared/IonIcon';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { Colors } from '../../config/Colors';

type StackNavbarProps = StackHeaderProps;
export function StackNavbar({
    options,
}: StackNavbarProps) {
    const { navigation } = useAppNavigation();
    const title = options.title ? options.title : 'Mi carrito';

    return (
        <View style={styles.header}>
            {navigation.canGoBack() && (
                <TouchableOpacity
                onPress={navigation.goBack}
                style={styles.backButton}>
                    <IonIcon name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        alignItems: 'center',
        backgroundColor: Colors.purple[800],
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
    },
    title: {
        color: Colors.purple[100],
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        marginRight: 16,
    },
});
