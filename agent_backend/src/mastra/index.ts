import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { LibSQLStore } from '@mastra/libsql';

import { weatherAgent } from './agents';

export const mastra = new Mastra({
  agents: { weatherAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: 'file:../mastra.db',
  }),
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  server: {
    middleware: [
      {
        path: '*',
        handler: async (c, next) => {
          if (process.env.NODE_ENV !== 'production' && process.env.IS_LOCAL === 'true') {
            return next();
          } else {
            const u = new URL(c.req.url);
            // health check for mastra cloud
            if (c.req.method === 'GET' && u.pathname === '/api/agents') {
              return next();
            }
          }

          const apiKey = c.req.header('Authorization');
          if (!apiKey) {
            return new Response('Unauthorized', { status: 401 });
          }
          if (apiKey !== `Bearer ${process.env.MASTRA_API_KEY}`) {
            return new Response('Unauthorized', { status: 401 });
          }
          return next();
        },
      },
    ],
  },
});
