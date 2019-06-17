# 자료조사

### 목적
**안면 인식 open API**를 활용하여, Mobile App에서 **앱 인증**하는 모듈 개발

***+a** <br>제품을 사용하는 과정에서 안면 인식을 통한 로그인 및 회원 관리<br>어르신분들이 복잡한 회원가입 없이 키오스크를 통해서 안면 인식으로 로그인하고 건강 상태 체크*

~~이미지를 통해 인식? **카메라를 통해 인식**~~

---

### 개발 환경???
  - **Tool**: Jetbrains **Webstorm**(JS IDE)
  
  - **Language**
    - ~~open API module: **Python**~~
    - Android App: **Kotlin**???
    - App Server/Client: **React???** ~~리액트를 쓰시는 것 같아서~~
    
  - **Team**
    - **Android**: Android Native / React
    - **IOS**: IOS Native / React
    - **Server**: Java, Spring, JPA, graphQL
    - **DB**: PostgreSQL, MySQL

~~Kotlin을 배워야 할지... Navive를 배워야 할지...React를 써본 적은 있는데...익숙하지 않은 건 비슷해서...예시 코드가 또 코틀린이라 고민되는 부분입니다.~~

---

### 기능
  - Face Detection *(Google Vision Library)*
  
  - Face Identification *(Google Vision AI 'AutoML Vision')*
  
  - Authorization by Face
  
  - Face을 통한 회원 관리
  
  - 딥러닝 기술 활용(Face detection & Face Identification)
  
  *+a 사용에 따른 인식율 개선*

---

### Facial Recognition APIs 
*[참고](https://blog.rapidapi.com/top-facial-recognition-apis/)*

*조사해보니 이미지에 특화된 API와 영상 및 실시간 Tracking 관련 API 등 다양하게 나뉜다*
  
   1. **[Kairos](https://www.kairos.com/)**
    - 영상이 아닌 이미지의 안면 인식 및 감지에 특화된 회사. 안면 인식 관련 광범위한 서비스를 제공.<br>

   2. **Trueface.ai**
    - some facial recognition APIs is that they are unable to differentiate between a face and a picture of a face. TrueFace.ai solves hat problem

   3. **Amazon Rekognition**
    - AWS 환경에 완전히 통합되어 있다. 다른 AWS 제품을 사용하여 쉽게 애플리케이션을 만들 수 있다.

   4. **Lambda Labs**

   5. **FaceX**

   6. **Microsoft Face API**
    - 각 API 별로 특화된 기능이 있는데, MS의 경우 비슷한 얼굴에 대한 검색을 할 수 있다. (기본적인 기능은 모두 포함)

   7. **Animetrics Face Recognition**

   8. **Face++**

   9. **[Google Cloud Vision AI](https://cloud.google.com/vision/automl/docs/)**
    - 만약 애플리케이션이 구글 클라우드 엔진에서 작동한다면, 모듈을 만들어 통합하기 좋음
    - *예시 코드를 찾아본 것이 있어서 그거 기반으로 해도 될지 문의 예정*
    - **AutoML Vision의 경우 Face identification에 이용**

   10. **IBM Watson Visual Recognition**
    
   *+a 네이버, 카카오 * 
 
---

### Module
  - **[Process](https://github.com/apkelly/devnibbles_facial_recognition_with_android)**
    
    1. The camera preview surface, so we can see what the camera sees.
    
    2. A camera source, to actually grab frames from the hardware camera.
    
    3. A detector, this will detect a face in a given frame.
    
    4. Classify the face using one of the ML(Google AutoML, TensorFlow)
  
  - **Class**
```kotlin
class CameraSourcePreview(private val mContext: Context, attrs: AttributeSet) : ViewGroup(mContext, attrs){}
// 카메라가 보는 장면과 같은 장면을 따로 뽑아낸다.

interface ICameraSource {}
// 위 CameraSourcePreview 클래스를 여러 라이브러리에서 재사용을 하기 위한 인터페이스

class GVCameraSource(context: Context, detector: Detector<*>) : ICameraSource {}
// deprecated

class SaveFrameFaceDetector(private val delegateDetector: Detector<Face>) : Detector<Face>() {}
// detect faces in a camera frame and give us a callback when one is detected.

class GoogleVisionActivity : AbstractActivity() {}
// provides the missing methods for creating, starting and releasing the camera source. And also creates the face tracker to be used by the camera source to detect faces

class FaceDetector(private val callback: DetectorCallback?) : IFrameProcessor {}
// +
```

---

### Milestone
- **Week 1**: 개발 환경 및 언어 설정 & 마일스톤 및 모듈 프로세스 정의 & 관련 자료 조사 *(+a관련 언어 공부)*

- **Week 2**: 

- **Week 3**

- **Week 4**

- **Week 5**

- **Week 6**

- **Week 7**

- **Week 8**


