import React, { useState } from 'react';
import { ImageBackground, Button, View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { Asset, useAssets } from 'expo-asset';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import AccountCreation from './AccountCreation';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import validator from 'validator';
WebBrowser.maybeCompleteAuthSession();



import config from '../config.json';

function Login({ navigation }) {
  const [username, onChangeUserText] = useState('');
  const [password, onChangePasswordText] = useState('');

  let validateLogin = () => {
    if(validator.isEmpty(username) || validator.isEmpty(password)){
      console.log('User Name or Password field is empty');
    }

    if(!validator.isAlphanumeric(username) || !validator.isAlphanumeric(password)){
      console.log('Please use standard English characters and numbers only')
    }
  }
  const [backgroundImage, error] = useAssets([require('../assets/craftyImage.jpeg')]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: config.GOOGLE_CLIENT.ID,
    scopes: ['openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      response['AuthOwner'] = 'Google';
      console.log(response);
      navigation.navigate('User', { token: response })
    }
  }, [response]);

  let [fontsLoaded] = useFonts({
    'Redressed-Regular': require('../assets/fonts/Redressed-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const submitInfo = async () => {
    if( !username || !password ){
      alert('Username and password are required')
      return;
    }

    const user = {
      username: username,
      passsword: password
    }

    const url = config.myIP.address + 'signin'
    axios.post(url, user)
    .then (result => {
      if (result.data.success){
        const user = Object.assign({}, result.data.user);

        AsyncStorage.setItem('token', user._id)
        .then(action(res => {
          navigation.navigate('User');
        }))
        .catch(err => alert('Sign In Error!'));
      }
      else {
        alert('Unable to login. Please check your username and password.')
      }
    })
    .catch(err => {
      alert('Failed to sign you in! Try creating an account first.')
    })
  }

  // const submitInfo = async () => {

  //   if( !username || !password ){
  //     alert('Username and password are required')
  //     return;
  //   }

  //   const url = config.AWS.url + 'signin';

  //   try {
  //     let response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password
  //       })
  //     });
  //     let data = await response.json();

  //     if(data.success){
  //       await AsyncStorage.setItem('userToken', user._id)
  //       .then( () => {
  //         navigation.navigate('HomeScreen');
  //       })
  //       .catch(() => {
  //         alert('There was a sign in error:!');
  //       })
  //     } else{
  //       alert('An error has occurred. Please check the email and password!');
  //     }
  //   } catch (error) {
  //     alert('Unable to sign you in.');
  //     console.log(error);
  //   }
  // }
 
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
            value={username}
            placeholder={'Username'}
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
              onPress={() => {
                validateLogin()
                submitInfo()
                }
              }
                
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Login </Text>
              </View>
            </TouchableOpacity>

            {/* JP: Forgot Password button added */}
            <TouchableOpacity
              onPress={()=> navigation.push("Forgot Password")}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Forgot Password? </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.push("Sign Up")}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Sign Up </Text>
              </View>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => promptAsync()}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}> Sign In With Service </Text>
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
    textShadowOffset: { width: -1, height: 1 },
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
  buttonContainer: {
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
