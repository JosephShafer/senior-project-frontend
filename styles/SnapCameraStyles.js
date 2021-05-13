import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    icons: {
        paddingLeft: 12,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,
    },
    touchables: {
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },
    noCameraAccessContainer: {
        flex: 1,
        flexDirection: "column"
    },
    flex1: {
        flex: 1,
    },
    iconViewContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    imageBackGroundContainer: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    modalContainer: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalSmallerMainContainer: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalSubContainer: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    flexRow: {
        flexDirection: 'row'
    },
    correctButton: {
        backgroundColor: "#C5DF81",
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginRight: 15
    },
    incorrectButton: {
        backgroundColor: "#F0623B",
        borderRadius: 15,
        padding: 10,
        elevation: 2
    },
    textInput: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        margin: 10,
        paddingLeft: 40,
        paddingRight: 40
    },
    closeModalButton: {
        backgroundColor: "#C5DF81",
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginRight: 15,
    },
    imageRetakeContainer: {
        flex: 1,
        flexDirection: "row"
    },


});

export default styles;