import path from 'path';

import * as yargs from 'yargs';

import { WebpackBuildConfigOptionsType } from './webpack/types';
import { BUILD_DIRNAME, SRC_DIRNAME } from './conf';

interface DevServerOptions {
  port: number;
}

interface ProdServerOptions extends DevServerOptions {
  host: string;
}

interface ParseOptions {
  startDevServer: (opts: DevServerOptions) => void;
  startProdServer: (opts: ProdServerOptions) => void;
  buildProd: () => void;
}

export const parseCommand = ({
  startDevServer,
  startProdServer,
  buildProd,
}: ParseOptions) => {
  const { argv } = yargs
    .command(
      'dev [port]',
      'start dev server',
      (args) => {
        args.positional('port', {
          describe: 'dev server port',
          default: 3000,
        });
      },
      startDevServer
    )
    .command('build', 'build prod server', buildProd)
    .command(
      'prod',
      'start prod server',
      (args) => {
        args.option('port', {
          describe: 'server port',
          default: 3000,
        });
        args.option('host', {
          describe: 'server host',
          default: '127.0.0.1',
        });
      },
      startProdServer
    )
    .help()
    .demandCommand()
    .alias('help', 'h');

  return argv;
};

export const parseOptions = (): WebpackBuildConfigOptionsType => {
  const rootPath = process.cwd();

  const srcPath = path.join(rootPath, SRC_DIRNAME);
  const buildPath = path.join(rootPath, BUILD_DIRNAME);

  return {
    srcPath,
    buildPath,
    rootPath,
  };
};
