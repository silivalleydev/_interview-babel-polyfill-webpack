# 바벨 폴리필 웹팩에 대한 실습

- [바벨 폴리필 웹팩에 대한 실습](#바벨-폴리필-웹팩에-대한-실습)
  - [바벨](#바벨)
    - [Babel 설치 및 설정](#babel-설치-및-설정)
      - [바벨 설치](#바벨-설치)
      - [`babel.config.json` 파일 설정](#babelconfigjson-파일-설정)
      - [바벨 프리셋 동작 순서](#바벨-프리셋-동작-순서)
  - [타입스크립트](#타입스크립트)
    - [타입스크립트 설치 및 설정](#타입스크립트-설치-및-설정)
      - [타입스크립트 관련 패키지 설치](#타입스크립트-관련-패키지-설치)
      - [`tsconfig.json` 파일 설정](#tsconfigjson-파일-설정)
  - [웹팩](#웹팩)
    - [1. Webpack의 역할과 개념](#1-webpack의-역할과-개념)
      - [Webpack의 역할](#webpack의-역할)
    - [2. Webpack 설정 파일의 개념](#2-webpack-설정-파일의-개념)
      - [주요 구성 요소](#주요-구성-요소)
    - [3. Webpack 설정 파일 예제와 옵션 설명](#3-webpack-설정-파일-예제와-옵션-설명)
    - [웹팩 관련 패키지 설치 및 설정](#웹팩-관련-패키지-설치-및-설정)
      - [Webpack 관련 패키지 설치](#webpack-관련-패키지-설치)
      - [`webpack.config.js` 파일 설정](#webpackconfigjs-파일-설정)
  - [프로젝트 구조 생성](#프로젝트-구조-생성)
- [Webpack과 Babel-Loader 동작 원리 및 상호작용](#webpack과-babel-loader-동작-원리-및-상호작용)
  - [**Webpack 동작 원리**](#webpack-동작-원리)
    - [1. **Entry (진입점)**](#1-entry-진입점)
    - [2. **Module Resolution (모듈 처리)**](#2-module-resolution-모듈-처리)
      - [설정된 로더](#설정된-로더)
    - [3. **Loaders (로더의 역할)**](#3-loaders-로더의-역할)
      - [1. **Babel-Loader** (`babel-loader`)](#1-babel-loader-babel-loader)
    - [4. **Plugins (플러그인의 역할)**](#4-plugins-플러그인의-역할)
      - [1. **HtmlWebpackPlugin**](#1-htmlwebpackplugin)
    - [5. **Output (출력)**](#5-output-출력)
  - [**Babel-Loader와 Babel의 상호작용**](#babel-loader와-babel의-상호작용)
    - [**1. 동작 순서**](#1-동작-순서)
    - [**2. Babel 트랜스파일링 과정**](#2-babel-트랜스파일링-과정)
      - [예시: `src/index.tsx`](#예시-srcindextsx)
      - [Babel 설정 (`babel.config.json`):](#babel-설정-babelconfigjson)
      - [변환 과정:](#변환-과정)
  - [**Webpack의 최종 동작 흐름**](#webpack의-최종-동작-흐름)
  - [**결론**](#결론)
- [Alias 설정: 3개의 설정 파일(TypeScript, Webpack, Babel)에 해야 하는 이유와 방법](#alias-설정-3개의-설정-파일typescript-webpack-babel에-해야-하는-이유와-방법)
  - [**Alias를 3개 설정 파일에 적용해야 하는 이유**](#alias를-3개-설정-파일에-적용해야-하는-이유)
    - [**1. TypeScript**](#1-typescript)
    - [**2. Webpack**](#2-webpack)
    - [**3. Babel**](#3-babel)
  - [**Alias 설정 방법**](#alias-설정-방법)
    - [**1. TypeScript 설정**](#1-typescript-설정)
      - [**파일**: `tsconfig.json`](#파일-tsconfigjson)
      - [**설명**](#설명)
    - [**2. Webpack 설정**](#2-webpack-설정)
      - [**파일**: `webpack.config.js`](#파일-webpackconfigjs)
      - [**설명**](#설명-1)
    - [**3. Babel 설정**](#3-babel-설정)
      - [**파일**: `babel.config.json`](#파일-babelconfigjson)
      - [**설명**](#설명-2)
  - [**옵션별 의미 요약**](#옵션별-의미-요약)
    - [**TypeScript (`tsconfig.json`)**](#typescript-tsconfigjson)
    - [**Webpack (`webpack.config.js`)**](#webpack-webpackconfigjs)
    - [**Babel (`babel.config.json`)**](#babel-babelconfigjson)
  - [**왜 3가지 설정 모두 필요한가?**](#왜-3가지-설정-모두-필요한가)
  - [**전체 디렉토리 구조 예시**](#전체-디렉토리-구조-예시)
  - [**결론**](#결론-1)
- [폴리필(Polyfill)의 정의 및 역할](#폴리필polyfill의-정의-및-역할)
  - [**폴리필(Polyfill)란?**](#폴리필polyfill란)
    - [**역할**](#역할)
- [폴리필을 추가해야 하는 케이스](#폴리필을-추가해야-하는-케이스)
  - [**1. JavaScript 기능**](#1-javascript-기능)
    - [**1.1 최신 JavaScript 기능 사용 시**](#11-최신-javascript-기능-사용-시)
      - [사용 예: `Promise`](#사용-예-promise)
    - [**1.2 비동기 기능 사용 시**](#12-비동기-기능-사용-시)
      - [사용 예: `async/await`](#사용-예-asyncawait)
    - [**1.3 최신 배열 및 객체 메서드**](#13-최신-배열-및-객체-메서드)
      - [사용 예: `Array.from`](#사용-예-arrayfrom)
    - [**1.4 정적 프로퍼티와 클래스 필드**](#14-정적-프로퍼티와-클래스-필드)
      - [사용 예: 클래스 정적 필드](#사용-예-클래스-정적-필드)
  - [**2. 웹 브라우저 API**](#2-웹-브라우저-api)
    - [**2.1 `fetch` API**](#21-fetch-api)
      - [사용 예:](#사용-예)
    - [**2.2 DOM API**](#22-dom-api)
      - [사용 예: `Element.closest`](#사용-예-elementclosest)
  - [**3. CSS 기능**](#3-css-기능)
    - [**3.1 Grid 레이아웃**](#31-grid-레이아웃)
- [폴리필 추가 방법 정리](#폴리필-추가-방법-정리)
    - [**1. `core-js` 사용**](#1-core-js-사용)
    - [**2. `regenerator-runtime` 사용**](#2-regenerator-runtime-사용)
    - [**3. `whatwg-fetch` 사용**](#3-whatwg-fetch-사용)
    - [**4. Autoprefixer 사용 (CSS)**](#4-autoprefixer-사용-css)


## 바벨

### Babel 설치 및 설정

#### 바벨 설치
```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

- `@babel/core`: Babel의 핵심 라이브러리.
- `@babel/preset-env`: 최신 JavaScript를 구형 브라우저 호환 코드로 변환.
  - `useBuiltIns`를 `entry`로 하는 경우 -> 모든 폴리필을 추가. 개발자가 직접 진입점에서 core-js를 import.
    - 개발자가 폴리필을 명시적으로 추가해야 하며, 모든 폴리필을 포함합니다.
    - 이는 완전한 브라우저 호환성이 필요한 프로젝트(예: IE11 지원)에서 유용합니다.
    - **불필요한 폴리필 포함으로 번들 크기 증가**
    - 설정코드
        ```js
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "entry",
                    "corejs": 3
                }
            ],
            "@babel/preset-react",
            "@babel/preset-typescript"
        ]
        ```
    - index.js에 직접 core-js를 import해야함
        ```js
        import "core-js/stable";
        import "regenerator-runtime/runtime";
        import "core-js/stable/array/from"; // 사이즈 줄이고 싶으면 왼쪽과 같이 특정 모듈만 불러오는 방법이 있음
        import "core-js/stable/promise";

        // 최신 기능 사용
        const arr = Array.from([1, 2, 3]);
        console.log(arr);

        ```
    - index.js에 직접 core-js, regenerator-runtime를 import해야함
        ```js
        import "core-js/stable";
        import "regenerator-runtime/runtime";

        // 최신 기능 사용
        const arr = Array.from([1, 2, 3]);
        console.log(arr);

        ```
  -  `useBuiltIns`를 `usage`하는 경우 사용된 기능에 따라 필요한 폴리필만 자동으로 추가.	
     -  최적화된 폴리필 추가	
     -  Babel이 코드 분석을 수행해야 함
     -  **번들 크기가 증가할 수 있으므로, 특정 환경에 필요한 폴리필만 포함하고 싶다면 useBuiltIns: "usage"를 사용**
     -      - 설정코드
        ```js
        "presets": [
            [
                "@babel/preset-env",
                {
                    "useBuiltIns": "usage",
                    "corejs": 3,
                    "targets": {
                       "browsers": "> 0.25%, not dead"
                    }
                }
            ],
            "@babel/preset-react",
            "@babel/preset-typescript"
        ]
        ```

- `@babel/preset-react`: JSX를 트랜스파일링.
- `@babel/preset-typescript`: TypeScript를 트랜스파일링.
- `babel-loader`: Webpack에서 Babel을 사용할 수 있도록 설정.

#### `babel.config.json` 파일 설정
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry", //
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

#### 바벨 프리셋 동작 순서

- 관련 코드
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry", //
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```
- 동작 순서
1. `@babel/preset-typescript`: TypeScript 타입 제거 및 JavaScript로 변환.
2. `@babel/preset-react`: JSX를 JavaScript로 변환 (React.createElement 호출 추가 또는 jsx-runtime 활용).
3. `@babel/preset-env`: 최신 JavaScript를 구형 브라우저 호환 코드로 변환.
4. `useBuiltIns`: "entry"에 따라 폴리필을 추가.

- FAQ
FAQ
1. 왜 `프리셋`이 거꾸로 적용되나요?
- `Babel`은 `아래쪽 프리셋부터 코드를 처리`하여 `위쪽 프리셋에 넘기기` 때문입니다. 따라서 위의 코드에선 `TypeScript → JSX → 환경 설정` 순으로 처리됩니다.

2. `useBuiltIns`: "entry"로 번들 크기가 커질 수 있나요?
- 네. entry 옵션은 core-js의 모든 폴리필을 추가하므로, 필요 없는 기능까지 포함될 수 있습니다. 번들 크기를 최적화하려면 useBuiltIns: "usage"를 고려하세요.

3. Babel 트랜스파일링 순서: `.tsx` 파일 변환 과정
`.tsx` 파일은 Babel 설정에 따라 아래와 같은 순서로 트랜스파일링됩니다.
- **1. TypeScript 타입 제거 및 순수 JavaScript + JSX로 변환**
  - Babel은 **`@babel/preset-typescript`**를 사용하여 TypeScript의 타입 정보를 제거합니다.
  - TypeScript 문법을 JavaScript로 변환하며, JSX 문법은 그대로 유지됩니다.
  - 이 과정에서는 **JSX가 아직 변환되지 않습니다**.

  - **예: `.tsx` → JavaScript + JSX**
  ```tsx
  // Input (TypeScript)
  const greet: string = "Hello!";
  const App = () => <div>{greet}</div>;

  export default App;
  ```

  - **출력 (JSX 포함)**
  ```jsx
  const greet = "Hello!";
  const App = () => <div>{greet}</div>;

  export default App;
  ```

- **2. JSX를 React의 JavaScript 함수로 변환**
  - Babel은 **`@babel/preset-react`**를 사용하여 JSX를 일반 JavaScript로 변환합니다.
  - React 16 이하에서는 `React.createElement` 호출로 변환되고, React 17 이상에서는 **새로운 JSX 변환 방식**(`jsx-runtime`)을 사용합니다.

  - **예: JSX → React.createElement**
  ```jsx
  const App = () => <div>{greet}</div>;
  ```

  - **출력**
  ```javascript
  const App = () => React.createElement("div", null, greet);
  ```

- **3. 구형 브라우저 호환 코드로 변환**
  - Babel은 **`@babel/preset-env`**를 사용하여 구형 브라우저에서도 실행 가능한 ES5 코드로 변환합니다.
  - `useBuiltIns: "entry"` 설정에 따라 **진입점에 추가된 폴리필(`core-js`)**을 사용하여 최신 JavaScript 기능을 대체합니다.

  - **예: React.createElement → ES5 호환 코드**
  ```javascript
  const greet = "Hello!";
  const App = function App() {
      return React.createElement("div", null, greet);
  };

  // 최신 기능이 있다면 폴리필 추가
  require("core-js/modules/es.array.from.js");
  const arr = Array.from([1, 2, 3]);
  ```

- **최종적으로 변환된 코드**
  - 최종적으로 구형 브라우저에서도 동작 가능한 ES5 코드는 아래와 같습니다:

  ```javascript
  "use strict";

  require("core-js/modules/es.array.from.js");

  var greet = "Hello!";
  var App = function App() {
      return React.createElement("div", null, greet);
  };
  var arr = Array.from([1, 2, 3]);
  ```

- **결론**
  - `.tsx` 파일은 다음 과정을 거칩니다:

  1. **TypeScript 타입 제거 및 JavaScript + JSX로 변환** (via `@babel/preset-typescript`).
  2. **JSX를 React 함수 호출로 변환** (via `@babel/preset-react`).
  3. **최신 JavaScript를 구형 브라우저 호환 코드로 변환** (via `@babel/preset-env`).

## 타입스크립트

### 타입스크립트 설치 및 설정

#### 타입스크립트 관련 패키지 설치
```bash
npm install --save-dev typescript ts-loader @types/react @types/react-dom
```

- `typescript`: TypeScript 컴파일러.
- `ts-loader`: Webpack에서 TypeScript를 로드.
- `@types/react`, @types/react-dom: React의 TypeScript 타입 정의 파일.

#### `tsconfig.json` 파일 설정

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

## 웹팩

### 1. Webpack의 역할과 개념

#### Webpack의 역할
1. **모듈 번들러**:
   - Webpack은 다양한 자원(JavaScript, CSS, 이미지 등)을 의존성 그래프로 분석하여 하나 이상의 번들 파일로 묶습니다.

2. **번들 최적화**:
   - Tree Shaking, Code Splitting, 파일 압축 등 최적화를 통해 애플리케이션 성능을 개선합니다.

3. **개발 환경 지원**:
   - Webpack DevServer와 Hot Module Replacement(HMR) 기능으로 빠른 개발 환경을 제공합니다.

---

### 2. Webpack 설정 파일의 개념

Webpack 설정 파일(`webpack.config.js`)은 Webpack의 동작 방식을 정의합니다. 주요 구성 요소는 다음과 같습니다:

#### 주요 구성 요소
1. **Entry**: Webpack이 번들링을 시작할 진입점 파일을 지정합니다.
2. **Output**: 번들링된 파일의 출력 경로와 파일 이름을 지정합니다.
3. **Module**: 파일을 처리하는 로더(Loaders)를 정의합니다.
4. **Plugins**: 추가적인 기능을 제공하는 플러그인 목록을 설정합니다.
5. **Mode**: `development`, `production`, `none` 중 하나를 지정하여 Webpack의 동작 모드를 결정합니다.

---

### 3. Webpack 설정 파일 예제와 옵션 설명

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.tsx', // 진입점 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 출력 경로
    filename: 'bundle.js', // 출력 파일명
    clean: true, // 이전 빌드 파일 제거
  },
  mode: 'development', // 개발 모드
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 확장자 처리
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // TypeScript 파일 처리
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/, // CSS 파일 처리
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // 이미지 파일 처리
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML 템플릿 경로
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css', // CSS 파일 이름 설정
    }),
  ],
  devServer: {
    static: './dist', // 정적 파일 경로
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 열기
  },
};
```

### 웹팩 관련 패키지 설치 및 설정

#### Webpack 관련 패키지 설치
```bash
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader
```
- `webpack`: Webpack 핵심 라이브러리.
- `webpack-cli`: Webpack CLI 도구.
- `webpack-dev-server`: 개발 서버.
- `html-webpack-plugin`: HTML 파일 생성 및 관리.
- `style-loader`, `css-loader`: CSS 파일 처리.

#### `webpack.config.js` 파일 설정
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 진입점 파일
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // 매번 빌드 시 dist 폴더 정리
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 처리할 파일 확장자
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts, .tsx 파일
        exclude: /node_modules/,
        use: 'babel-loader', // Babel을 통해 트랜스파일링
      },
      {
        test: /\.css$/, // CSS 파일
        use: ['style-loader', 'css-loader'], // CSS 로드 설정
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // 이미지 파일
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // HTML 템플릿 경로
    }),
  ],
  devServer: {
    static: './dist', // 정적 파일 경로
    port: 3000, // 개발 서버 포트
    open: true, // 서버 시작 시 브라우저 열기
  },
};
```

## 프로젝트 구조 생성
```
react-typescript-setup/
├── src/
│   ├── index.html
│   ├── index.tsx
│   ├── App.tsx
│   ├── styles.css
├── babel.config.json
├── tsconfig.json
├── webpack.config.js
├── package.json
```


# Webpack과 Babel-Loader 동작 원리 및 상호작용

Webpack과 Babel-Loader는 협력하여 최신 JavaScript 코드와 기타 자원을 브라우저에서 실행 가능한 형태로 번들링합니다. 주어진 Webpack 설정을 기준으로, Webpack의 동작 원리와 Babel-Loader의 역할을 단계별로 설명하겠습니다.

---

## **Webpack 동작 원리**

### 1. **Entry (진입점)**
```javascript
entry: './src/index.js',
```
- Webpack은 `entry`에 지정된 파일(`src/index.js`)을 시작점으로 의존성 그래프를 생성합니다.
- `index.js` 파일에서 import된 모든 모듈을 분석하고, 필요한 리소스를 추적합니다.

---

### 2. **Module Resolution (모듈 처리)**
Webpack은 `module.rules`에서 정의된 규칙에 따라, 특정 파일 형식을 처리하기 위해 적절한 로더를 적용합니다.

#### 설정된 로더
```javascript
rules: [
  {
    test: /\.(ts|tsx|js|jsx)$/, // TypeScript 및 JavaScript 파일
    exclude: /node_modules/,
    use: 'babel-loader', // Babel-Loader 적용
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'], // CSS 처리
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    type: 'asset/resource', // 자원 복사
  },
],
```

- Webpack은 각 파일이 `test`에 매칭되면, 해당 파일을 처리할 로더(`use`)를 호출합니다.
- 예를 들어:
  - `.js`, `.jsx`, `.ts`, `.tsx`: `babel-loader` 호출.
  - `.css`: `style-loader`와 `css-loader` 호출.
  - 이미지 파일: `asset/resource`로 복사.

---

### 3. **Loaders (로더의 역할)**
로더는 Webpack에서 처리할 수 없는 특정 파일 형식을 JavaScript로 변환하거나, 번들링 가능한 형태로 처리합니다.

#### 1. **Babel-Loader** (`babel-loader`)
- Babel-Loader는 Webpack과 Babel 간의 인터페이스 역할을 합니다.
- Webpack이 JavaScript/TypeScript 파일을 만나면 `babel-loader`를 호출하여 Babel에 트랜스파일링을 요청합니다.
- Babel은 설정된 프리셋과 플러그인에 따라 코드를 변환합니다.

---

### 4. **Plugins (플러그인의 역할)**
Webpack 플러그인은 번들링 과정의 추가적인 기능을 수행합니다.

#### 1. **HtmlWebpackPlugin**
```javascript
new HtmlWebpackPlugin({
  template: './public/index.html',
});
```
- 이 플러그인은 템플릿(`public/index.html`)을 기반으로 번들링된 스크립트를 자동으로 HTML에 포함합니다.

---

### 5. **Output (출력)**
```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js',
  clean: true,
},
```
- 번들 파일이 생성될 위치(`dist/`)와 파일 이름 패턴(`[name].[contenthash].js`)을 정의합니다.
- `contenthash`를 추가하여 파일 변경 시 브라우저 캐싱을 효과적으로 관리합니다.

---

## **Babel-Loader와 Babel의 상호작용**

Babel-Loader는 Webpack이 파일을 처리하는 중간 단계에서 Babel을 호출하여, JavaScript/TypeScript 파일을 변환합니다. 

### **1. 동작 순서**
1. Webpack은 `test: /\.(ts|tsx|js|jsx)$/`에 매칭되는 파일을 찾습니다.
2. 해당 파일을 Babel-Loader로 전달합니다.
3. Babel-Loader는 Babel에 파일을 전달하고, Babel 설정(`babel.config.json` 또는 `.babelrc`)에 따라 변환합니다.
   - `@babel/preset-typescript`: TypeScript를 JavaScript로 변환.
   - `@babel/preset-react`: JSX를 JavaScript로 변환.
   - `@babel/preset-env`: 구형 브라우저 호환 코드로 변환.
4. Babel이 트랜스파일된 코드를 Babel-Loader에 반환합니다.
5. Webpack은 반환된 결과를 번들에 포함합니다.

---

### **2. Babel 트랜스파일링 과정**
Babel은 설정된 프리셋과 플러그인에 따라 파일을 변환합니다.

#### 예시: `src/index.tsx`
```tsx
const greet: string = "Hello!";
const App = () => <h1>{greet}</h1>;

export default App;
```

#### Babel 설정 (`babel.config.json`):
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

#### 변환 과정:
1. **TypeScript 트랜스파일링 (`@babel/preset-typescript`)**:
   - 타입 정보를 제거하고 JavaScript로 변환.
   ```javascript
   const greet = "Hello!";
   const App = () => <h1>{greet}</h1>;
   ```

2. **JSX 변환 (`@babel/preset-react`)**:
   - JSX를 React 함수 호출로 변환.
   ```javascript
   const App = () => React.createElement("h1", null, greet);
   ```

3. **구형 브라우저 호환 코드 생성 (`@babel/preset-env`)**:
   - 최신 JavaScript 문법을 ES5로 변환.
   ```javascript
   "use strict";

   var greet = "Hello!";
   var App = function App() {
     return React.createElement("h1", null, greet);
   };

   export default App;
   ```

---

## **Webpack의 최종 동작 흐름**

1. **Webpack 시작**:
   - 진입점(`src/index.js`)부터 의존성 그래프를 생성.
2. **모듈 처리**:
   - 파일 형식에 따라 적절한 로더를 호출.
   - `.js`, `.jsx`, `.ts`, `.tsx` 파일은 Babel-Loader를 통해 처리.
3. **Babel 트랜스파일**:
   - Babel 설정에 따라 최신 JavaScript/JSX/TypeScript를 트랜스파일.
4. **번들링**:
   - 변환된 코드와 의존성 모듈을 묶어 최종 번들 생성.
5. **HTML 생성**:
   - HtmlWebpackPlugin으로 HTML 파일 생성 및 번들 자동 연결.

---

## **결론**
- Webpack은 **의존성 그래프 생성 및 번들링**을 담당하며, Babel-Loader를 통해 코드 변환을 Babel에 위임합니다.
- Babel은 설정된 프리셋과 플러그인에 따라 JavaScript/TypeScript 코드를 구형 브라우저 호환 코드로 변환합니다.
- Webpack과 Babel-Loader의 협력으로 최신 JavaScript 코드와 자원이 효율적으로 번들링됩니다. 😊


# Alias 설정: 3개의 설정 파일(TypeScript, Webpack, Babel)에 해야 하는 이유와 방법

Alias는 프로젝트 구조를 단순화하고 경로를 짧고 의미 있게 사용하도록 도와줍니다. 하지만 TypeScript, Webpack, Babel은 각기 다른 목적과 역할을 가지기 때문에 모든 도구에 별도로 alias를 설정해야 경로 해석과 번들링이 올바르게 작동합니다.

---

## **Alias를 3개 설정 파일에 적용해야 하는 이유**

### **1. TypeScript**
- **역할**: 경로 해석 및 타입 검사를 담당.
- **한계**: 타입 검사와 IDE 지원에만 영향을 미치며, 실제 파일 번들링에는 관여하지 않음.

### **2. Webpack**
- **역할**: 모듈 의존성을 관리하고 실제 파일을 번들링.
- **한계**: TypeScript의 `paths` 설정을 자동으로 인식하지 못하므로 Webpack에 별도로 alias를 설정해야 함.

### **3. Babel**
- **역할**: 최신 JavaScript와 JSX를 트랜스파일링.
- **한계**: Babel은 Webpack이나 TypeScript의 alias를 자동으로 처리하지 않음. 따라서 별도로 alias를 정의해야 올바르게 작동.

---

## **Alias 설정 방법**

### **1. TypeScript 설정**
#### **파일**: `tsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".", // 프로젝트 루트 기준 경로
    "paths": {
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"]
}
```

#### **설명**
- **`baseUrl`**: 기준 경로를 설정합니다. 일반적으로 프로젝트 루트를 사용.
- **`paths`**: 별칭(alias)과 실제 파일 경로를 매핑합니다.
  - `@components/Button` → `src/components/Button`.
  - `*`는 하위 파일/디렉토리를 포함하는 와일드카드.

---

### **2. Webpack 설정**
#### **파일**: `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@utils': path.resolve(__dirname, 'src/utils/')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 파일 확장자 자동 처리
  },
};
```

#### **설명**
- **`alias`**: Webpack이 import 경로를 해석할 때 사용하는 별칭을 설정합니다.
  - `@components` → `src/components/`.
- **`path.resolve`**: 절대 경로로 변환하여 Webpack이 정확한 파일 경로를 인식.
- **`extensions`**: 파일 확장자를 자동으로 처리하여, import 시 확장자를 생략할 수 있음.

---

### **3. Babel 설정**
#### **파일**: `babel.config.json`

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./src"], // 기본 경로
        "alias": {
          "@components": "./src/components",
          "@utils": "./src/utils"
        }
      }
    ]
  ]
}
```

#### **설명**
- **`module-resolver`**: Babel 플러그인으로, 트랜스파일링 중 alias를 해석.
- **`root`**: 기준 경로를 설정합니다. 일반적으로 `src`를 지정.
- **`alias`**: 별칭을 설정하여 Babel이 import 경로를 변환.
  - `@components/Button` → `src/components/Button`.

---

## **옵션별 의미 요약**

### **TypeScript (`tsconfig.json`)**
| 옵션         | 설명                                    |
|--------------|---------------------------------------|
| `baseUrl`    | 기준 경로를 지정. 일반적으로 프로젝트 루트. |
| `paths`      | 별칭(alias)과 실제 경로를 매핑.           |

### **Webpack (`webpack.config.js`)**
| 옵션         | 설명                                    |
|--------------|---------------------------------------|
| `alias`      | 별칭(alias)을 실제 경로로 매핑.          |
| `path.resolve` | 경로를 절대 경로로 변환.                 |
| `extensions` | 파일 확장자를 자동으로 처리.              |

### **Babel (`babel.config.json`)**
| 옵션           | 설명                                    |
|----------------|---------------------------------------|
| `root`         | 기준 경로를 설정. 일반적으로 `src`.       |
| `alias`        | 별칭(alias)을 실제 경로로 매핑.          |

---

## **왜 3가지 설정 모두 필요한가?**

1. **TypeScript**:
   - 경로 해석 및 타입 검사.
   - IDE와 개발 중 경로 완성 지원.

2. **Webpack**:
   - 실제 번들링 시 경로 해석.
   - alias를 Webpack이 직접 처리하여 의존성을 포함.

3. **Babel**:
   - 트랜스파일링 과정에서 alias를 해석.
   - 런타임에서 경로가 올바르게 작동하도록 지원.

---

## **전체 디렉토리 구조 예시**
```
project-root/
├── src/
│   ├── components/
│   │   └── Button.tsx
│   ├── utils/
│   │   └── helpers.ts
│   └── index.tsx
├── tsconfig.json
├── webpack.config.js
├── babel.config.json
```

---

## **결론**
- **TypeScript**, **Webpack**, **Babel**은 서로 독립적으로 alias를 처리하므로, 각 도구에 동일한 alias를 설정해야 합니다.
- 설정을 통일하여 개발, 타입 검사, 번들링, 트랜스파일링 과정에서 일관성을 유지하세요.

추가적인 설정이나 예제가 필요하면 언제든 문의하세요! 😊

# 폴리필(Polyfill)의 정의 및 역할

## **폴리필(Polyfill)란?**

폴리필은 **최신 JavaScript 기능**이나 **웹 브라우저 API**, **CSS 기능** 등을 구형 브라우저 또는 환경에서 사용할 수 있도록 동작을 추가하거나 대체하는 코드입니다. 기본적으로 브라우저가 지원하지 않는 기능(예: `Promise`, `Array.from`, `fetch`, `grid` 등)을 구현하여 호환성을 제공합니다.

### **역할**
1. **브라우저 호환성 유지**:
   - 최신 기능을 지원하지 않는 구형 브라우저에서도 동일한 동작을 보장.
2. **코드 일관성**:
   - 개발자가 환경별 차이를 고려하지 않고 최신 문법과 기능을 사용할 수 있도록 지원.
3. **생산성 향상**:
   - 복잡한 환경 설정 없이 최신 기능을 활용 가능.

---

# 폴리필을 추가해야 하는 케이스

폴리필이 필요한 케이스는 **지원 대상 환경**에서 특정 기능이 제대로 작동하지 않을 때입니다. 아래는 주요 사례와 폴리필 추가 방법을 설명합니다.

---

## **1. JavaScript 기능**

### **1.1 최신 JavaScript 기능 사용 시**

#### 사용 예: `Promise`
```javascript
const promise = new Promise((resolve) => resolve("Done"));
```
**문제:**
- `Promise`는 구형 브라우저(예: IE11)에서 지원되지 않음.

**해결:**
- `core-js`를 통해 `Promise` 폴리필 추가.

```bash
npm install core-js
```

Babel 설정:
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```
- **`useBuiltIns: "usage"`**:
  - 코드에서 사용된 기능에 필요한 폴리필만 자동으로 추가.

---

### **1.2 비동기 기능 사용 시**

#### 사용 예: `async/await`
```javascript
async function fetchData() {
  const response = await fetch('/data');
  return response.json();
}
```
**문제:**
- `async/await`는 트랜스파일링이 필요하며, 추가적으로 **`regenerator-runtime`**이 요구될 수 있음.

**해결:**
```bash
npm install regenerator-runtime
```

Babel 설정:
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```
- **`regenerator-runtime`**은 Babel이 트랜스파일링한 비동기 코드를 지원합니다.

---

### **1.3 최신 배열 및 객체 메서드**

#### 사용 예: `Array.from`
```javascript
const array = Array.from({ length: 3 }, (_, i) => i);
```
**문제:**
- `Array.from`은 구형 브라우저에서 동작하지 않음.

**해결:**
- `core-js` 모듈을 통해 배열 메서드 폴리필 제공.
- 위와 동일한 Babel 설정으로 처리 가능.

---

### **1.4 정적 프로퍼티와 클래스 필드**

#### 사용 예: 클래스 정적 필드
```javascript
class MyClass {
  static staticField = 'Hello';
}
```
**문제:**
- 클래스 필드는 일부 브라우저에서 지원되지 않음.

**해결:**
- Babel 플러그인 추가:
```bash
npm install --save-dev @babel/plugin-proposal-class-properties
```

Babel 설정:
```json
{
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}
```

---

## **2. 웹 브라우저 API**

### **2.1 `fetch` API**

#### 사용 예:
```javascript
fetch('/data').then(response => response.json());
```
**문제:**
- `fetch`는 구형 브라우저(예: IE11)에서 지원되지 않음.

**해결:**
- `whatwg-fetch`를 사용하여 폴리필 추가.

```bash
npm install whatwg-fetch
```

코드에서 사용:
```javascript
import 'whatwg-fetch';
```

---

### **2.2 DOM API**

#### 사용 예: `Element.closest`
```javascript
const element = document.querySelector('.child');
const parent = element.closest('.parent');
```
**문제:**
- `closest` 메서드는 구형 브라우저에서 지원되지 않음.

**해결:**
- `element-closest` 패키지를 사용하여 폴리필 추가.

```bash
npm install element-closest
```

코드에서 사용:
```javascript
import 'element-closest';
```

---

## **3. CSS 기능**

### **3.1 Grid 레이아웃**
**문제:**
- CSS Grid는 IE11과 같은 구형 브라우저에서 제한적으로 지원됩니다.

**해결:**
- **Autoprefixer**를 사용하여 구형 브라우저에서도 Grid가 동작하도록 벤더 프리픽스를 추가.

설치:
```bash
npm install autoprefixer postcss-loader
```

Webpack 설정:
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({ grid: true })
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
```

---

# 폴리필 추가 방법 정리

### **1. `core-js` 사용**
- **설명**:
  - 최신 JavaScript 기능에 대한 폴리필을 제공합니다.
- **설치**:
  ```bash
  npm install core-js
  ```
- **Babel 설정**:
  ```json
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ]
    ]
  }
  ```

### **2. `regenerator-runtime` 사용**
- **설명**:
  - 비동기 코드를 지원하기 위한 런타임을 제공합니다.
- **설치**:
  ```bash
  npm install regenerator-runtime
  ```
- **코드에서 수동 import (필요 시)**:
  ```javascript
  import 'regenerator-runtime/runtime';
  ```

### **3. `whatwg-fetch` 사용**
- **설명**:
  - 브라우저에서 `fetch` API를 지원하지 않는 경우 폴리필 추가.
- **설치**:
  ```bash
  npm install whatwg-fetch
  ```
- **코드에서 수동 import (필요 시)**:
  ```javascript
  import 'whatwg-fetch';
  ```

### **4. Autoprefixer 사용 (CSS)**
- **설명**:
  - CSS 호환성을 위한 벤더 프리픽스를 자동 추가.
- **설치**:
  ```bash
  npm install autoprefixer postcss-loader
  ```
