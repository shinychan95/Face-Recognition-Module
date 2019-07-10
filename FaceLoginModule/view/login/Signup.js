import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';



import Logo from '../comp/Logo';
import Form from '../comp/Form';
import Button from '../comp/Button';
import Camera from '../../src/camera/Camera';
import CameraScreen from '../../src/camera/CameraScreen';

export default class Signup extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#455a64'
                    barStyle='light-content'
                />
                <Logo/>
                <Form type={'Login'}/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                </View>
                <Button
                    text="Sign up"
                    onPress={() => this.props.navigation.navigate("CameraScreen")}
                />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#455a64',
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: '#ffffff',
        fontSize: 16,
        opacity: 0.7,
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10
    }
})


AppRegistry.registerComponent("Signup", () => Signup);


