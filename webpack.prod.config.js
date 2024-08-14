const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        "button" : "./src/button.js",
        "image" : "./src/image.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "./dist"),
        assetModuleFilename: 'images/[name][ext]'
    },
    mode: "production",

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.scss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|svg|jpeg)$/i,
                type: 'asset/resource',
                // use: [
                //     {
                //         loader: "file-loader",
                //         options: {
                //             name: "[name].[ext]",
                //             outputPath: "images/",
                //         },
                //     },
                // ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: 'asset/inline',
                // use: ["url-loader"],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "button.html",
            chunks: ['button'],
            template: "button_template.html",
            publicPath: "./dist/"
        }),
        new HtmlWebpackPlugin({
            filename: "image.html",
            chunks: ['image'],
            template: "image_template.html",
            publicPath: "./dist/"
        }),
        new ESLintPlugin()
    ],
};
