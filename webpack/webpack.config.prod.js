/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require("webpack");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  mode: "production",
  plugins: [
    ...commonConfig.plugins,
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.BASE_URL": JSON.stringify("/moonpig-assessment.github.io"),
    }),
  ],
});
