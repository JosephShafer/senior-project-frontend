// In App.js in a new project

import React, { useRef, useState, useEffect } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as Linking from 'expo-linking';

import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import snapCamera from './screens/snapCamera';
import AccountCreation from './screens/AccountCreation';
import Account from './screens/otherService';
import ProductsResults from './screens/ProductsResults';
import ProjectResults from './screens/ProjectResults';

import LoginContext from './utility_functions/context';

import ForgotPassword from './screens/forgotPassword';
import SearchHistory from './screens/SearchHistory';

import ResetPWScreen from './screens/ResetPWScreen';

const Tab = createBottomTabNavigator();
const loginStack = createStackNavigator();
const cameraStack = createStackNavigator();
const ResultTabs = createMaterialTopTabNavigator();
let globToken = 'empty';


const Results = ({ navigation, route }) => {
  const [results, setResults] = React.useState(route.params.results);

  return (
    <LoginContext.Provider value={globToken}>
      <ResultTabs.Navigator>
        <ResultTabs.Screen
          name="Products"
          component={ProductsResults}
          initialParams={results}
        />
        <ResultTabs.Screen
          name="Projects"
          component={ProjectResults}
          initialParams={results} />
      </ResultTabs.Navigator>
    </LoginContext.Provider>
  );
}


const LoginScreen = ({ navigation, route }) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    Linking.addEventListener('url', urlChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      Linking.removeEventListener('url', urlChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };

  React.useEffect(() => {
    // if app is opened from being closed
    Linking.getInitialURL().then((res) => {
      console.log(res);
      let resetPasswordClosedApp = Linking.parse(res);
      if (resetPasswordClosedApp.queryParams.ResetPasswordToken) {
        navigation.navigate("Reset Password", { resetInfo: resetPasswordClosedApp })
      }
    });
  }, [])

  const urlChange = (res) => {
    // if app is in background and link opens it
    let resetPasswordURLChange = Linking.parse(res.url);
    console.log("a reset password link:")
    if (resetPasswordURLChange.queryParams.ResetPasswordToken) {
      navigation.navigate("Reset Password", { resetInfo: resetPasswordURLChange })
    }
  }

  const [userToken, setUserToken] = React.useState(null);
  React.useEffect(() => {
    if (route.params?.token) {
      setUserToken(route.params?.token);
    }
  }, [route.params?.token]);

  if (userToken) {
    globToken = userToken;
    return (
      <LoginContext.Provider value={userToken}>
        <loginStack.Navigator>
          <loginStack.Screen name="Home" component={HomeScreen} />
          <loginStack.Screen name="Search History" component={SearchHistory} />
          <loginStack.Screen name="Results" component={Results} />
        </loginStack.Navigator>
      </LoginContext.Provider>
    )
  } else {
    return (
      <LoginContext.Provider>
        <loginStack.Navigator>
          <loginStack.Screen name="Login" component={Login} />
          <loginStack.Screen name="Sign Up" component={AccountCreation} />
          <loginStack.Screen name="Account" component={Account} />
          <loginStack.Screen name="Forgot Password" component={ForgotPassword} />
          <loginStack.Screen name="Reset Password" component={ResetPWScreen} />
        </loginStack.Navigator>
      </LoginContext.Provider>
    )
  }

};

const Camera = ({ navigation, route }) => {
  return (
    <cameraStack.Navigator>
      <cameraStack.Screen name="Camera" component={snapCamera} />
      <cameraStack.Screen name="Results" component={Results} />
    </cameraStack.Navigator>
  )
};

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="User" component={LoginScreen} />
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