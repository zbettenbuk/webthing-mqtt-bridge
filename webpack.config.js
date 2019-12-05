const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [
            '.js',
            '.ts'
        ],
    },
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node'
};