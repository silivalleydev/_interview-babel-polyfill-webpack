# 바벨 폴리필 웹팩에 대한 실습

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
                "useBuiltIns": "entry", //
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

        // 최신 기능 사용
        const arr = Array.from([1, 2, 3]);
        console.log(arr);

        ```
  -  `useBuiltIns`를 `usage`하는 경우 사용된 기능에 따라 필요한 폴리필만 자동으로 추가.	
     -  최적화된 폴리필 추가	
     -  Babel이 코드 분석을 수행해야 함
     -  **번들 크기가 증가할 수 있으므로, 특정 환경에 필요한 폴리필만 포함하고 싶다면 useBuiltIns: "usage"를 사용**

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