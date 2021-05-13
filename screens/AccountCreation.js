import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, Text, View, TouchableOpacity } from 'react-native';

import config from '../config.json';
import styles from '../styles/AccountCreationStyles';

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

            <Text style={styles.usernameText}>Username</Text>
            <TextInput
                focus
                autoCompleteType={"username"}
                style={styles.textBox}
                onChangeText={text => onChangeUsernameText(text)}
                value={username}
                placeholder={'Username'}
            />
            <Text style={styles.innerTextTextBox}>Email</Text>
            <TextInput
                focus
                autoCompleteType={"email"}
                style={styles.textBox}
                onChangeText={text => onChangeEmailText(text)}
                value={email}
                placeholder={'Email'}
            />
            <Text style={styles.innerTextTextBox}>First Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeFirstNameText(text)}
                value={firstName}
                placeholder={'First Name'}
            />
            <Text style={styles.innerTextTextBox}>Last Name</Text>
            <TextInput
                focus
                autoCompleteType={"name"}
                style={styles.textBox}
                onChangeText={text => onChangeLastNameText(text)}
                value={lastName}
                placeholder={'Last Name'}
            />
            <Text style={styles.innerTextTextBox}>Password</Text>
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
                        <Text style={styles.buttonText}> Create Account </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    );

}


export default AccountCreation;