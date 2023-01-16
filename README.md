<h1 align="center">Uyuni keycloak Theme 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.2.4.2-blue.svg?cacheSeconds=2592000" />
</p>

## 참고

https://github.com/InseeFrLab/keycloakify

## Install

```sh
npm install
```

## Usage

1. dev 서버 시작하기

   ```sh
   npm run start
   ```

2. `src/utils/keycloakManager.ts` 파일에서 27번째 주석 헤재
   ```typescript
     ({
     // @cindy.choi
     // 아래의 디버깅을 원하는 페이지 주석을 해제하면 하단의 mockData를 적용하여 로컬에 페이지를 띄울 수 있습니다.
      "mockPageId": "login.ftl",
     // "mockPageId": "register.ftl",
     // "mockPageId": "login-update-profile.ftl",
     // // @ts-ignore
     // "mockPageId": "login-update-password.ftl",
     // "mockPageId": "info.ftl",
     // "mockPageId": "error.ftl",
   ```

## Build and deploy

1. 다음 명령어 실행

   ```sh
   npm run keycloak
   ```

2. `build_keycloak/src/main/resources/theme` 폴더안에 있는 폴더들을 keycloak 설치 서버의 `/opt/jboss/keycloak/themes` 으로 복사

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
