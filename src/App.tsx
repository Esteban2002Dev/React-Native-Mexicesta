import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { StatusBar } from 'react-native';
import { Color_palette } from './config/theme/Colors';


export function App() {
  return (
    <NavigationContainer>
        <StatusBar animated={true} backgroundColor={Color_palette.green[500]} barStyle="light-content" />
      <StackNavigator />
    </NavigationContainer>
  )
}

