// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import PastSearches from './screens/SearchHistory';
import snapCamera from './screens/snapCamera';
import ResultsScreen from './screens/ResultsScreen';
import AccountCreation from './screens/AccountCreation';
import Account from './screens/otherService';
import ProductsResults from './screens/ProductsResults';
import ProjectResults from './screens/ProjectResults';

import LoginContext from './screens/context';

import TokenContext  from './screens/TokenContext';
import ForgotPassword from './screens/forgotPassword';
import SearchHistory from './screens/SearchHistory';

import AsyncStorage from '@react-native-async-storage/async-storage';

// https://stackoverflow.com/questions/61264804/how-can-i-use-react-native-asyncstorage-with-react-hooks

const Tab = createBottomTabNavigator();
const loginStack = createStackNavigator();
const cameraStack = createStackNavigator();
const ResultTabs = createMaterialTopTabNavigator();


const Results = ({ navigation, route }) => {
  const [results, setResults] = React.useState(route.params.results);

  // useEffect(() => {
  //   if (route.params?.results){
  //     setResults([
  //       route.params.results.crawled,
  //       route.params.results.products,
  //       route.params.results.projects,
  //       route.params.results.searchTerm
  //     ]);
  //   }
  // }, [route.params?.results]);

  return (
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
  );
}


const LoginScreen = ({ navigation, route }) => {

  const [userToken, setUserToken] = React.useState(null);
  React.useEffect(() => {
    if (route.params?.token) {
      setUserToken(route.params?.token);
    }
  }, [route.params?.token]);

  if (userToken) {
    return (
      <LoginContext.Provider value={userToken}>
        <loginStack.Navigator>
          <loginStack.Screen name="Home" component={HomeScreen} />
          <loginStack.Screen name="Search History" component={SearchHistory} />
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
        </loginStack.Navigator>
      </LoginContext.Provider>
    )
  }

  // const {token} = React.useContext(TokenContext);

  // const LoggedIn = !!token;

  // return (
  //     <loginStack.Navigator>
  //     {LoggedIn ? (
  //         <>
  //             <loginStack.Screen name="Home" component={HomeScreen} />
  //             <loginStack.Screen name="Search History" component={SearchHistory} />
  //         </>
  //         ) : (
  //         <>
  //             <loginStack.Screen name="Login" component={Login} />
  //             <loginStack.Screen name="Sign Up" component={AccountCreation} />
  //             <loginStack.Screen name="Account" component={Account} />
  //             <loginStack.Screen name="Forgot Password" component={ForgotPassword} />
  //         </>
  //     )}
  //     </loginStack.Navigator>
  // );

  /** Had to comment this part out for now to make sure regular login works */

};

const Camera = () => {
  return (
    <cameraStack.Navigator>
      <cameraStack.Screen name="Camera" component={snapCamera} />
      <cameraStack.Screen name="Results" component={Results} />
    </cameraStack.Navigator>
  )
};

function MyTabs() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 18},
    }}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name="User" component={LoginScreen} />
      <Tab.Screen name="Camera" component={Camera} />
    </Tab.Navigator>
  );
}

function App() {

  /** J.P: my attempt at login */
  // const [token, setToken] = React.useState('');

  // const loadData = async () => {
  //     const storedToken = await AsyncStorage.getItem('token');
  //     setToken(storedToken);

  //     return;
  // };

  // React.useEffect(() => {
  //     loadData();
  // }, []);

  return (
    <NavigationContainer>
      {/* <TokenContext.Provider value={{token}}> */}
        <MyTabs />
      {/* </TokenContext.Provider> */}
    </NavigationContainer>
  );
}


export default App;