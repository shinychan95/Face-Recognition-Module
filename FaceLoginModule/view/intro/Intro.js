import React, { Component } from "react";
import {
    AppRegistry, StatusBar,
    StyleSheet, // CSS-like styles
    Text, // Renders text
    View // Container comp
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Swiper from "./Swiper";

export default class Intro extends Component {
    render() {
        return (
            <Swiper navigation={this.props.navigation}>
                {/* First screen */}
                <View style={styles.slide}>
                    <Icon name="ios-camera" {...iconStyles} />
                    <Text style={styles.header}>Show</Text>
                    <Text style={styles.text}>your face on camera</Text>
                </View>
                {/* Second screen */}
                <View style={styles.slide}>
                    <Icon name="ios-happy" {...iconStyles} />
                    <Text style={styles.header}>Check</Text>
                    <Text style={styles.text}>captured right</Text>
                </View>
                {/* Third screen */}
                <View style={styles.slide}>
                    <Icon name="ios-checkmark-circle" {...iconStyles} />
                    <Text style={styles.header}>Ready</Text>
                    <Text style={styles.text}>to sign up with your face</Text>
                </View>
            </Swiper>
        );
    }
}
const iconStyles = {
    size: 100,
    color: "#FFFFFF"
};
const styles = StyleSheet.create({
    // Slide styles
    slide: {
        flex: 1, // Take up all screen
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "#16a085",

    },
    // Header styles
    header: {
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 15
    },
    // Text below header
    text: {
        color: "#FFFFFF",
        fontFamily: "Avenir",
        fontSize: 18,
        marginHorizontal: 40,
        textAlign: "center"
    }
});
AppRegistry.registerComponent("Intro", () => Intro);