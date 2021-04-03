import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
    render() {
        return (

                <WebView source={{ uri: 'https://khaosat.netlify.app' }} style={{ marginTop: 20, backgroundColor: "#fff" }} />

            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
