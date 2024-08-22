import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native'
import React, { useRef } from 'react'
import { IonIcon } from './IonIcon';
import { fonts } from '../../../config/theme/globalStyles';
import { Color_messages, Color_palette } from '../../../config/theme/Colors';
import { Item } from '../../../data/interfaces/item.interface';
import { BackgroundGradient } from '../BackgroundGradient';
import { dimensions } from '../../../constants/dimensions';
import { Status } from '../../../data/enums/status.enum';

interface Props {
    item: Item;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
}
export function ItemComponent({
    item
}: Props) {
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            /** 
             *  This block returns a boolean value indicating whether the gesture is available.
            */
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { pageX } = evt.nativeEvent;
                return pageX < 100 || pageX > (dimensions.window.width - 100);
            },
            /**
             *  This block is executed when the previous block is true and the user is touching the screen.
             */
            onPanResponderMove: (evt, gestureState) => {
                translateX.setValue(gestureState.dx);
            },
            /**
             *  This block is executed when the first block returns true and the user stops touching the screen.
             */
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 50) {
                    // Swipe right
                    console.log('right');
                } else if (gestureState.dx < -50) {
                    // Swipe left
                    console.log('left');
                }
                // Return item to original position
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            },
        })
        ).current;
    
        return (
            <Animated.View
                style={{... styles.container, transform: [{ translateX }] }}
                {...panResponder.panHandlers}>
                <BackgroundGradient
                colors={[Color_palette.white, Color_palette.white]}
                style={{ opacity: 0.3 }} />
                <View style={styles.infoContainer}>
                    <View
                        style={styles.textContainer}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.subTitle}>{item.quantity}</Text>
                        <Text style={styles.helpText}>{item.status}</Text>
                    </View>
        
                    {item.status === Status.CANCELLED
                    ? <IonIcon style={{alignSelf: 'center'}} name='warning' color={Color_messages.danger} size={40} />
                    : item.status === Status.COMPLETED 
                    ? <IonIcon style={{alignSelf: 'center'}} name='checkmark-circle' color={Color_messages.success} size={40} />
                    : item.status === Status.PENDING
                    ? <IonIcon style={{alignSelf: 'center'}} name='time' color={Color_messages.info} size={40} />
                    : null}
                </View>
            </Animated.View>
        );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 22,
        overflow: 'hidden',
        minHeight: 100,
        marginBottom: 15
    },
    infoContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2
    },
    textContainer: {
        borderLeftWidth: 3,
        borderLeftColor: Color_messages.info,
        paddingLeft: 10,
    },
    title: {
        fontFamily: fonts.extraBold,
        color: Color_palette.dark,
        fontSize: 22,
    },
    subTitle: {
        fontFamily: fonts.bold,
        color: Color_palette.dark,
        fontSize: 20,
        lineHeight: 15,
        paddingTop: 4,
    },
    helpText: {
        fontFamily: fonts.regular,
        color: Color_palette.dark
    },
});