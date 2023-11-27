# Ably realtime react-financial-charts demo

Demo app to update financial chart in realtime using Ably pub/sub.
To run this application, you will need [finnhub.io](https://finnhub.io/docs/api) and [Ably](https://ably.com/sign-up) API keys.

## Installation and running

1. Install the required dependencies:

   ```bash
   npm install
   ```

2. To run the application locally, you need to create a `.env` file with your Ably API key. Add the following line to the `.env` file:

   ```
   VITE_ABLY_API_KEY_CLIENT=<API_KEY_WITH_READ_ONLY_ACCESS>
   VITE_FINNHUB_API_KEY=<FINNHUB_API_KEY>
   VITE_ABLY_API_KEY_SERVER=<API_KEY_WITH_READ_AND_WRITE_ACCESS>
   ```

3. Execute the following command to run the application locally. It will be accessible at [localhost:3000](http://localhost:3000/):

   ```bash
   npm run dev
   ```

![demo](https://github.com/AvanthikaMeenakshi/ably-react-financial-charts-demo/assets/14136164/98481b74-b2a8-4542-a468-a87c0a5d1639)
