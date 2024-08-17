import { createStackNavigator } from '@react-navigation/stack';
import { CartListScreen } from '../screens/cart/CartListScreen';
import { Colors } from '../../config/Colors';

const Stack = createStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: Colors.background,
            },
        }}>
            <Stack.Screen name="CartList" component={CartListScreen} />
        </Stack.Navigator>
    );
}