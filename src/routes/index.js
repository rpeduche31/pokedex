import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import LoadingScreen from '../screens/LoadingScreen';
import Home from '../screens/Home';
import DetailedScreen from '../screens/DetailedScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createStackNavigator();

export default props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen component={LoadingScreen} name="LoadingScreen" /> */}
        <Stack.Screen component={Home} name="Home" />
        <Stack.Screen component={DetailedScreen} name="DetailedScreen" />
        <Stack.Screen component={SearchScreen} name="SearchScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
