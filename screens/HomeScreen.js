
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LoginContext from '../utility_functions/context';
import config from '../config.json';
import styles from '../styles/HomeScreenStyles';

function HomeScreen({ navigation, route }) {
  const [userName, setUserName] = useState("Snap & Go User");
  const userToken = React.useContext(LoginContext);

  useEffect(() => {
    if (userToken['AuthOwner'] === 'Google') {
      fetch("https://content-people.googleapis.com/v1/people/me?personFields=names", {
        "credentials": "include",
        "headers": {
          "Authorization": `Bearer ${userToken.params.access_token}`,
        },
        "method": "GET",
      })
        .then(response => response.json())
        .then(json => {
          console.log(json.names[0].displayName);
          let nameReturn = (json.names[0].displayName).split(' ');
          // console.log(nameReturn);
          setUserName(nameReturn[0]);
        })
    }
    console.log("user Token is: ")
    console.log(userToken);
  }, [])

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.homeScreenText}>Snap & Go User Screen</Text>
      <Text style={styles.usernameText}>Welcome back, {userName}!</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Search History')}
      >
        <View style={styles.buttonStyle}>
          <Text
            style={styles.buttonTextStyle}
          > Search History </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


export default HomeScreen;



