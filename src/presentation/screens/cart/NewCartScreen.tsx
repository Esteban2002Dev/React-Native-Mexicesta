import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fonts, globalStyles } from '@theme/globalStyles';
import { BackgroundGradient } from '@components/BackgroundGradient';
import { AppBar } from '@components/AppBar';
import { IonIcon } from '@components/shared/IonIcon';
import PrimaryButton from '@components/shared/PrimaryButton';
import { Color_messages, Color_palette } from '@theme/Colors';
import { Status } from '@enums/status.enum';
import { formatDate } from '@store/actions';
import { Cart } from '@interfaces/cart.interfaces';
import { useCart } from '@store/cart-store';
import { Item } from '@interfaces/item.interface';
import { useItem } from '@store/item-store';
import { v4 as uuidv4 } from 'uuid';
import { ItemComponent } from '@components/shared/ItemComponent';
import { useAppNavigation } from '@hooks/useAppNavigation';
import { useTheme } from '@store/themeCustomization/theme-store';
import { useToastContext } from '@store/toast/context/ToastContext';

/**
 * * UUID Documentation
 * * https://www.npmjs.com/package/uuid
 * * https://www.npmjs.com/package/react-native-get-random-values
 */
export function NewCartScreen() {

    const [isButtonDisabled, setIsButtonDisabled] = useState<Boolean | any>(false);
    const { navigation } = useAppNavigation();

    // * Cart data
    const [id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('Nuevo carrito');
    const [description, setDescription] = useState<string>('Soy una nueva descripción.');
    const [status, setStatus] = useState<Status>(Status.PENDING);
    const [created_at, setCreated_at] = useState<string>('');

    const { createCart } = useCart();

    // * Item data
    const [items, setItems] = useState<Item[]>([]);
    const [itemName, setItemName] = useState<string>('');
    const [itemQuantity, setItemQuantity] = useState<string>('');
    const [itemDescription, setItemDescription] = useState<string>('');
    const [itemStatus, setItemStatus] = useState<Status>(Status.PENDING);

    const { saveGroupItems } = useItem();
    const { background, setBackground } = useTheme();

    const { showToast } = useToastContext();

    useEffect(() => {
        setBackground();
    }, [setBackground]);

    useEffect(() => {
        setCreated_at(formatDate(new Date()));
        setId(uuidv4());
    }, []);

    useEffect(() => {
        const checkFields = () => {
            if (items.length === 0 && (!itemName || !itemQuantity)) {
                setIsButtonDisabled(true);
            } else if (items.length > 0) {
                setIsButtonDisabled(false);
            } else {
                setIsButtonDisabled(false);
            }
        };
        checkFields();
    }, [itemName, itemQuantity, itemDescription, items]);

    const changeCartState = () => {
        setStatus(prevStatus => 
            prevStatus === Status.PENDING ? Status.COMPLETED :
            prevStatus === Status.COMPLETED ? Status.CANCELLED :
            Status.PENDING
        );
    };

    const changeItemState = () => {
        setItemStatus(prevStatus => 
            prevStatus === Status.PENDING ? Status.COMPLETED :
            prevStatus === Status.COMPLETED ? Status.CANCELLED :
            Status.PENDING
        );
    };
    
    const onSubmit = () => {
        const cart: Cart = {
            id,
            title,
            description,
            status,
            created_at,
            itemsLength: items.length
        };
        createCart(cart);
        saveGroupItems({cartId: id, items});
        showToast({
            title: 'Carrito creado!',
            message: 'Se agregó el carrito correctamente',
            duration: 3000,
            icon: 'checkmark-circle',
            type: 'success'
        });
        navigation.navigate('CartList');
    };

    const saveItem = () => {
        const newItem: Item = {
            id: uuidv4(),
            cartId: id,
            name: itemName,
            description: itemDescription,
            quantity: itemQuantity,
            status: itemStatus,
        };
        setItemName('');
        setItemDescription('');
        setItemQuantity('');
        setItems([newItem, ...items]);
    };
    
    const removeItem = (itemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <View style={globalStyles.container}>
            {background.colors.length > 2
            ? <BackgroundGradient colors={background.colors} />
            : <BackgroundGradient />}
            <ScrollView>
                <AppBar title={`Agregar nuevo\n carrito`} />
                <View style={formStyles.container}>
                    <CartForm 
                        title={title}
                        description={description}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        status={status}
                        changeCartState={changeCartState}
                    />
                    <PrimaryButton
                        label={itemName && itemQuantity ? 'Agregar producto' : 'Crear carrito'}
                        onPress={itemName && itemQuantity ? saveItem : onSubmit}
                        color={Color_palette.dark}
                        children={itemName && itemQuantity ? <IonIcon name='duplicate' /> : <IonIcon name='cart' />}
                        disabled={isButtonDisabled}
                    />

                    <ItemForm
                        itemName={itemName}
                        setItemName={setItemName}
                        itemStatus={itemStatus}
                        changeItemState={changeItemState}
                        itemQuantity={itemQuantity}
                        setItemQuantity={setItemQuantity}
                        itemDescription={itemDescription}
                        setItemDescription={setItemDescription}
                    />
                </View>
                <View style={formStyles.container}>
                    {items && items.map((item, index) => (
                        <ItemComponent item={item} deleteItem={removeItem} cartId={id} key={item.id} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

interface CartFormProps {
    title: string;
    description: string;
    setTitle: (value: string) => void;
    setDescription: (value: string) => void;
    status: Status;
    changeCartState: () => void;
}
function CartForm({
    title,
    description,
    setTitle,
    setDescription,
    status,
    changeCartState,
}: CartFormProps) {
    return (
        <>
            <View>
                <Text style={formStyles.label}>Nombre del carrito:</Text>
                <TextInput
                    style={formStyles.titleInput}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Ej: Carrito de verduras'
                    multiline={true}
                    numberOfLines={2}
                />
            </View>
            <View style={formStyles.contentContainer}>
                <View style={formStyles.leftSide}>
                    <Text style={formStyles.label}>Descripción:</Text>
                    <TextInput
                        style={formStyles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                        placeholder='Ej: Carrito de verduras'
                        multiline={true}
                    />
                </View>
                <View style={formStyles.rightSide}>
                    <Text style={formStyles.label}>{status}</Text>
                    <Pressable onPress={changeCartState}>
                        <IonIcon 
                            style={{ alignSelf: 'center' }} 
                            name={status === Status.CANCELLED ? 'warning' : status === Status.COMPLETED ? 'checkmark-circle' : 'time'} 
                            color={status === Status.CANCELLED ? Color_messages.danger : status === Status.COMPLETED ? Color_messages.success : Color_messages.info} 
                            size={40} 
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
}

interface itemProps {
    itemStatus: Status;
    changeItemState: () => void;
    itemName: string;
    setItemName: (value: string) => void;
    itemQuantity: string;
    setItemQuantity: (value: string) => void;
    itemDescription: string;
    setItemDescription: (value: string) => void;
}
function ItemForm({
    itemStatus,
    changeItemState,
    itemName,
    setItemName,
    itemQuantity,
    setItemQuantity,
    itemDescription,
    setItemDescription,
}: itemProps) {
    return (
        <View style={styles.container}>
            <BackgroundGradient colors={[Color_palette.white, Color_palette.white]} style={{ opacity: 0.3 }} />
            <View style={styles.infoContainer}>
                <View style={{
                    ...styles.textContainer,
                    borderLeftColor: itemStatus === Status.CANCELLED ? Color_messages.danger :
                        itemStatus === Status.COMPLETED ? Color_messages.success :
                        Color_messages.info,
                }}>
                    <Text>Nombre</Text>
                    <TextInput
                    style={styles.title}
                    placeholder='Ej: Pollo'
                    onChangeText={setItemName}
                    value={itemName} />

                    <Text>Cantidad</Text>
                    <TextInput
                    style={styles.subTitle}
                    placeholder='Ej: 3 Piezas'
                    onChangeText={setItemQuantity}
                    value={itemQuantity} />

                    <Text>Descripción</Text>
                    <TextInput
                    style={styles.helpText}
                    placeholder='Ej: Una pata y 2 muslos.'
                    onChangeText={setItemDescription}
                    value={itemDescription}
                    multiline />
                </View>
                <Pressable onPress={changeItemState}>
                    <IonIcon 
                        style={{ alignSelf: 'center' }} 
                        name={itemStatus === Status.CANCELLED ? 'warning' : itemStatus === Status.COMPLETED ? 'checkmark-circle' : 'time'} 
                        color={itemStatus === Status.CANCELLED ? Color_messages.danger : itemStatus === Status.COMPLETED ? Color_messages.success : Color_messages.info} 
                        size={40} 
                    />
                </Pressable>
            </View>
        </View>
    );
}

const formStyles = StyleSheet.create({
    container: {
        padding: 15,
    },
    titleInput: {
        color: Color_palette.dark,
        fontFamily: fonts.extraBold,
        fontSize: 55,
        letterSpacing: -0.5,
        lineHeight: 50,
        padding: 0
    },
    contentContainer: {
        flexDirection: 'row'
    },
    leftSide: {
        flex: 6,
    },
    rightSide: {
        flex: 2.5,
        alignItems: 'center',
    },
    descriptionInput: {
        color: Color_palette.dark,
        fontFamily: fonts.bold,
        width: '100%',

        padding: 0
    },
    label: {
        fontFamily: fonts.bold
    }
});

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
        elevation: 2,
        flex: 1
    },
    textContainer: {
        borderLeftWidth: 3,
        paddingLeft: 10,
        height: '100%',
        width: '75%',
        justifyContent: 'center',
    },
    statusContainer: {
        width: '25%',
    },
    title: {
        fontFamily: fonts.extraBold,
        color: Color_palette.dark,
        fontSize: 22,

        width: '100%',
        height: 34,
        paddingTop: 0,
        overflow: 'visible'
    },
    subTitle: {
        fontFamily: fonts.bold,
        color: Color_palette.dark,
        fontSize: 15,
        height: 27,
        paddingTop: 0,
        overflow: 'visible'
    },
    helpText: {
        fontFamily: fonts.regular,
        color: Color_palette.dark,
        height: 27,
        paddingTop: 0,
        overflow: 'visible'
    },
});