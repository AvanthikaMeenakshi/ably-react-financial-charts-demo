import reactRefresh from '@vitejs/plugin-react-refresh';
import express from "express";
import { defineConfig, ProxyOptions, ViteDevServer, loadEnv } from "vite";
import { DefaultApi } from "finnhub-ts";
import { Request, Response } from "express";
import Ably from 'ably'
import cron from 'node-cron';

const app = express();

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {

  const env = loadEnv(mode, process.cwd(), "");

  const finnhubClient = new DefaultApi({
    apiKey: env.VITE_FINNHUB_API_KEY,
    isJsonMime: (input) => {
      try {
        JSON.parse(input)
        return true
      // eslint-disable-next-line no-empty
      } catch (error) {}
      return false
    },
  })

  app.get("/api/ohlc/:symbol", (req: Request, res: Response) => {
    console.log("fetching symbol");
    const { symbol } = req.params;
    const now = new Date();
    const from = Math.floor(now.setMonth(now.getMonth() - 2) / 1000); // 2 months ago in Unix timestamp
    const to = Math.floor(Date.now() / 1000); // Current time in Unix timestamp
    finnhubClient
      .stockCandles(symbol, "15", from, to)
      .then((resp) => {
        res.json(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching stock candle data:", err);
      });
  });

  const realtime = new Ably.Realtime(env.VITE_ABLY_API_KEY_SERVER || '');

  // This cronjob publishes price changes in the last 5 minutes to Ably
  cron.schedule('* * * * *', () => {
    console.log(`Fetching stock data`);
    const now = new Date().getTime();
    const to = Math.floor(now / 1000);
    const from = to - 300;
    const channel = realtime.channels.get('aapl-stock-value');
    finnhubClient.stockCandles("AAPL", '1', from, to).then(resp => {
      channel.publish("update", resp.data);
    }).catch(err => {
      console.error('Error fetching stock candle data:', err);
    })
  });

  return { plugins: [reactRefresh(), expressPlugin()], server: { port: 3000, open: true } } 
})

const proxy: Record<string, string | ProxyOptions> = {
  "/api": {}, // proxy our /api route to nowhere
};

function expressPlugin() {
  return {
    name: "express-plugin",
    config() {
      return {
        server: { proxy },
        preview: { proxy },
      };
    },
    configureServer(server: ViteDevServer) {
      server.middlewares.use(app);
    },
  };
}