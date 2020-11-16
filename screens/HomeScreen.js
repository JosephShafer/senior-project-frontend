
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';


function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationText, setLocationInfo] = useState("Searching");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const here = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      here.find(p => {
        setLocationInfo(`Street: ${p.street} \n City: ${p.city} \n postal code: ${p.postalCode}`);
      });
    })();
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Snap & Go placeholder front Screen</Text>
      <Text>{locationText}</Text>
    </View>
  );
}

export default HomeScreen;