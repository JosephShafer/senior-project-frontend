import React, { useState } from 'react';
import { ImageBackground, View, Text, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';
import validator from 'validator';
WebBrowser.maybeCompleteAuthSession();

import styles from '../styles/LoginStyles';
import config from '../config.json';

function Login({ navigation }) {
  const [username, onChangeUserText] = useState('');
  const [password, onChangePasswordText] = useState('');

  let validateLogin = () => {
    if (validator.isEmpty(username) || validator.isEmpty(password)) {
      console.log('User Name or Password field is empty');
    }

    if (!validator.isAlphanumeric(username) || !validator.isAlphanumeric(password)) {
      console.log('Please use standard English characters and numbers only')
    }
  }

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
    if (!username || !password) {
      alert('Username and password are required')
      return;
    }

    const user = {
      username: username,
      password: password
    }

    const url = config.myIP.address + 'signin'
    axios.post(url, user)
      .then(result => {
        if (result.data.success) {
          console.log(result.data.user);
          const user = { ...result.data.user };

          // console.log(user)
          AsyncStorage.setItem('token', JSON.stringify(user))
            .then(() => {
              let snapAndGoBackendResponse = { "User": user }
              snapAndGoBackendResponse['AuthOwner'] = "Snap&Go";
              navigation.navigate('User', { token: snapAndGoBackendResponse });
            })
            .catch(err => alert('Sign In Error!'));
        }
        else {
          alert('Unable to login. Please check your username and password.')
        }
      })
      .catch(err => {
        // console.log(err);
        alert('Failed to sign you in! Try creating an account first.')
      })
  }

  return (
    <ImageBackground style={styles.placeholderImage} source={require('../assets/craftyImage.png')}>
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

            <TouchableOpacity
              onPress={() => navigation.push("Forgot Password")}
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
                <Text style={styles.buttonText}> Sign In With Google </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};



export default Login;
