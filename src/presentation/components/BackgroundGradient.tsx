import React from 'react'
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * * https://www.npmjs.com/package/react-native-linear-gradient
 */

interface Props {
    colors: string[];
    start: { x: number, y: number };
    end: { x: number, y: number };
    style?: object;
}
export  function BackgroundGradient({
    colors,
    start,
    end,
    style
}: Props) {
    return (
        <LinearGradient
            style={[styles.background, style]}
            colors={colors}
            start={start}
            end={end}
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