import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        padding: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'Bol',
        fontSize: 22,
    },
    text: {
        fontFamily:'Reg'
    },
    para: {
        marginVertical: 20,
        lineHeight:20
    },
    inputContainer: {
        
    },
    input: {
        width: '80%',
        height: 48,
        marginVertical: 8,
        padding: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
        
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Bol',
        fontSize: 16,
    },
    button: {
      width: '80%',
      height: 48,
      marginVertical: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c69214',
      borderRadius: 4,
    }
});