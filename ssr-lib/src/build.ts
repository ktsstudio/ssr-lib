import webpack from 'webpack';
import chalk from 'chalk';
import * as rimraf from 'rimraf';

import { buildServerConfig } from './webpack/server';
import { WebpackBuildConfigOptionsType } from './webpack/types';
import { buildClientConfig } from './webpack/client';

// @ts-ignore
import MultiStats = webpack.compilation.MultiStats;

export const runCompiler = (
  compiler: webpack.Compiler,
  watch = false,
  onSuccess: (s: MultiStats) => void = () => {}
) =>
  new Promise((resolve, reject) => {
    const cb = (err?: Error, stats?: MultiStats) => {
      if (stats) {
        onSuccess(compiler);
        return resolve(stats);
      }

      return reject(err);
    };

    if (watch) {
      compiler.watch({}, cb);
    } else {
      compiler.run(cb);
    }
  });

export function buildServer(
  options: WebpackBuildConfigOptionsType
): Promise<any> {
  const compiler = webpack(<any>buildServerConfig(options));

  return runCompiler(compiler, !options.isProduction, () => {
    console.log(chalk.green('server built'));
  });
}

export function buildClient(
  options: WebpackBuildConfigOptionsType
): Promise<any> {
  const compiler = webpack(<any>buildClientConfig(options));

  return runCompiler(compiler);
}

export async function buildDev(options: WebpackBuildConfigOptionsType) {
  rimraf.sync(options.buildPath);

  options.isProduction = false;

  await buildServer(options);

  return webpack([
    <any>buildClientConfig(options),
    <any>buildServerConfig(options),
  ]);
}

export async function buildProd(options: WebpackBuildConfigOptionsType) {
  rimraf.sync(options.buildPath);

  options.isProduction = true;

  return Promise.all([buildServer(options), buildClient(options)]);
}
