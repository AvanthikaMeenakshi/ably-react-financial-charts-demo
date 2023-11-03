/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require("webpack");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const dotenv = require("dotenv");

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log(envKeys);

module.exports = merge(commonConfig, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        router: () => "http://localhost:3000",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  plugins: [
    ...commonConfig.plugins,
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      ...envKeys,
    }),
  ],
});
