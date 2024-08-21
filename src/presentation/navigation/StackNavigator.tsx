import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { CartListScreen } from '../screens/cart/CartListScreen';
import { NewCartScreen } from '../screens/cart/NewCartScreen';
import { CartDetailsScreen } from '../screens/cart/CartDetailsScreen';

export type RootStackParams = {
    CartList: undefined;
    NewCart: undefined;
    CartDetails: {
        cartId: string,
        index: number
    };
}

const Stack = createStackNavigator();
export function StackNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
            <Stack.Screen options={{title: ''}} name="CartList" component={CartListScreen} />
            <Stack.Screen options={{title: 'Nuevo carrito'}} name="NewCart" component={NewCartScreen} />
            <Stack.Screen options={{title: 'Detalles del carrito'}} name="CartDetails" component={CartDetailsScreen} />
        </Stack.Navigator>
    );
}