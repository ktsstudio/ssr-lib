import * as path from 'path';

import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

import { buildCommonConfig } from './common';
import { WebpackBuildConfigOptionsType } from './types';

export const buildServerConfig = (options: WebpackBuildConfigOptionsType) => {
  const { srcPath, buildPath } = options;

  return merge(buildCommonConfig(options), <any>{
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    entry: path.resolve(srcPath, './App.tsx'),
    output: {
      path: path.join(buildPath, 'server'),
      filename: 'server.js',
      libraryTarget: 'commonjs',
    },
    externals: [nodeExternals(), '@loadable/component'],
    node: {
      __dirname: false,
      __filename: false,
    },
  });
};
