# Ably realtime react-financial-charts demo

Demo app to update financial chart in realtime using Ably pub/sub.
To run this application, you will need [finnhub.io](https://finnhub.io/docs/api) and [Ably](https://ably.com/sign-up) API keys.
Additionally, you need to clone and run the [backend-service](https://github.com/AvanthikaMeenakshi/ably-node-demo). The service's README provides detailed setup instructions.

## Installation and running

1. Install the required dependencies:

   ```bash
   npm install
   ```

2. To run the application locally, you need to create a `.env` file with your Ably API key. Add the following line to the `.env` file:

   ```
   ABLY_API_KEY=<YOUR_API_KEY>
   ```

3. Execute the following command to run the application locally. It will be accessible at [localhost:8080](http://localhost:8080/):

   ```bash
   npm run dev
   ```

![Demo](https://github.com/AvanthikaMeenakshi/ably-react-financial-charts-demo/assets/14136164/9aa36964-5c6d-46b6-a1c9-94c3f7f39833)
