import { StyleSheet } from "react-native";

export const colors = {
    primary: '#2DC4D9',
    secondary: '#A32323',
    white: '#FFFFFF',
    black: '#000000',
    gray: '#222222',
    lightGray: '#CCCCCC',
    darkGray: '#555555',
    lightBlue: '#E6F7FF',
    darkBlue: '#2D9CDB',
    lightGreen: '#E6FFFA'
}
export const globalStyles = StyleSheet.create({
    tabContainer: {
        flex: 1,
        marginVertical: 30,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        margin: 10,
        marginBottom: 40,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: colors.primary,
    },
    buttonClose: {
        backgroundColor: colors.secondary,
    },
});