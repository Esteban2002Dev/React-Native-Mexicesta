import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { CartListScreen } from '../screens/cart/CartListScreen';
import { Colors } from '../../config/theme/Colors';
import { NewCartScreen } from '../screens/cart/NewCartScreen';
import { CartDetailsScreen } from '../screens/cart/CartDetailsScreen';
import { AppBar } from '../components/AppBar';

export type RootStackParams = {
    CartList: undefined;
    NewCart: undefined;
    CartDetails: {
        cartId: string
    };
}

const Stack = createStackNavigator();
export function StackNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTransparent: true,
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            header: (props) => <AppBar {... props} />,
        }}>
            <Stack.Screen options={{title: ''}} name="CartList" component={CartListScreen} />
            <Stack.Screen options={{title: 'Nuevo carrito'}} name="NewCart" component={NewCartScreen} />
            <Stack.Screen options={{title: 'Detalles del carrito'}} name="CartDetails" component={CartDetailsScreen} />
        </Stack.Navigator>
    );
}