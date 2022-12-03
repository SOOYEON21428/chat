# Chat Chat

## 개요

`Chat Chat`은 간단한 채팅 클라이언트 웹앱이다. 아래의 [와이어 프레임](##디자인-와이어프레임)을 참조하여 동일한 페이지를 만드는 것이 목표이다. 해당 프로젝트는 **js를 이용한 통신, 비동기 프로그래밍, 그리고 컴포넌트 라이브러리를** 활용한 웹앱 구현에 그 목적이 있다. 와이어 프레임을 제공하지만 와이어 프레임을 해치지 않는 선에서 세부적인 구현과 디자인은 구현 과정에서 수정한다.

## 사용 라이브러리 및 프레임워크

- [Nextjs](https://nextjs.org/) - React 앱 개발에 필요한 모든 걸 지원하는 프레임워크
- [TailwindCSS](https://tailwindcss.com/) - 유틸리티 CSS 프레임워크
- [CSS Module](https://github.com/css-modules/css-modules) - CSS에 스코프를 추가해주는 CSS 파일(\*.module.css)

## 참조할만한 사이트

- [Google Fonts](https://fonts.google.com/icons) - 무료 폰트 및 아이콘을 구하기 좋다.

## 프로젝트 시작

### 0. 프로그램 설치

과제를 수행하기 위해 다음 프로그램을 설치한다.

- [node](https://nodejs.org/en/)
- [yarn](https://classic.yarnpkg.com/en/docs/install#windows-stable)

### 1. 프로젝트 구축

#### 1.1. 프로젝트 다운로드 및 초기화

```bash
git clone "https://github.com/Malgn-OJT/chatchat"
cd chatchat
yarn
yarn dev
# ready - started server on 0.0.0.0:3000, url: http://localhost:3000
#웹사이트 실행
```

### 1.2. 패키지 커맨드

각 커맨드의 자세한 사항은 `package.json` 파일을 참조한다. next 자체의 커맨드는 `npx next -h`를 참조하거나 [공식 가이드](https://nextjs.org/docs/api-reference/cli)를 참조한다.

- dev : 개발모드에서 앱을 실행한다. `yarn dev -p 8888` 같은 식으로 포트를 지정할 수도 있다.
- build : 앱을 빌드한다. 빌드한 앱은 최적화가 이루저니 단순한 html/css/js로 `Live Server`에서도 실행할 수 있다. 빌드된 앱은 프로젝트 루트 폴더 밑에 `out` 폴더에 저장된다.
- start : build로 빌드된 앱을 실행한다.
- lint : 코드에 문제가 없는지 검사한다.

#### 1.3. 채팅 서버 연동 인터페이스

[ts-chat-server](https://github.com/walrus811/ts-chat-server) 참조

#### 1.4. 날씨 데이터

[AccuWeather](https://developer.accuweather.com/) 참조


## 디자인 와이어프레임

![wire frame](./readme/design.png)


## 구현결과

### 채팅방 입장
![chat-1 입장](https://user-images.githubusercontent.com/102462534/205439085-21ad590f-5352-419e-8720-19df2ed37bd1.gif)
<br/>

### 채팅방 입장시간 확인
![chat-1 입장시간](https://user-images.githubusercontent.com/102462534/205439257-6ee331c1-2c93-49d9-bb20-5a6ca861c408.gif)
<br/>

### 닉네임 변경
![chat-1 닉네임변경](https://user-images.githubusercontent.com/102462534/205439105-3fc83530-16f2-4093-9ec2-405e8bc92cf6.gif)

<br/>

### 날씨확인 (부연기능)
![chat1-날씨](https://user-images.githubusercontent.com/102462534/205439258-8d66ade7-3f77-4b7c-a094-5384ad9fe28e.gif)



<br/>
<br/>

### 나와 상대방 화면
![chat 입장](https://user-images.githubusercontent.com/102462534/205440386-065f7cfa-e848-41f2-adbc-bae0a6ed9f61.gif)
<br/>

![chat 입장시간확인](https://user-images.githubusercontent.com/102462534/205440389-3fd746aa-8de8-44b0-9942-2b98399d3ba8.gif)
<br/>

![chat 닉네임 변경](https://user-images.githubusercontent.com/102462534/205440391-5ad48850-5b73-45d7-848a-22881edbfe3e.gif)



<br/>


