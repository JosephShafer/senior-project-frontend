// For group: You'll need Joey to add your expo account to list of approved
// URI's in google for this to work on your machine.
// There's also a way to do it through the expo app, closer to
// the way an app in production would be

// Right now this only does google as a separate service
// we can add more though

// I ended up taking the logic from this file and putting the google login
// into login.js, but if we end up adding more login providers we can use this
// as a reference.

import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import config from '../config.json';

WebBrowser.maybeCompleteAuthSession();


// Dummy info that will be replaced by auth0/database,
const accountInfo = { fName: 'Joseph', lName: "Shafer" }
const lastFewSearches = [{ name: 'yarn', location: 'target' }, { name: 'scissors', location: 'amazon' }, { name: 'glitter', location: 'target' }]


// https://docs.expo.io/guides/authentication/#google

function Account({navigation, route}) {
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: config.GOOGLE_CLIENT.ID,
        scopes: ['openid', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            response['AuthOwner'] = 'Google';
            console.log(response);
            navigation.navigate('Login Screen', {token: response})
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
                }}
            />
        );
    }

}

const styles = StyleSheet.create({
    myText: {
        paddingTop: 3,
        fontSize: 30
    }
});

export default Account;