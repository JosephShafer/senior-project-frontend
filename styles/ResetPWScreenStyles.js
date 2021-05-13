import {StyleSheet} from 'react-native';

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
    },
    resetPasswordText: { 
        fontSize: 21 
    }
  });