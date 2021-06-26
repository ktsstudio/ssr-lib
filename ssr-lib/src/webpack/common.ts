import path from 'path';

import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

import { WebpackBuildConfigOptionsType } from './types';

export const buildCommonConfig = ({
  isProduction,
  srcPath,
  rootPath,
  devServer,
}: WebpackBuildConfigOptionsType) => {
  const cssLoader = (withModules = false) => {
    return [
      isProduction
        ? {
            loader: MiniCssExtractPlugin.loader,
          }
        : {
            loader: 'style-loader',
          },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          modules: withModules
            ? { localIdentName: '[name]__[local]__[contenthash:base64:5]' }
            : false,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer()],
        },
      },
      {
        loader: 'sass-loader',
      },
    ];
  };

  return {
    target: 'web',
    context: rootPath,

    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval-source-map',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        // 'react-dom': '@hot-loader/react-dom',
        components: path.join(srcPath, 'components'),
        config: path.join(srcPath, 'config'),
        img: path.join(srcPath, 'img'),
        pages: path.join(srcPath, 'pages'),
        styles: path.join(srcPath, 'styles'),
        utils: path.join(srcPath, 'utils'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require('@babel/preset-env'),
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
                require('@babel/preset-react'),
                require('@babel/preset-typescript'),
              ],
              plugins: [
                devServer && require.resolve('react-refresh/babel'),
                require('@loadable/babel-plugin'),
                require('@babel/plugin-proposal-export-default-from'),
                require('@babel/plugin-proposal-class-properties'),
                require('@babel/plugin-transform-async-to-generator'),
              ].filter(Boolean),
            },
          },
        },
        {
          test: /\.(png|jpg)$/,
          // exclude: /\.(component|c)\.svg$/,
          type: 'asset',
          generator: {
            filename: 'static/img/[name].[contenthash].[ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 8192,
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                memo: true,
                svgoConfig: {
                  plugins: {
                    removeViewBox: false,
                  },
                },
              },
            },
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                publicPath: '/static/',
                outputPath: 'static/',
                name: 'img/[name].[contenthash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(eot|woff2|woff|ttf?)$/,
          type: 'asset',
          generator: {
            filename: 'static/fonts/[name].[contenthash].[ext]',
          },
        },
        {
          test: /\.s?css$/,
          exclude: /\.modules\.(s?css|sass)$/,
          use: cssLoader(),
        },
        {
          test: /\.modules\.(s?css|sass)$/,
          use: cssLoader(true),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        isProduction: JSON.stringify(isProduction),
      }),
      new LoadablePlugin({
        filename: 'loadable-stats.json',
        writeToDisk: true,
      }),
    ].filter(Boolean),
  };
};
