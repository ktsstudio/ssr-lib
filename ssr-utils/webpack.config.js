const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'build');

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-map' : 'eval',
  entry: path.join(srcPath, 'index.ts'),
  output: {
    filename: 'index.js',
    path: buildPath,
    globalObject: 'this',
    library: {
      name: 'ssrutils',
      type: 'umd',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  externals: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
});
