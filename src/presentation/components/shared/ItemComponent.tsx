import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';
import React, {useRef } from 'react'
import { IonIcon } from './IonIcon';
import { fonts, globalStyles } from '@theme/globalStyles';
import { Color_messages, Color_palette } from '@theme/Colors';
import { Item } from '@interfaces/item.interface';
import { BackgroundGradient } from '../BackgroundGradient';
import { dimensions } from '@constants/dimensions';
import { Status } from '@enums/status.enum';
import { useItem } from '@store/item-store';

interface Props {
    item: Item;
    cartId: string
}
export function ItemComponent({
    item,
    cartId
}: Props) {
    const translateX = useRef(new Animated.Value(0)).current;
    const { changeState } = useItem();

    const handleSwipe = (newStatus: Status) => {
        changeState(cartId, item.id, newStatus);
    };

    if (!item) {
        return (
            <View style={globalStyles.container}>
                <BackgroundGradient />
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.bold,
                        color: Color_palette.dark,
                        fontSize: 30,
                        textAlign: 'center'
                    }}>Algo salio mal!</Text>
                    <IonIcon name='sad' color={Color_palette.dark} size={30} />
                </View>
            </View>
        );
    }

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
                    handleSwipe(Status.COMPLETED);
                } else if (gestureState.dx < -50) {
                    handleSwipe(Status.CANCELLED);
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
                    style={{
                        ... styles.textContainer,
                        borderLeftColor: 
                        item.status === Status.CANCELLED 
                        ? Color_messages.danger
                        : item.status === Status.COMPLETED 
                        ? Color_messages.success
                        : item.status === Status.PENDING 
                        ? Color_messages.info
                        : Color_messages.info
                        }}>
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