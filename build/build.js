"use strict";
const ora = require("ora");
const rm = require("rimraf");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

const spinner = ora("building...");
spinner.start();

const config = {
    assetsRoot: path.resolve(__dirname, `../dist`),
    assetsSubDirectory: "",
    bundleAnalyzerReport: process.env.npm_config_report
};

if (config.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
        .BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

rm(path.join(config.assetsRoot, config.assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
        spinner.stop();
        if (err) throw err;
        process.stdout.write(
            stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + "\n\n"
        );

        if (stats.hasErrors()) {
            console.log(chalk.red("  Build failed with errors.\n"));
            process.exit(1);
        }
        console.log(
            chalk.cyan(
                process.env.NODE_ENV === "production"
                    ? "  Build complete.\n"
                    : "  Watching...\n"
            )
        );
    });
});
