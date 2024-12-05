import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '@navigation/StackNavigator';
import { Color_palette } from '@theme/Colors';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useTheme } from '@store/themeCustomization/theme-store';
import { ToastProvider } from '@store/toast/context/ToastContext';


export function App() {
  const { background } = useTheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const getBarColor = () => {
    return background.colors[0] || Color_palette.green[500];
  };

  return (
    <ToastProvider>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor={getBarColor()} barStyle="light-content" />
        <StackNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
};
