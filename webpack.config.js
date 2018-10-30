const pkg = require('./package.json');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devtool = 'source-map';

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/index.js',
        'project': './src/index.js',
        'mail': './src/index.js',
        'calendar': './src/index.js',
        'drive': './src/index.js',
        'wiki': './src/index.js',
        'contacts': './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name]/[name].[hash].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, {
            test: /\.scss$/,
            exclude: /node_modules|bower_components/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                'sass-loader'
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules|bower_components/
        }]
    },
    devtool,
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]/[name].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['project'],
            filename: 'project/index.html',
            serviceName: 'project'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['mail'],
            filename: 'mail/index.html',
            serviceName: 'mail'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['calendar'],
            filename: 'calendar/index.html',
            serviceName: 'calendar'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['drive'],
            filename: 'drive/index.html',
            serviceName: 'drive'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['wiki'],
            filename: 'wiki/index.html',
            serviceName: 'wiki'
        }),
        new HtmlWebpackPlugin({
            title: pkg.name,
            template: './src/index.html',
            chunks: ['contacts'],
            filename: 'contacts/index.html',
            serviceName: 'contacts'
        }),
        new CleanWebpackPlugin(['public'])
    ],
    devServer: {
        historyApiFallback: false,
        progress: true,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        contentBase: './public'
    }
};
