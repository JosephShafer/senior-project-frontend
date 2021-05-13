import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import config from '../config.json';
import styles from '../styles/ResetPWScreenStyles';

function ResetPassword({ navigation, route }) {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [token, setToken] = useState(route.params.resetInfo);

  useEffect(() => {
    console.log(token);
  }, [])

  useEffect(() => {

    const route = config.myIP.address + `reset_password?token=${token.queryParams.ResetPasswordToken}`;
    axios
      .get(route)
      .then(result => {
        if (!result.data.success) {
          alert(`${result.data.msg}`);
          // navigation.navigate("Forgot Password");
        } else {
          setUsername(result.data.username);
          setEmail(result.data.email);
          setToken(token.queryParams.ResetPasswordToken);
        }
      })
      .catch(err => console.log("Error when validate reset token: " + err));

  }, []);

  const onButtonPress = () => {

    if (!password || !rePassword) {
      alert('All fields are required');
      return;
    }

    if (password !== rePassword) {
      alert('Passwords do not match. Please try again');
    } else {
      const info = {
        token: token,
        newPW: password,
      };

      const url = config.myIP.address + 'reset_password';
      axios
        .put(url, info)
        .then(result => {
          alert("Congrats! You have successfully reset your password. Please sign in with the new password!");
          navigation.navigate("Login");
        })
        .catch(err => console.log("Error when saving the new password"));
    }
  };

  return (

    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <View>
        <Text style={styles.header}>Hello, {username}:</Text>
        <Text style={styles.resetPasswordText}>Please reset your password here.</Text>
      </View>

      <View style={styles.sendContainer}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.textbox]}
        />
        <TextInput
          secureTextEntry
          placeholder="Retype Password"
          value={rePassword}
          onChangeText={text => setRePassword(text)}
          style={[styles.textbox]}
        />
        <TouchableOpacity onPress={onButtonPress} style={[styles.button]}>
          <Text style={styles.buttonText}> Confirm </Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>

  );
};

export default ResetPassword;