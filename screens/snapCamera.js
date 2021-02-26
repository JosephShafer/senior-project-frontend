import React, { useEffect, useState } from 'react';
// styling and background image
import { View, Text, StyleSheet, Dimensions, Platform, 
  TouchableOpacity, ImageBackground} from 'react-native';
// camera, icons, and permissions
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

// camera screen function
function snapCamera() {
  // Variables related to camera permission and functions
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraType, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState("off");
  const [flashType, setFlashType] = useState("md-flash-off"); // For icon
  
  // Variables related to pictures 
  const [picTaken, setPicTaken] = useState(false);
  const [picUri, setPicUri] = useState(null);

  // Variables to get screen ratio for Android only
  const [ratio, setRatio] = useState('4:3');  // default is 4:3
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  const [isRatioSet, setIsRatioSet] = useState(false);

  // On screen load, ask for permission to use the camera
  useEffect(() => {
    async function getCameraStatus() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status == 'granted');
    }
    getCameraStatus();
  }, []);

  // Set the best camera ratio (portrait mode only)
  const getRatio = async () => {
    // Start with the default ratio
    let bestRatio = '4:3';

    // Ratio is for Android only
    if (Platform.OS === 'android') {
      // Gets ratios supported by device
      const ratios = await camera.getSupportedRatiosAsync();

      let distances = {};
      let decimalRatios = {};
      let minDistance = null;

      // Goes through ratios and gets one closest to screen ratio
      // Uses distance from screenRatio to choose the best one
      for (const ratio of ratios) {
        const ratioParts = ratio.split(':');
        const decimalRatio = parseInt(ratioParts[0]) / parseInt(ratioParts[1]);
        decimalRatios[ratio] = decimalRatio;

        // Ratio can't be larger than the screen, so it grabs the closest
        // one that isn't bigger than the screen
        // Uses smallest distance from screenRatio to choose best one
        const distance = screenRatio - decimalRatio;
        distances[ratio] = decimalRatio;
        if (minDistance == null) {
          minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // Set the best ratio
      bestRatio = minDistance;
      setRatio(bestRatio);

      // Flag set to calculate the ratio only once
      setIsRatioSet(true);
    }
  };

  // Camera needs to be open when getting the supported ratios
  const setCameraReady = async () => {
    if (!isRatioSet) {
      await getRatio();
    }
  };

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.01, base64: true };
      let data = await camera.takePictureAsync(options);
      console.log("Took picture");
      setPicTaken(true);
      let data2 = await ImageManipulator.manipulateAsync(
        data.uri,
        [],
        { compress: 0 }
      );
      setPicUri(data2.uri);
    }
  };

  // Checks for camera permissions to return views
  if (hasPermission === null) {
    return (
      <View style={{flex:1, flexDirection:"column"}}>
        <Text>Waiting for camera permissions.</Text>
      </View>
    );
  } else if (hasPermission === false) {
    return (
      <View style={{flex:1, flexDirection:"column"}}>
        <Text>No access to camera.</Text>
      </View>
    );
  // At this point camera permisson is granted
  // So it checks if a picture has been taken
  // If no picture has been taken, the camera screen is shown
  } else if (picTaken === false) { 
    return (
      <View style={{flex:1}}>
        <Camera
          style={{flex: 1}}
          onCameraReady={setCameraReady}
          type={cameraType}
          autoFocus={'on'}
          flashMode={flash}
          ratio={ratio}
          // ref set to "camera" 
          ref={(ref) => {
            setCamera(ref);
          }}>
          <View // View for icons used by camera screen
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>

            <TouchableOpacity // Button to flip cameras
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                backgroundColor: 'red',
                paddingLeft: 12,
                paddingRight: 15,
                paddingBottom: 10,
                paddingTop: 10,
              }}
              onPress={() => {
                // Flips cameras 
                setType(
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }}>
              <Ionicons // Icon for camera flipping button
                        name="md-reverse-camera"
                        color="white"
                        size={50}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 0.5,
                alignSelf: 'flex-end',
                backgroundColor: 'white',
              }}>
                <Text style={{fontSize:35,}}>space</Text>
                </TouchableOpacity>

            <TouchableOpacity // Button to take pictures
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                backgroundColor: 'red',
                paddingLeft: 12,
                paddingRight: 15,
                paddingBottom: 10,
                paddingTop: 10,
              }}
              onPress={() => takePicture()
              }>
              <Ionicons // Icon for picture taking button
                        name="md-camera"
                        color="white"
                        size={50}
                    />
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 0.5,
                alignSelf: 'flex-end',
                backgroundColor: 'white',
              }}>
                <Text style={{fontSize:35,}}>space</Text>
                </TouchableOpacity>

            <TouchableOpacity // Button for flash
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                backgroundColor: 'red',
                paddingLeft: 12,
                paddingRight: 8,
                paddingBottom: 10,
                paddingTop: 10,
              }}
              onPress={() => {
                // Sets flash to on or off
                setFlash(
                  flash === "off"
                    ? "on"
                    : "off"
                );
                // Sets flash button to on or off button icon
                setFlashType(
                  flashType === "md-flash-off"
                    ? "md-flash"
                    : "md-flash-off"
                );
              }}>
              <Ionicons // Icon for flash 
                        name={flashType}
                        color="white"
                        size={50}
                    />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  // Shows image preview if one was taken
} else { 
    return (
      <View style={{flex:1, flexDirection:"column"}}>
        <ImageBackground
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center'
          }}
          source={{
            uri: picUri,
          }}
        >
          <View // View for image retake option 
          style={{flex: 1, flexDirection: "column-reverse"}}>
           <TouchableOpacity // Icon & text both work to retake image
              style={{
                alignItems: "center",
              }}
              onPress={() => setPicTaken(false)
              }>
                <Ionicons // Icon for camera flipping button
                        name="md-reverse-camera"
                        color="white"
                        size={50}
                    />
                <Text style={{color: "white", fontSize: 24}}>Retake picture</Text>
          </TouchableOpacity>
          
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default snapCamera;