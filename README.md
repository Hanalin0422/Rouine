# 당신의 스타일리스트 <루인>

![horizontal_on_white_by_logaster](https://user-images.githubusercontent.com/78638427/141692257-ab6b861b-b2f8-4db0-a71a-05424c0d8c89.png)

예쁘게 꾸미고 싶지만 정작 자기 자신을 정확히 알지 못하는 당신을 위한 맞춤형 스타일리스트 <strong><루인></strong> </br>
인공지능 AI를 통하여 당신의 얼굴형을 분석하여 어떤 스타일과 화장법이 당신에게 어울리는지 추천해주는 웹사이트입니다.

---
### 기술 스택
node.js, ejs, css, javascript, mongoDB

### 사용 모듈
##### 기본
express, ejs, nodemon, body-parser, express-ejs-layouts, util</br>
##### 디비
mongoose
##### 로그인, 보안
bcryptjs, passport, connect-flash, passport-local

***
##### 기능 구현
- [x] 로그인 기능</br>
- [x] teachable machine API 연동</br>

---
###### 하다 보니 안되는 부분
1. 로그인 기능을 구현하는데 req.body.username이 없는데도 error로 안 잡힌다.
왜인지는 계속 분석해봤으나 아직 확인을 못했다.
로그인을 할때 아이디를 입력하지 않거나 비밀번호만 입력하고 제출을 눌렀을 경우 입력이 안되었다고 알림을 주고 싶은데 error로 인식을 하지 못하고 그냥 redirect만 진행이된다.
아이디와 비밀번호를 잘못 입력할 경우 정확하게 입력하라는 경고도 보내고 싶다.

해결 : errors 객체가 login.ejs에 전달이 되었는데 변수를 잘못 설정하여 출력이 안되고 있었음.
변수를 알맞게 수정함으로서 동작 완료
