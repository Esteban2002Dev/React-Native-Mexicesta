import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { IonIcon } from './IonIcon';
import { fonts, globalStyles } from '@theme/globalStyles';
import { Color_messages, Color_palette } from '@theme/Colors';
import { Item } from '@interfaces/item.interface';
import { BackgroundGradient } from '../BackgroundGradient';
import { dimensions } from '@constants/dimensions';
import { Status } from '@enums/status.enum';
import { useItem } from '@store/item-store';
import PrimaryButton from './PrimaryButton';
import { NumericInput } from './NumericInput';
import { formatCurrency } from '@store/actions/index';

const DOUBLE_TAP_THRESHOLD = 300;
interface Props {
    item: Item;
    cartId: string;
    deleteItem?: (itemId: string) => void;
    showPriceInput?: boolean;
}
export function ItemComponent({
    item,
    cartId,
    deleteItem,
    showPriceInput = false,
}: Props) {
    const translateX = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(1)).current;
    const [lastTap, setLastTap] = useState<number>(0);

    const { changeState, addPrice } = useItem();

    const [showInput, setShowInput] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);

    const handleSwipe = (newStatus: Status) => {
        item.status = newStatus;
        changeState(cartId, item.id, newStatus);
    };
    const savePrice = () => {
        setShowInput(!showInput);

        addPrice(cartId, {... item, price});
        console.log(price)
        setPrice(0);
    };

    const handleDoubleTap = () => {
        if (item.status === Status.COMPLETED) {
            setShowInput(true);
        }
    };
    
    const handlePress = () => {
        const now = Date.now();
        const timeSinceLastTap = now - lastTap;
    
        if (timeSinceLastTap < DOUBLE_TAP_THRESHOLD) {
            handleDoubleTap();
        }
    
        setLastTap(now);
    };
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
                if (gestureState.dx > dimensions.window.width * 0.7 && deleteItem) {
                    const newOpacity = 1 - gestureState.dx / dimensions.window.width;
                    opacity.setValue(newOpacity);
                } else {
                    opacity.setValue(1);
                }
            },
            /**
             *  This block is executed when the first block returns true and the user stops touching the screen.
             */
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx > 50 && gestureState.dx < dimensions.window.width * 0.7) {
                    handleSwipe(Status.COMPLETED);
                } else if (gestureState.dx > dimensions.window.width * 0.7 && deleteItem) {
                    deleteItem(item.id);
                } else if (gestureState.dx < -50) {
                    if (item.status === Status.COMPLETED) {
                        handleSwipe(Status.PENDING);
                    } else if (item.status === Status.PENDING) {
                        handleSwipe(Status.CANCELLED);
                    }
                }
                // Return item to original position
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

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
                    }}>Algo salió mal!</Text>
                    <IonIcon name='sad' color={Color_palette.dark} size={30} />
                </View>
            </View>
        );
    }

    if (showInput && showPriceInput) {
        return (
            <View style={styles.container}>
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
                        <View>
                            <NumericInput
                            onChange={setPrice}
                            value={price} />
                        </View>
                    </View>

                    <View style={{... styles.statusContainer, flex: 1.5}}>
                        <PrimaryButton
                        label=''
                        onPress={savePrice}
                        color={Color_messages.success}
                        children={<IonIcon name='arrow-forward' style={{alignSelf: 'center'}} />} />
                    </View>
                </View>
            </View>
        );
    }
    
    return (
        <Animated.View
            style={{... styles.container, transform: [{ translateX }], opacity: opacity }}
            {...panResponder.panHandlers}>
            <TouchableOpacity
            
            style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}
            onPress={handlePress} />
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
                    <Text style={styles.helpText}>
                        {item.description ? item.description : item.status}
                    </Text>
                    {item.price
                    ? (<Text style={styles.helpText}>
                            {formatCurrency(item.price)}
                        </Text>)
                    : null 
                    }
                </View>

                <View style={styles.statusContainer}>
                    {item.status === Status.CANCELLED ? (
                        <IonIcon
                            style={{ alignSelf: 'center' }}
                            name="warning"
                            color={Color_messages.danger}
                            size={40}
                        />
                    ) : item.status === Status.COMPLETED ? (
                        <IonIcon
                            style={{ alignSelf: 'center' }}
                            name="checkmark-circle"
                            color={Color_messages.success}
                            size={40}
                        />
                    ) : item.status === Status.PENDING ? (
                        <IonIcon
                            style={{ alignSelf: 'center' }}
                            name="time"
                            color={Color_messages.info}
                            size={40}
                        />
                    ) : null}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 22,
        overflow: 'hidden',
        minHeight: 100,
        marginBottom: 15,
        flex: 1,
    },
    infoContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        minHeight: 100
    },
    statusContainer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    textContainer: {
        borderLeftWidth: 3,
        paddingLeft: 10,
        flex: 6,
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
        color: Color_palette.dark,
    },
});