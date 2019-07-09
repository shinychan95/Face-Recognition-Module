import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';



export default class Form extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='#b0bec5'
                           placeholder='Email'
                           placeholderTextColor = '#ffffff'
                           selectionColor='#fff'
                           keyboardType='email-address'
                           onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={styles.inputBox}
                           underlineColorAndroid='#b0bec5'
                           placeholder='Password'
                           placeholderTextColor = '#ffffff'
                           secureTextEntry={true}
                           placeholderTextColor = '#ffffff'
                           ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#b0bec5',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: '#b0bec5',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    }
})