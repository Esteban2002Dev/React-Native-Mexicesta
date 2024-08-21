import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { StatusBar } from 'react-native';
import { Color_palette } from './config/theme/Colors';
import SplashScreen from 'react-native-splash-screen';


export class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <NavigationContainer>
          <StatusBar animated={true} backgroundColor={Color_palette.green[500]} barStyle="light-content" />
        <StackNavigator />
      </NavigationContainer>
    )
  }
}

