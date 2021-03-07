import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import config from '../config.json';

WebBrowser.maybeCompleteAuthSession();


// Dummy info that will be replaced by auth0/database,
const accountInfo = { fName: 'Joseph', lName: "Shafer" }
const lastFewSearches = [{name: 'yarn', location: 'target'}, {name: 'scissors', location: 'amazon'}, {name: 'glitter', location: 'target'}]


// https://docs.expo.io/guides/authentication/#google

function Account() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: config.GOOGLE_CLIENT_ID.key,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // console.log(response)
    }
  }, [response]);


  if (response?.type === 'success') {
    return (
      <View>
        <Text style={styles.myText}>
          Welcome Back {accountInfo.fName} {accountInfo.lName}
        </Text>
      </View>
    )
  } else {

    return (
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
          console.log(config.GOOGLE_CLIENT_ID.key);
        }}
      />
    );
  }

}


// function Account() {

//     // This is a dummy bool for when we can extract login success
//     const [loginSuccess, setLoginSuccess] = useState(false);

//     return (
//         showAccount(loginSuccess)
//     );
// };

// function showAccount(loginSuccess) {
//     if (loginSuccess) {
//         return (
//             <View>
//                 <Text style={styles.myText}>
//                     Welcome Back {accountInfo.fName} {accountInfo.lName}
//                 </Text>
//                 <Text>Here are your last few searches</Text>
//                 <FlatList
//                     data={lastFewSearches}
//                     keyExtractor={(x, i) => i}
//                     renderItem={({ item }) =>
//                         <Text>
//                             {item.name} bought from {item.location}
//                         </Text>
//                     }
//                 >
//                 </FlatList>
//             </View>
//         );
//     } else {
//         return (
//             <View>
//                 <Text style={styles.myText}>
//                     No Account Logged in
//                 </Text>
//                 <Text>If you would like to create an account, click here:</Text>
//                 <Button
//                     title="Login"
//                     onPress={callAuth0}
//                 ></Button>
//             </View>
//         );
//     }

// }

// function callAuth0(){
//     console.log("auth0 login called");
// }

const styles = StyleSheet.create({
    myText: {
        paddingTop: 3,
        fontSize: 30
    }
});

export default Account;