const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 진입점 파일
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // 번들 이름에 해시 추가
    clean: true, // 매번 빌드 시 dist 폴더 정리
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 처리할 파일 확장자
    alias: {
      '@components': path.resolve(__dirname, 'src/components/') // @components를 src/components로 매핑
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // TypeScript 파일 처리
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML 템플릿 경로
    }),
  ],
};
