import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';



export default class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: 100, height: 100}}
                       source={require('../../src/img/logo.png')}/>
                <Text style={styles.logoText}> Fitrus CC </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: '#fafafa',
    }
})