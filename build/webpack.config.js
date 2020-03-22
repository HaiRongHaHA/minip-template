const { resolve } = require("path");
const plugins = require("./plugins");
const rules = require("./rules");
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
    context: resolve("src"),
    mode: isProduction ? "production" : "none",
    watch: isProduction ? false : true,
    // progress
    watchOptions: {
        poll: 1000, // 每秒 问1000次
        aggregateTimeout: 500, // 防抖，输入代码后得500毫秒更新
        ignored: /node_moudles/ // 不需要进行监控得文件
    },
    entry: "./app.js",
    output: {
        path: resolve("dist"),
        filename: "[name].js",
        globalObject: "wx"
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "./../src")
        }
    },
    plugins: [...plugins],
    module: {
        rules: [...rules]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minChunks: 2,
            minSize: 0,
            name: "common",
            cacheGroups: {
                // 缓存组
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        runtimeChunk: {
            name: "runtime"
        }
    }
};
