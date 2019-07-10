import React, {Component, PureComponent} from 'react';
import {
    Platform,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid,
    CameraRoll,
    PermissionsAndroid
} from 'react-native';
import { RNCamera } from 'react-native-camera';



export default class Camera extends Component {



    async requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }


    render() {

        return (
            <View style={styles.container}>


                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={StyleSheet.absoluteFill}
                    type={RNCamera.Constants.Type.front}
                    flashMode={RNCamera.Constants.FlashMode.on}

                    faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
                    faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
                    faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                        "We need your permission to use your camera phone"
                    }
                    onFacesDetected={face => {
                        if(face.faces.length !== 0){
                            this.setState({ fd: face.faces.length === 0 });
                            this.takePicture.bind(this);
                            alert(JSON.stringify(face));
                        }
                    }}
                />


                <View style={{flex: 0, flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }


    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5 };
            const data = await this.camera.takePictureAsync().then(data => {
                ToastAndroid.show(data.uri, ToastAndroid.SHORT);
                CameraRoll.saveToCameraRoll(data.uri)
                    .then(console.log('Success', 'Photo added to camera roll!'))
                    .catch(err => console.log('err:', err))

            });
            console.log(data.uri);
        }
    };
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

AppRegistry.registerComponent("Camera", () => Camera);