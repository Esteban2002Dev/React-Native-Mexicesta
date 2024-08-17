import { createStackNavigator } from '@react-navigation/stack';
import CartListScreen from '../screens/cart/CartListScreen';

const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CartList" component={CartListScreen} />
        </Stack.Navigator>
    );
}