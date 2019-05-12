const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 源代码根目录
    context: path.resolve(__dirname, 'src'),

    entry: {
        app:[
            './app/index.js'
        ], //入口文件
    },
    output: {
        path: path.join(__dirname, 'dist'), //输入目录
        filename: "[name].[chunkhash].js" //name就是打包出来的文件名
    },
    optimization: {
        minimize: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        unused: true,
                        warning: false,
                        drop_debugger: true
                    },
                    output: {
                        comment: false,
                        publicPath: '../'
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],

    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "css/[name].css"}),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件目录
        port: 8000, //端口
        overlay: true,
        compress: true, //服务器返回浏览器的时候是否启动gzip压缩
    }
}