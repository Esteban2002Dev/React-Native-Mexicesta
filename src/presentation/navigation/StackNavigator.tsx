import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { CartListScreen } from '../screens/cart/CartListScreen';
import { Colors } from '../../config/Colors';
import { NewCartScreen } from '../screens/cart/NewCartScreen';

export type RootStackParams = {
    CartList: undefined;
    NewCart: undefined;
}

const Stack = createStackNavigator();
export function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            cardStyle: {
                backgroundColor: Colors.background,
            },
            cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
            <Stack.Screen name="CartList" component={CartListScreen} />
            <Stack.Screen name="NewCart" component={NewCartScreen} />
        </Stack.Navigator>
    );
}