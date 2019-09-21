import React from "react";
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TextInput
} from "react-native";

import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import Permissions from "react-native-permissions";
import AsyncStorage from "@react-native-community/async-storage";

import Intro from "./view/intro/Intro";
import Swiper from "./view/intro/Swiper";
import Login from "./view/login/Login";
import Signup from "./view/login/Signup";
import CameraRegister from "./src/camera/CameraRegister";
import CameraLogin from "./src/camera/CameraLogin";
import Logo from "./view/comp/Logo";

// reload command adb shell input text "RR"
// sudo netstat -nap | grep 8888
// sudo kill -9

class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Logo />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="#b0bec5"
          placeholder="Name"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <View style={{ marginTop: 10 }}>
          <Button
            title="Register"
            color="#336699"
            onPress={this._RegisterAsync}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button title="Login" color="#336699" onPress={this._LoginAsync} />
        </View>
      </View>
    );
  }

  _RegisterAsync = () => {
    const state = this.state;
    if (state.username) {
      this.props.navigation.navigate("CameraRegister", {
        username: state.username,
      });
    }
  };

  _LoginAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("CameraLogin");
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Show me more of the app"
            color="#336699"
            onPress={this._showMoreApp}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Actually, sign me out :)"
            color="#336699"
            onPress={this._signOutAsync}
          />
        </View>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="I'm done, sign me out"
          color="#336699"
          onPress={this._signOutAsync}
        />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._requestPermission();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  _requestPermission = async () => {
    Permissions.request("camera")
      .then(cameraResponse => {
        console.log("camera permission: " + cameraResponse);
        return Permissions.request("storage");
      })
      .then(storageResponse => {
        console.log("storage permission: " + storageResponse);
        return Permissions.request("microphone");
      })
      .then(microphoneResponse => {
        console.log("microphone permission: " + microphoneResponse);
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <Image
          style={{ width: 50, height: 50 }}
          source={require("C:\\onesoftdigm\\FL\\src\\img\\logo.png")}
        />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const AuthStack = createStackNavigator(
  {
    Intro,
    SignInScreen,
    CameraRegister,
    CameraLogin
  },
  {
    initialRouteName: "Intro",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455a64"
  },
  inputBox: {
    width: 300,
    backgroundColor: "#b0bec5",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
    opacity: 0.5
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  },
  navigator: {
    flex: 1,
    textAlign: "left",
    padding: 10
  },
  search: {
    flex: 1,
    textAlign: "center",
    padding: 10
  },
  title: {
    flex: 1,
    textAlign: "right",
    padding: 10
  },
  top: {
    height: "15%",
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
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
    borderColor: "red"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: 50,
    padding: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  zipContainer: {
    height: baseFontSize + 10,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
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
