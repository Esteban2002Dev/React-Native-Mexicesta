import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/core';
import { RootStackParams } from '../navigation/StackNavigator';

export function useAppNavigation<T extends keyof RootStackParams>() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const route = useRoute<RouteProp<RootStackParams, T>>();
    
    return {
        navigation,
        route,
        params: route.params,
    };
};
