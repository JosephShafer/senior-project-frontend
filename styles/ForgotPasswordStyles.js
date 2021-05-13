import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 70
    },
    header: {
        fontSize: 30,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        width: '90%',
        height: 60
    },
    header2: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        width: '85%'
    },
    sendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100
    },
    textbox: {
        marginTop: 30,
        borderWidth: 1,
        fontSize: 20,
        padding: 10,
        width: '70%',
        marginRight: 5,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flex: 1
    },
    button: {
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 110,
        backgroundColor: 'blue'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
});

export default styles;