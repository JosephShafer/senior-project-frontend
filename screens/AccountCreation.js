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

        if (!username || !email || !firstName || !lastName || !password) {
            alert('All fields are requried');
            return;
        }

        // const url = config.aws.url + 'signup';
        const url = config.myIP.address + 'signup';

        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                })
            });
            let data = await response.json();
            if (data.success) {
                alert('Account creation successful');
            }
            else {
                alert('Failed! If you already have an account, please log in.');
            }
        } catch (error) {
            alert('Unable to create an account');
            console.log(error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.loginContainer}>

            <Text style={{ paddingLeft: 10, }}>Username</Text>
            <TextInput
                focus
                autoCompleteType={"username"}
                style={styles.textBox}
                onChangeText={text => onChangeUsernameText(text)}
                value={username}
                placeholder={'Username'}
            />
            <Text style={{ paddingLeft: 10, paddingTop: 25, }}>Email</Text>
            <TextInput
                focus
                autoCompleteType={"email"}
                style={styles.textBox}
                onChangeText={text => onChangeEmailText(text)}
                value={email}
                placeholder={'Email'}
            />
            <Text style={{ paddingLeft: 10, paddingTop: 25, }}>First Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeFirstNameText(text)}
                value={firstName}
                placeholder={'First Name'}
            />
            {/* TODO make this left-right */}
            <Text style={{ paddingLeft: 10, paddingTop: 25, }}>Last Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeLastNameText(text)}
                value={lastName}
                placeholder={'Last Name'}
            />
            <Text style={{ paddingLeft: 10, paddingTop: 25, }}>Password</Text>
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
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        marginLeft: 10,
        paddingLeft: 20,
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        marginTop: 50,
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 90,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'blue'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
});

export default AccountCreation;