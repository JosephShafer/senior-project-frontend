
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import loginContext from './context';
import config from '../config.json';

function HomeScreen({ navigation, route }) {
  const [setLocationVar, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [locationText, setLocationInfo] = useState("Searching");
  const [userName, setUserName] = useState("Snap & Go User");
  // const [LastName, setLastName] = useState("User");
  const userToken = React.useContext(loginContext);
  console.log(userToken);

  if (userToken['AuthOwner'] === 'Google') {

    useEffect(() => {
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
    }, [])
  }

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
    <View style={{ flex: 0.25, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Snap & Go placeholder login Screen</Text>
      <Text>Welcome back, {userName}!</Text>
        <TouchableOpacity
          style={{}}
          onPress={()=> navigation.navigate('Search History') }
        >
          <View>
            <Text style={{fontSize: 30, paddingTop: 30,}}> Search History </Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}


export default HomeScreen;



