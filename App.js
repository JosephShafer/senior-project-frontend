// In App.js in a new project

//import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from 'expo-location';


import {
  Dimensions,
  Platform, TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      const here = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      let cityInfo = {};
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

function Login() {
  const [value, onChangeUserText] = useState('');
  const [password, onChangePasswordText] = useState('');

  // really basic HTTP request to the EC instance I got going
  const submitInfo = async () => {
    const url = "http://ec2-3-83-108-10.compute-1.amazonaws.com:3000/";
    try {
      let response = await fetch(url);
      let fetchData = await response.text();
      console.log(fetchData);
      return fetchData;
    } catch (error) {
      console.log("Server is probably not running if you're seeing error");
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between" }}>

      <Text style={{ flex: .5, alignItems: "center", textAlign: "center", fontSize: 50 }}>Snap & Go</Text>

      <Image
        style={styles.placeholderImage}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />


      <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
        <TextInput
          focus
          autoCompleteType={"username"}
          style={styles.textBox}
          onChangeText={text => onChangeUserText(text)}
          value={value}
          placeholder={'Username'}
        />

        <TextInput
          secureTextEntry
          style={styles.textBox}
          onChangeText={text => onChangePasswordText(text)}
          value={password}
          placeholder={'Password'}
        />
      </View>
      <View style={{ flex: .5 }}>
        <Button
          title="Login"
          onPress={submitInfo}
        />
      </View>
    </View>
  );
};


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Camera" component={snapCamera} />
    </Tab.Navigator>
  );
}

function snapCamera() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [picTaken, setPicTaken] = useState(false);
  const [picUri, setPicUri] = useState(null);

  // Screen Ratio for Android only
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // on screen  load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status == 'granted');
    }
    getCameraStatus();
  }, []);

  // set the camera ratio
  // portrait mode only
  const getRatio = async () => {
    let chosenRatio = '4:3';  // Start with the default
    // ratio is for Android only
    if (Platform.OS === 'android') {
      //gets supported ratios
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let decRatios = {};
      let minDistance = null;

      // goes through ratios and gets one closest to screen ratio
      // uses width/height to choose the best one
      for (const ratio of ratios) {
        const ratioVals = ratio.split(':');
        const decRatio = parseInt(ratioVals[0]) / parseInt(ratioVals[1]);
        decRatios[ratio] = decRatio;

        // ratio can't be larger than the screen, so it grabs the closest
        // one that isn't bigger than the screen
        const distance = screenRatio - decRatio;
        distances[ratio] = decRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      chosenRatio = minDistance;
      setRatio(chosenRatio);

      // Flag set to calculate ratio only once
      setIsRatioSet(true);
    }
  };

  // camera needs to be open when getting the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await getRatio();
    }
  };

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.25, base64: true};
      let data = await camera.takePictureAsync(options);
      console.log("Took picture");
      //console.log(data);
      setPicTaken(true);
      setPicUri(data.uri);
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View style={styles.information}>
        <Text>Waiting for camera permissions.</Text>
      </View>
    );
  } else if (hasCameraPermission === false) {
    return (
      <View style={styles.information}>
        <Text>No access to camera.</Text>
      </View>
    );
  } else if (picTaken === false){
    return (
      <View style={styles.container}>
        <Camera
          style={styles.cameraPreview}
          onCameraReady={setCameraReady}
          type={type}
          autoFocus={'on'}
          ratio={ratio}
          ref={(ref) => {
            setCamera(ref);
          }}>
          <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1.0,
              alignSelf: 'flex-end',
              //alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
          }}>
            <Text style={{ fontSize: 18, marginBottom: 50, marginLeft: 20, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={{
            flex: 2.0,
            alignSelf: 'flex-end',
            //alignItems: 'center',
          }}
          onPress={() => takePicture()
          }> 
          <Text style={{ fontSize: 18, marginBottom: 50, marginLeft: 0, color: 'white' }}> Snap </Text>
          </TouchableOpacity>
        </View>
        </Camera>
      </View>
    );
  } else {
    return (
      <View style={styles.information}>
        <Image
        style={styles.pic}
        source={{
          uri: picUri,
        }}
      />
      </View>
    );
  }
}

function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const { height, width } = Dimensions.get('window');
const h = Math.floor(height);
const w = Math.floor(width);
const styles = StyleSheet.create({
  placeholderImage: {
    flex: 2,
    marginTop: 10,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  textBox: {
    height: 40,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1
  },
  information: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  cameraPreview: {
    flex: 1,
  },
  pic: {
    width: w,
    height: h,
  }

});

export default App;