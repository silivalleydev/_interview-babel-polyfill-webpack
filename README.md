# 바벨 폴리필 웹팩에 대한 실습

## 바벨

### Babel 설치 및 설정

#### 바벨 설치
```bash
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

- `@babel/core`: Babel의 핵심 라이브러리.
- `@babel/preset-env`: 최신 JavaScript를 구형 브라우저 호환 코드로 변환.
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
        "useBuiltIns": "entry",
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