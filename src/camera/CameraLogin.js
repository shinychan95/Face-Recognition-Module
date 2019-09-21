import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
} from "react-native";

import { RNCamera } from "react-native-camera";

const landmarkSize = 4;
const landmarkSizeBig = 10;
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
const faceBoxSize = (screenWidth * 2) / 3;
const baseX = (screenWidth - faceBoxSize) / 2 + screenWidth / 20;
const baseY = (screenHeight - faceBoxSize) / 2 + screenHeight / 7.24;
const baseW = screenWidth / 1.74;
const baseH = screenHeight / 3.2;

export default class CameraRegister extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      autoFocus: "on",
      whiteBalance: "auto",
      type: "front",
      ratio: "16:9",
      canDetectFaces: true,
      faces: [],
      countDownSeconds: 5, //current available seconds before photo is taken
      countDownStarted: false, //starts when face detected
      pictureTaken: false, //true when photo has been taken
      class: null,
      error: false,
      loading: false,
      onlyOneFace: false,
      sizeOfFace: false,
      positionOfFace: false,
      angleOfFace: false,
      saveNumOfFace: 0,
      processing: true,
      processEnd: false
    };
    Alert.alert(
      "Information",
      "When the Face is in the Box, Register will Start",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === "back" ? "front" : "back"
    });
  }

  takePicture = async function() {
    if (this.camera) {
      const data = await this.camera.takePictureAsync();
      console.warn("takePicture ", data);
      return data;
    } else {
      console.error("camera is not working");
    }
  };

  toggle = value => () =>
    this.setState(prevState => ({ [value]: !prevState[value] }));

  beforeFacesDetected = ({ faces }) => {
    console.log("*********** Before Face");
    if (Object.keys(faces).length == 1) {
      this.setState({ faces });
      this.setState({ onlyOneFace: true });
      if (
        Math.abs(baseX - JSON.parse(faces[0].bounds.origin.x)) <= 40 &&
        Math.abs(baseY - JSON.parse(faces[0].bounds.origin.y)) <= 40
      ) {
        this.setState({ positionOfFace: true });
      } else {
        this.setState({ positionOfFace: false });
      }
      if (
        Math.abs(baseW - JSON.parse(faces[0].bounds.size.width)) <= 40 &&
        Math.abs(baseH - JSON.parse(faces[0].bounds.size.height)) <= 40
      ) {
        this.setState({ sizeOfFace: true });
      } else {
        this.setState({ sizeOfFace: false });
      }
      if (
        JSON.parse(faces[0].rollAngle) <= 5 &&
        JSON.parse(faces[0].yawAngle) <= 5
      ) {
        this.setState({ angleOfFace: true });
      } else {
        this.setState({ angleOfFace: false });
      }
    } else {
      this.setState({ onlyOneFace: false });
    }
  };

  afterFaceDetected = ({ faces }) => {
    const { navigation } = this.props;
    const state = this.state;
    console.log("*********** After Face");
    const imageForm = new FormData();
    if (state.processing) {
      console.log("******saving*******");
      this.setState({ processing: false });
      this.setState({ loading: true });
      this.camera.takePictureAsync().then(data => {
        imageForm.append("image", {
          uri: data.uri,
          type: "image/jpg",
          name: "test"
        });
        imageForm.append();
        fetch("http://192.168.0.61:3000/save", {
          method: "POST",
          body: imageForm
        })
          .then(response => response.json())
          .then(responseData => {
            if (responseData.response == "save complete") {
              this.setState({ saveNumOfFace: state.saveNumOfFace + 1 });
            } else {
              console.log("something is not good");
            }
          })
          .catch(err => {
            console.log("err: " + err);
          });
      });
    } else if (state.saveNumOfFace == 1) {
      this.setState({ canDetectFaces: false });
    }
  };

  modelBuild = () => {
    const state = this.state;
    const { navigation } = this.props;
    const username = navigation.getParam("username", "NO-ID");
    if (!state.processEnd) {
      this.setState({ processEnd: true });
      fetch("http://192.168.0.61:3000/test", {
        method: "GET"
      })
        .then(response => response.text())
        .then(responseData => {
          this.setState({ loading: false });
          alert(responseData);
        })
        .then(() => {
          this.props.navigation.navigate("App");
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  renderLoading() {
    const state = this.state;
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.faceText}>Wait for a minute</Text>
      </View>
    );
  }

  renderBound(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmarkBig,
            {
              left: position.x,
              top: position.y
            }
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.bounds.origin)}
      </View>
    );
  }

  renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => {
    const state = this.state;
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` }
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y
          }
        ]}
      >
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>Save: {state.saveNumber}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>
          saveNumOfFace: {state.saveNumOfFace}
        </Text>
      </View>
    );
  };

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2
            }
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderBounds = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderBound)}
    </View>
  );

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  );

  renderLandmarks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>
  );

  renderCamera() {
    const {
      canDetectFaces,
      onlyOneFace,
      sizeOfFace,
      positionOfFace,
      angleOfFace,
      loading
    } = this.state;
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        autoFocus={this.state.autoFocus}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        trackingEnabled
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        faceDetectionLandmarks={
          RNCamera.Constants.FaceDetection.Landmarks
            ? RNCamera.Constants.FaceDetection.Landmarks.all
            : undefined
        }
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications
            ? RNCamera.Constants.FaceDetection.Classifications.all
            : undefined
        }
        onFacesDetected={faces => {
          canDetectFaces
            ? onlyOneFace && sizeOfFace && positionOfFace && angleOfFace
              ? this.afterFaceDetected(faces)
              : this.beforeFacesDetected(faces)
            : this.modelBuild();
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <View
            style={{
              width: faceBoxSize,
              height: faceBoxSize,
              backgroundColor: "transparent",
              borderColor: "orange",
              borderWidth: 3
            }}
          />
        </View>
        <View style={{ flex: 0.2 }} />
        <View style={{ flex: 0.3 }}>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.toggle("onlyOneFace")}
              style={styles.flipButton}
            >
              <Text style={styles.flipText}>
                {!onlyOneFace ? "No one face" : " Only one face"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.toggle("sizeOfFace")}
              style={styles.flipButton}
            >
              <Text style={styles.flipText}>
                {!sizeOfFace ? "No size" : "Yes size"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              onPress={this.toggle("positionOfFace")}
              style={styles.flipButton}
            >
              <Text style={styles.flipText}>
                {!positionOfFace ? "No position" : "Yes position"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.toggle("angleOfFace")}
              style={styles.flipButton}
            >
              <Text style={styles.flipText}>
                {!angleOfFace ? "No angle" : "Yes angle"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        />
        <View
          style={{
            flex: 0.1,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        />
        <View
          style={{
            flex: 0.3,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        />
        {!!loading && this.renderLoading()}
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}
/*
{!!canDetectFaces && this.renderFaces()}
{!!canDetectFaces && this.renderBounds()}
{!!canDetectFaces && this.renderLandmarks()}
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#000"
  },
  faceBoxContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    width: 50,
    borderWidth: 5,
    borderColor: "#FF5722",
    justifyContent: "center",
    alignItems: "center"
  },
  flipButton: {
    flex: 0.3,
    height: 50,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  flipText: {
    color: "white",
    fontSize: 18,
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2
  },
  picButton: {
    backgroundColor: "darkseagreen"
  },
  facesContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#FFD700",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  landmark: {
    width: landmarkSizeBig,
    height: landmarkSizeBig,
    position: "absolute",
    backgroundColor: "red"
  },
  landmarkBig: {
    width: landmarkSizeBig,
    height: landmarkSize,
    position: "absolute",
    backgroundColor: "blue"
  },
  faceText: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent"
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#F00",
    justifyContent: "center"
  },
  textBlock: {
    color: "#F00",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "transparent"
  },
});
