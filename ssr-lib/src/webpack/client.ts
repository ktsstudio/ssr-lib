import * as path from 'path';
import * as fs from 'fs';

import webpack from 'webpack';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { buildCommonConfig } from './common';
import { WebpackBuildConfigOptionsType } from './types';

export const buildClientConfig = (options: WebpackBuildConfigOptionsType) => {
  const { srcPath, buildPath } = options;

  const tsConfigPath = path.resolve(srcPath, '../', 'tsconfig.json');
  const indexPath = path.resolve(srcPath, 'index.tsx');

  return merge(buildCommonConfig(options), <any>{
    name: 'client',

    target: 'web',
    devtool: 'source-map',

    entry: [
      indexPath,
      !options.isProduction && 'webpack-hot-middleware/client',
    ].filter(Boolean),

    output: {
      path: path.join(buildPath, 'client'),
      publicPath: '/',
      filename: 'static/js/bundle.[contenthash].js',
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/bundle.[name].[contenthash].css',
      }),
      fs.existsSync(tsConfigPath) &&
        new ForkTsCheckerWebpackPlugin({
          typescript: {
            configFile: tsConfigPath,
          },
          eslint: {
            enabled: false,
            files: './src/**/*.{ts,tsx,js,jsx}',
          },
        }),
      !options.isProduction && new webpack.HotModuleReplacementPlugin(),
      !options.isProduction &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        }),
    ].filter(Boolean),
  });
};
