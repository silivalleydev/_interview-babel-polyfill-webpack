const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all', // 모든 모듈에 대해 코드 스플리팅 적용
    },
    runtimeChunk: 'single', // 런타임 코드를 별도로 분리
  },
  plugins: [
    // 환경 변수를 확인하여 번들 분석기 조건부 실행
    ...(process.env.ANALYZE === 'true'
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // 분석 결과를 정적 HTML 파일로 출력
            openAnalyzer: true, // 빌드 후 브라우저에서 분석기 열기
            reportFilename: 'bundle-report.html', // 출력 파일 이름
          }),
        ]
      : []),
  ],
});
