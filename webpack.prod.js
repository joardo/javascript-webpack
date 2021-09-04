const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // Son la configuración por default
    // entry: './src/index.js',
    output: {
        // path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',  
                options: {
                    sources: false,
                    minimize: false,
                }       
                
            },
            {
                test: /\.css$/,
                exclude: /styles.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ],
                
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                  presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Mi webpack app',
            template: './src/index.html',
            path: path.resolve(__dirname, './dist'),
            filename: 'index.html'            
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: [
              { from: './src/assets', to: './assets' },
            ],
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            '...',
            new CssMinimizerPlugin(),
        ]
    }
}