const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // Son la configuración por default
    // entry: './src/index.js',
    output: {
        // path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        clean: true,
    },
    mode: 'development',
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
            filename: '[name].css',
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: [
              { from: './src/assets', to: './assets' },
            ],
        }),
    ]
}