import React, { useState } from 'react';
import { ImageBackground, Button, View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import config from '../config.json';

function Login() {
  const [value, onChangeUserText] = useState('');
  const [password, onChangePasswordText] = useState('');
  const [backgroundImage, error] = useAssets([require('../assets/craftyImage.jpeg')]);

  let [fontsLoaded] = useFonts({
    'Redressed-Regular' : require('../assets/fonts/Redressed-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  

  // really basic HTTP request to the EC instance I got going
  const submitInfo = async () => {
    const url = config.AWS.url;
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
    <ImageBackground style={styles.placeholderImage} source={require('../assets/craftyImage.jpeg')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.loginContainer}>

        <Text style={styles.titleText}>Snap & Go</Text>

        <ScrollView contentContainerStyle={styles.textBoxContainer}>
          <TextInput
            focus
            autoCompleteType={"username"}
            style={styles.textBox}
            onChangeText={text => onChangeUserText(text)}
            value={value}
            placeholder={'Username'}
            onPress={() => setShowImage(false)}
          />
          <TextInput
            secureTextEntry
            style={styles.textBox}
            onChangeText={text => onChangePasswordText(text)}
            value={password}
            placeholder={'Password'}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={submitInfo}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Login </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={submitInfo}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Sign Up </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={submitInfo}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Sign In With Google </Text>
              </View>
            </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    paddingTop: 25,
  },
  titleText: {
    fontFamily: 'Redressed-Regular',
    alignItems: "center",
    textAlign: "center",
    fontSize: 80,
    paddingBottom: 0,
    color: 'white',
    textShadowColor: 'rgba(50, 50, 50, 0.95)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20
  },
  placeholderImage: {
    flex: 1,
    marginTop: 0,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    
  },

  textBoxContainer: {
    flex: 1.5,
    alignItems: 'center',
    flexDirection: "column",
    paddingVertical: 20
  },
  textBox: {
    height: 40,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  buttonContainer : {
    flex: 1
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 90,
    backgroundColor: 'blue'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

});

export default Login;