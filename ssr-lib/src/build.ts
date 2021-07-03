import webpack from 'webpack';
import chalk from 'chalk';
import * as rimraf from 'rimraf';

import { buildServerConfig } from './webpack/server';
import { WebpackBuildConfigOptionsType } from './webpack/types';
import { buildClientConfig } from './webpack/client';

// @ts-ignore
import MultiStats = webpack.compilation.MultiStats;

export const runCompiler = (
  compiler: webpack.Compiler | webpack.MultiCompiler,
  onSuccess: (s: MultiStats) => void = () => {},
  watch = false
) =>
  new Promise((resolve, reject) => {
    const cb = (err?: Error, stats?: MultiStats) => {
      if (stats) {
        onSuccess(compiler);

        compiler.close((closeErr) => {
          if (closeErr) {
            return reject(closeErr);
          }

          resolve(stats);
        });
      } else {
        reject(err);
      }
    };

    if (watch) {
      return compiler.watch({}, cb);
    }

    compiler.run(cb);
  });

export function buildServer(
  options: WebpackBuildConfigOptionsType
): Promise<any> {
  const compiler = webpack(<any>buildServerConfig(options));

  return runCompiler(
    compiler,
    () => {
      console.log(chalk.green('server built'));
    },
    !options.isProduction
  );
}

export async function buildDev(options: WebpackBuildConfigOptionsType) {
  rimraf.sync(options.buildPath);

  options.isProduction = false;

  await buildServer(options);

  options.devServer = true;

  return webpack(buildClientConfig(options));
}

export async function buildProd(options: WebpackBuildConfigOptionsType) {
  rimraf.sync(options.buildPath);

  options.isProduction = true;

  return runCompiler(
    webpack([buildClientConfig(options), buildServerConfig(options)]),
    () => {
      console.log(chalk.green('built'));
    }
  );
}
