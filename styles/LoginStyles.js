import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "space-between",
        paddingTop: 25,
    },
    titleText: {
        fontFamily: 'Redressed-Regular',
        alignItems: "center",
        textAlign: "center",
        fontSize: 80,
        paddingBottom: 0,
        color: 'white',
        textShadowColor: 'rgba(50, 50, 50, 0.95)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 20
    },
    placeholderImage: {
        flex: 1,
        marginTop: 0,
        height: undefined,
        width: undefined,
        resizeMode: 'contain',
    },
    textBoxContainer: {
        flex: 1.5,
        alignItems: 'center',
        flexDirection: "column",
        paddingVertical: 20
    },
    textBox: {
        height: 40,
        width: '90%',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 20
    },
    buttonContainer: {
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


export default styles;