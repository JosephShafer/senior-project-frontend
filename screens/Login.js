import React, { useState } from 'react';
import { Button, View, Text, TextInput, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';

import config from '../config.json';

function Login() {
  const [value, onChangeUserText] = useState('');
  const [password, onChangePasswordText] = useState('');
  const [showImage, setShowImage] = useState(true);

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

  const hideImage = () =>{
      setShowImage(false);

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.loginContainer}>

      <Text style={styles.titleText}>Snap & Go</Text>

      {showImage ? ( <Image
        style={styles.placeholderImage}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      /> ) : null }

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
        <Button
          title="Login"
          onPress={submitInfo}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "space-between",
    paddingTop: 25
  },
  titleText: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 50,
    paddingBottom: 0,
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
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  buttonContainer: {
    flex: 1
  }

});

export default Login;