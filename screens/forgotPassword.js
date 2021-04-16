import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import config from '../config.json';

function ForgotPassword({navigation}) {
    const [email, onChangeEmailText] = useState('');

    const SendEmail = async() => {
        const url = config.aws.url + 'forgot_password';
        try {
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',                   
                },
                body: JSON.stringify({
                    email: email,
                }),
            });
            let data = await response.json();
            if(data.success){
                alert("A reset password email is on the way. Please check your mailbox! Link expires in 24 hours.");
                navigation.navigate('Login');
              } 
              else{
                /** (JP) TODO: prevent an email being sent to undefined */
                alert("User not found!");
            }
        } catch(err) {
            console.log("Error when sending reset password email: " + err);
        }
    }

    return(

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
          <TouchableOpacity onPress={SendEmail}>
            <View style={styles.button}>
              <Text style={styles.buttonText}> Send Email </Text>
            </View>
          </TouchableOpacity>  
        </View>  
      </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: 70
    },
    header: {
      fontSize: 30, 
      color: '#000000',
      textAlign: 'center',
      fontWeight: 'bold',
      width: '90%',
      height: 60
    },
    header2: {
      fontSize: 18, 
      color: '#000000',
      textAlign: 'center',
      width: '85%'
    },
    sendContainer: {
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'center',
      height: 100
    },
    textbox: {
      marginTop: 30,
      borderWidth: 1,
      fontSize: 20,
      padding: 10,
      width: '70%',
      marginRight: 5,
      borderRadius: 20,
      backgroundColor: 'white'
    },
    buttonContainer : {
      flex: 1
    },
    button: {
      borderRadius: 20,
      paddingVertical: 14,
      paddingHorizontal: 110,
      backgroundColor: 'blue'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
    }
});

export default ForgotPassword;