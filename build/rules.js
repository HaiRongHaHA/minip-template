const { resolve } = require("path");
module.exports = [
    {
        test: /\.js$/,
        include: /src/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        }
    },
    {
        test: /\.less$/,
        include: /src/,
        use: [
            {
                loader: "file-loader",
                options: {
                    useRelativePath: true,
                    name: "[path][name].wxss",
                    context: resolve("src")
                }
            },
            "less-loader"
        ]
    },
    {
        test: /\.wxml$/,
        include: /src/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                    useRelativePath: true,
                    context: resolve("src")
                }
            },
            resolve(__dirname, "./loaders", "wxs-import-loader")
        ]
    }
];
