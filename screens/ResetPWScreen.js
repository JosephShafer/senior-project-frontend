import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, 
    KeyboardAvoidingView, Linking} from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import config from '../config.json';

// export const ResetPassword = ({navigation, route}) => {}
function ResetPassword  ({ navigation, route })  {
  //const { token } = route.params;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [token, setToken] = useState(route.params.resetInfo);

  useEffect(()=>{
    console.log(token);
  }, [])

  useEffect(() => {
  //   Linking.getInitialURL()
  //     .then(url => {
  //       const token = url.slice(44);
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
  //     }); 
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
            if (result.data.onButtonPress) {
              alert("Congrats! You have successfully reset your password. Please sign in with the new password!");
              navigation.navigate("Login");
            } else {
              alert("Sorry! Some thing wrong when saving the new password. Please retry");
            }
          })
          .catch(err => console.log("Error when saving the new password"));
        }  
  };

  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">

    <View>
      <Text style={styles.header}>Hello, {username}:</Text>
      <Text style={{fontSize: 21}}>Please reset your password here.</Text>
    </View>
    
    <View style={styles.sendContainer}>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        style={[styles.textbox]}
      />
      <TextInput
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
    },
    header: {
      fontSize: 21, 
      fontWeight: 'bold',
      marginBottom: 10,
    },
    sendContainer: {
      alignItems: 'center', 
      justifyContent: 'center',
      height: 230,
    },
    textbox: {
      borderWidth: 1,
      fontSize: 20,
      padding: 10,
      width: 300,
      marginBottom: 10,
      borderRadius: 20,
      backgroundColor: 'white'
    },
    button: {
      width: 300,
      padding: 5,
      borderRadius: 20,
      alignItems: 'center', 
      backgroundColor: 'blue'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
      paddingVertical: 10
    }
});

export default ResetPassword;