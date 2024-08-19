import React from 'react'
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export  function BackgroundGradient() {
    return (
        <LinearGradient
            style={styles.background}
            colors={['#65DE80', '#95BED6', '#D0A7DE']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
        />
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    }
});