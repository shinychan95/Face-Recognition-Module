import React, { Component } from "react";
import {
  AppRegistry,
  StatusBar,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container comp
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import Swiper from "./Swiper";

export default class Intro extends Component {
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          <Icon name="ios-camera" {...iconStyles} />
          <Text style={styles.header}>Show</Text>
          <Text style={styles.text}>Your Face on Camera</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <Icon name="ios-happy" {...iconStyles} />
          <Text style={styles.header}>Your Face</Text>
          <Text style={styles.text}>Registered and Can be used for Login </Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Icon name="ios-checkmark-circle" {...iconStyles} />
          <Text style={styles.header}>Sign In</Text>
          <Text style={styles.text}>Becomes Much Easier</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 150,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#16a085"
  },
  // Header styles
  header: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 35,
    fontWeight: "bold",
    marginVertical: 15
  },
  // Text below header
  text: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 20,
    marginHorizontal: 40,
    textAlign: "center"
  }
});
AppRegistry.registerComponent("Intro", () => Intro);
