const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "assets/css/[name][hash:8].css"
});
/*
* 获取文件路径
*
* */
var JsFiles = glob.sync('./src/**/**.js'),
    newEntries = {},
    config = {
        entry: newEntries,
        output: {
            filename: 'assets/js/[name][chunkhash:8].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: ""///public/static/
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ],
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.less$/,
                    use: extractLess.extract({
                        use: [
                            'css-loader',
                            'less-loader'
                        ]
                    })
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: 'wdjf-file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                outputPath: 'assets/images/'
                            }
                        }
                    ]//   d:work\learn-webpacl\src\index\index.png  /src/promotion/active20180531/index.png
                },
                {
                    test: /\.html$/,
                    use: ['html-withimg-loader']
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            extractLess
        ]
    };
JsFiles.forEach(function (f) {
    var name = /.*?\/(.*?)\.js/.exec(f)[1].replace('src/', '').replace("/js", "");//得到apps/question/index这样的文件名
    newEntries[name] = f;

    var plug = new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, './dist/pages/' + [name] + '.html'),
        chunks: [name],//需要引入的chunk，不配置就会引入所有页面的资源
        template: path.resolve(__dirname, './src/' + name + '.html'),
        inject: true       //不会自动写入编译的css和js
    });

    config.plugins.push(plug);
});

config.entry = Object.assign({}, config.entry, newEntries);//将config.entry,newEntries copy到congif.enyrt

module.exports = config;