import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import validator from 'validator';
import * as Linking from 'expo-linking';
import config from '../config.json';

import styles from '../styles/ForgotPasswordStyles';

function ForgotPassword({ navigation }) {
  const [email, onChangeEmailText] = useState('');

  let emailValidation = () => {
    if (validator.isEmpty(email)) {
      console.log('You did not enter an email address.');
    }
    if (!validator.isEmail(email)) {
      console.log('You did not enter a valid email address.');
    }
  }


  const SendEmail = async () => {
    const url = config.myIP.address + 'forgot_password';
    try {
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          redirectURL: Linking.makeUrl()
        }),
      });
      let data = await response.json();
      if (data.success) {
        alert("A reset password email is on the way. Please check your mailbox! Link expires in 24 hours.");
        navigation.navigate('Login');
      }
      else {
        alert("User not found!");
      }
    } catch (err) {
      console.log("Error when sending reset password email: " + err);
    }
  }

  return (

    <KeyboardAvoidingView
      style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Text style={styles.header}>Forgot your password?</Text>
      <Text style={styles.header2}>Please enter your email address. We will send you an email to reset your password.</Text>
      <View style={styles.sendContainer}>
        <TextInput
          onChangeText={text => onChangeEmailText(text)}
          style={[styles.textbox]}
          value={email}
          placeholder={'yours@example.com'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          emailValidation();
          SendEmail()
        }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> Send Email </Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

  )
}


export default ForgotPassword;
