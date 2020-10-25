// In App.js in a new project

import * as React from 'react';
import { Button, View, Text, Image, TextInput, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Snap & Go placeholder front Screen</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

function Login() {
  const [value, onChangeUserText] = React.useState('');
  const [password, onChangePasswordText] = React.useState('');

  return (
    <View style={{flex: 1, flexDirection: 'column', justifyContent: "space-between"}}>
      
      <Text style={{ flex: .5, alignItems: "center", textAlign: "center", fontSize: 50}}>Snap & Go</Text>

        <Image
          style={styles.placeholderImage}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />


      <View style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
        <TextInput
          focus
          autoCompleteType={"username"}
          style={styles.textBox}
          onChangeText={text => onChangeUserText(text)}
          value={value}
          placeholder={'Username'}
        />

        <TextInput
          secureTextEntry
          style={styles.textBox}
          onChangeText={text => onChangePasswordText(text)}
          value={password}
          placeholder={'Password'}
        />
      </View>
      <View style={{flex: .5}}>
        <Button 
          title="Login"
        />
      </View>
    </View>
  );
};



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/> 
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  placeholderImage: {
    flex: 2,
    marginTop: 10,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  textBox: {
    height: 40,
    width: '90%',
    marginTop: 20,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1
  }

});

export default App;