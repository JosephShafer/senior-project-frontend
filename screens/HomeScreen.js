
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import LoginContext from '../utility_functions/context';
import config from '../config.json';

function HomeScreen({ navigation, route }) {
  const [setLocationVar, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [locationText, setLocationInfo] = useState("Searching");
  const [userName, setUserName] = useState("Snap & Go User");
  // const [LastName, setLastName] = useState("User");
  const userToken = React.useContext(LoginContext);
  // console.log(userToken);

  
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

  // console.log(userToken);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);

  //     //

  //     const here = await Location.reverseGeocodeAsync({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude
  //     });

  //     here.find(p => {
  //       setLocationInfo(`Street: ${p.street} \n City: ${p.city} \n postal code: ${p.postalCode}`);
  //     });
  //   })();
  // }, []);



  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{fontSize:25, paddingTop: 30, textAlign: 'center'}}>Snap & Go User Screen</Text>
      <Text style={{fontSize:30}}>Welcome back, {userName}!</Text>
        <TouchableOpacity
          onPress={()=> navigation.navigate('Search History') }
        >
          <View style={{backgroundColor: 'blue', borderRadius: 20, marginTop: 50,}}>
            <Text 
            style={{fontSize: 30, padding: 8, alignSelf:'center', color:'#fff', fontWeight:'bold'}}
            > Search History </Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}


export default HomeScreen;



