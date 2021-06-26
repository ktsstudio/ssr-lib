import * as path from 'path';
import * as fs from 'fs';

import serializeJavascript from 'serialize-javascript';
import webpack from 'webpack';
import * as React from 'react';
import * as ejs from 'ejs';
import chalk from 'chalk';
import express, { Express, Request, Response } from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom';
import { loadRoutesData } from '@kts/ssr-utils';

import { WebpackBuildConfigOptionsType } from './webpack/types';
import { DEFAULT_SERVER_CONFIG, ServerConfig } from './conf';

const runServer = (
  app: Express,
  { buildPath, srcPath }: WebpackBuildConfigOptionsType,
  { host, port }: ServerConfig = DEFAULT_SERVER_CONFIG
) => {
  let indexHtmlPath = path.join(srcPath, 'index.html.ejs');

  if (!fs.existsSync(indexHtmlPath)) {
    indexHtmlPath = path.join(__dirname, 'assets', 'index.html.ejs');
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  app.use(async (req: Request, res: Response) => {
    const serverExtractor = new ChunkExtractor({
      statsFile: path.resolve(buildPath, 'server', 'loadable-stats.json'),
    });
    const { default: App, routes } = serverExtractor.requireEntrypoint() as any;

    const clientExtractor = new ChunkExtractor({
      statsFile: path.resolve(buildPath, 'client', 'loadable-stats.json'),
    });

    // load data

    const appUserContext = await App.createContext();

    const pageData = await loadRoutesData(routes, req.path, appUserContext);

    // render

    const routerContext = {};

    const context = {
      pageData,
      appContextSerialized: appUserContext.serialize(),
    };

    const view = (
      <StaticRouter location={req.url} context={routerContext}>
        <App serverContext={context} appContext={appUserContext} />
      </StaticRouter>
    );

    const jsx = clientExtractor.collectChunks(view);

    const appString = renderToString(jsx);

    const scripts = clientExtractor.getScriptTags();
    const styles = clientExtractor.getStyleTags();

    const renderedHtml = ejs.render(templateHtml, {
      app: appString,
      scripts,
      styles,
      context: serializeJavascript(context),
    });

    return res.status(200).send(renderedHtml);
  });

  app.listen(port, host, () => {
    console.log(chalk.green(`Running on http://${host}:${port}/`));
  });
};

const createApp = () => {
  const app = express();

  app.use('/favicon.ico', (req, res) => res.send('favicon'));

  return app;
};

export async function startDevServer(
  options: WebpackBuildConfigOptionsType,
  compiler: webpack.Compiler,
  serverConfig: ServerConfig = DEFAULT_SERVER_CONFIG
) {
  const app = createApp();

  const devServer = devMiddleware(compiler, {
    serverSideRender: true,
  });

  app.use(devServer);

  app.use(hotMiddleware(compiler));

  devServer.waitUntilValid(() => {
    runServer(app, options, serverConfig);
  });
}

export function startProdServer(
  options: WebpackBuildConfigOptionsType,
  serverConfig: ServerConfig = DEFAULT_SERVER_CONFIG
) {
  const app = createApp();

  app.use(
    '/static',
    express.static(path.join(options.buildPath, 'client', 'static'))
  );

  runServer(app, options, serverConfig);
}
