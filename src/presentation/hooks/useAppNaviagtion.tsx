import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/core';
import { RootStackParams } from '../navigation/StackNavigator';

export const useAppNavigation = () => {
    return useNavigation<NavigationProp<RootStackParams>>();
};
