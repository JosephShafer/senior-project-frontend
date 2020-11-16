import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";

import {
  Dimensions,
  Platform, TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


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
      const options = { quality: 0.25, base64: true };
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
  } else if (picTaken === false) {
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
              <Ionicons
                        name="md-reverse-camera"
                        color="white"
                        size={50}
                    />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 2.0,
                alignSelf: 'flex-end',
                //alignItems: 'center',
              }}
              onPress={() => takePicture()
              }>
              <Ionicons
                        name="ios-camera"
                        color="white"
                        size={60}
                    />
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
const { height, width } = Dimensions.get('window');
const h = Math.floor(height);
const w = Math.floor(width);
const styles = StyleSheet.create({
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

export default snapCamera;