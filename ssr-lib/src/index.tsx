import { startDevServer, startProdServer } from './startServer';
import { buildDev, buildProd } from './build';
import { parseOptions, parseCommand } from './parseOptions';

export const run = async () => {
  const options = parseOptions();

  parseCommand({
    startDevServer: async ({ port }) => {
      const compiler = await buildDev(options);

      await startDevServer(options, compiler, { port, host: '127.0.0.1' });
    },
    buildProd: () => {
      buildProd(options);
    },
    startProdServer: (args) => {
      startProdServer(options, args);
    },
  });
};
