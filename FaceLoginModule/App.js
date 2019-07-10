import React, {Component, PureComponent} from 'react';  // 'react' 모듈로 부터 React 값의 객체와 'react' 모듈에서 Component, PureComponent 이름을 가져옴
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
} from 'react-native';  // 'react-native' 모듈로 부터 { ... } 안에 객체의 이름을 가져옴
import { RNCamera } from 'react-native-camera'; // 'react-native-camera' 모듈로 부터 RNCamera를 가져옴
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
    initialRouteName: 'Intro', // 메인화면을 import된 'Intro'를 쓴다
    defaultNavigationOptions: { // 해더 값은 null
        header: null
    }
});


const AppContainer = createAppContainer(AppNavigator);      // Appcontainer는 react가 렌더링할 주요 구성 요소
// 컨테이너는 앱 상태를 관리하고 최상위 네비게이터를 앱 환경과 연결시키는 역할을 함 


export default class App extends Component {    // export default : 모듈 당 하나의 export
    render() {      // render() 함수는 React에서 사용하는 타입의 컴포넌트를 생성
        return (
            <AppContainer/>     // Appcontainer 값을 리턴한다.
        );
    }
}

const baseFontSize = 16;    // baseFontSize 값을 16으로 선언


const styles = StyleSheet.create({
    container: {
        flex: 1,    // 레이아웃 나누기, View 크기를 결정하는 속성 
        justifyContent: 'center',   // 수평한 정렬, 즉 Flex Direction의 진행 방향과 같은 방향
        alignItems: 'center',   // 배치방향으로부터 수직한 정렬
        backgroundColor: '#455a64',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10, // 여백
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
        flex: 0,    // 필요하지 않은 코드
        backgroundColor: '#fff',
        borderRadius: 5,    //보더 크기?
        padding: 15,    //틀 크기
        paddingHorizontal: 20,  //틀 가로 크기
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
        opacity: 0.7,   //붙투명함
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