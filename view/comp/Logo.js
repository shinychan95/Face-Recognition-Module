import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default class Logo extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../src/img/logo.png")}
        />
        <Text style={styles.logoText}> Face Login Demo </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: "#7f7f7f"
  }
});
