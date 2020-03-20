const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MinaWebpackPlugin = require("./mina-webpack-plugin");
const MinaRuntimePlugin = require("./mina-runtime-plugin");

module.exports = [
    new MinaRuntimePlugin(),
    new MinaWebpackPlugin({
        scriptExtensions: [".js"],
        assetExtensions: [".less", ".wxml"]
    }),
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
    }),
    new CopyWebpackPlugin([
        {
            from: "**/*",
            to: "./",
            ignore: ["**/*.js", "**/*.less", "**/*.wxml"]
        }
    ])
];
