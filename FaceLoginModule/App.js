import React, {Component, PureComponent} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    CameraRoll,
    ImageBackground,
    Image,
    ToolbarAndroid,
    Button,
    StatusBar
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Intro from './view/intro/Intro';
import Swiper from './view/intro/Swiper';


import Login from './view/login/Login'
import Signup from './view/login/Signup'
import Camera from './src/camera/Camera';
import CameraScreen from './src/camera/CameraScreen';


const AppNavigator = createStackNavigator({
    Intro, Swiper, Login, Signup, Camera, CameraScreen
}, {
    initialRouteName: 'Intro',
    defaultNavigationOptions: {
        header: null
    }
});


const AppContainer = createAppContainer(AppNavigator);



export default class App extends Component {
    render() {
        return (
            <AppContainer/>
        );
    }
}

const baseFontSize = 16;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#455a64',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    navigator: {
        flex: 1,
        textAlign: 'left',
        padding: 10
    },
    search: {
        flex: 1,
        textAlign: 'center',
        padding: 10
    },
    title:{
        flex: 1,
        textAlign: 'right',
        padding: 10
    },
    top: {
        height: '15%',
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    input: {
        fontSize: 20,
        borderWidth: 2,
        height: 40
    },
    overlay: {
        flex: 1,
        backgroundColor: "#000000",
        opacity: 0.7,
        flexDirection: "column",
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: 'red',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        width: 50,
        padding: 30,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    zipContainer: {
        height: baseFontSize + 10,
        borderBottomColor: "#DDDDDD",
        borderBottomWidth: 1,
        marginLeft: 5,
        marginTop: 3,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    zipCode: {
        flex: 1,
        flexBasis: 1,
        width: 50,
        height: baseFontSize + 10
    },
    mainText: {
        fontSize: baseFontSize,
        color: "white"
    },

});