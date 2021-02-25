// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import snapCamera from './screens/snapCamera';
import ResultsScreen from './screens/ResultsScreen';
import Account from './screens/Account';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={Login} />
      {/* Results only part of router for testing */}
      <Tab.Screen name="Account" component={Account} />

      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Camera" component={snapCamera} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}


export default App;