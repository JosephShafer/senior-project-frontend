// In App.js in a new project

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'


import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import snapCamera from './screens/snapCamera';
import ResultsScreen from './screens/ResultsScreen';
import AccountCreation from './screens/AccountCreation';
import ForgotPassword from './screens/forgotPassword';

const Tab = createBottomTabNavigator();
const loginStack = createStackNavigator();
const cameraStack = createStackNavigator();


const LoginScreen = () => (
  <loginStack.Navigator>
    <loginStack.Screen name="Login" component={Login} />
    <loginStack.Screen name="AccountCreation" component={AccountCreation} />
    <loginStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </loginStack.Navigator>
);

const Camera = () => (
  <cameraStack.Navigator>
        <cameraStack.Screen name="Camera" component={snapCamera} />
        <cameraStack.Screen name="Results" component={ResultsScreen} />
  </cameraStack.Navigator>
);

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
      {/* Results only part of router for testing */}
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Camera" component={Camera} />
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