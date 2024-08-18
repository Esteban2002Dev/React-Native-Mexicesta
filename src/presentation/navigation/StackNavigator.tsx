import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { CartListScreen } from '../screens/cart/CartListScreen';
import { Colors } from '../../config/Colors';
import { NewCartScreen } from '../screens/cart/NewCartScreen';
import { StackNavbar } from '../components/StackNavbar';
import { CartDetailsScreen } from '../screens/cart/CartDetailsScreen';

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
            cardStyle: {
                backgroundColor: Colors.background,
            },
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
            header: (props) => <StackNavbar {... props} />,
        }}>
            <Stack.Screen options={{title: 'Mi Lista'}} name="CartList" component={CartListScreen} />
            <Stack.Screen options={{title: 'Nuevo carrito'}} name="NewCart" component={NewCartScreen} />
            <Stack.Screen options={{title: 'Detalles del carrito'}} name="CartDetails" component={CartDetailsScreen} />
        </Stack.Navigator>
    );
}