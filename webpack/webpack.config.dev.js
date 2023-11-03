/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require("webpack");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

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
      "process.env.BASE_URL": JSON.stringify("/"),
    }),
  ],
});
