import { StyleSheet } from 'react-native';

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
    usernameText: { 
        paddingLeft: 10 
    },
    innerTextTextBox: {
        paddingLeft: 10,
        paddingTop: 25
    },
});

export default styles;