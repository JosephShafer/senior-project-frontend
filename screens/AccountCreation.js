import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';


import config from '../config.json';


function AccountCreation() {
    const [username, onChangeUsernameText] = useState('');
    const [email, onChangeEmailText] = useState('');
    const [firstName, onChangeFirstNameText] = useState('');
    const [lastName, onChangeLastNameText] = useState('');
    const [password, onChangePasswordText] = useState('');

    const signup = async () => {
        // TODO add a response if account creation
        // failed or was success
        return true;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.loginContainer}>

            <Text>Username</Text>
            <TextInput
                focus
                autoCompleteType={"username"}
                style={styles.textBox}
                onChangeText={text => onChangeUsernameText(text)}
                value={username}
                placeholder={'Username'}
            />
            <Text>Email</Text>
            <TextInput
                focus
                autoCompleteType={"email"}
                style={styles.textBox}
                onChangeText={text => onChangeEmailText(text)}
                value={email}
                placeholder={'email'}
            />
            <Text>First Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeFirstNameText(text)}
                value={firstName}
                placeholder={'First Name'}
            />
            {/* TODO make this left-right */}
            <Text>Last Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeLastNameText(text)}
                value={lastName}
                placeholder={'Last Name'}
            />
            <Text>Password</Text>
            <TextInput
                secureTextEntry
                style={styles.textBox}
                onChangeText={text => onChangePasswordText(text)}
                value={password}
                placeholder={'Password'}
            />

<View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={signup}
            >
                <View style={styles.button}>
                {/* Figure out whats going on with text here */}
                    <Text style={styles.buttonText}> Create Account </Text>
                </View>
            </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );

}

// todo instead of copying over files combine these

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        paddingTop: 25,
    },
    textBox: {
        height: 40,
        width: '90%',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    buttonContainer : {
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

export default AccountCreation;