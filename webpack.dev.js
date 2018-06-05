const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "assets/css/[name].css"
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
            filename: 'assets/js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: ""///public/static/
        },
        module: {
            rules: [
                {
                    test: /\.(less|css)$/,
                    use: extractLess.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            },
                            'less-loader'
                        ]
                    })
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use: [
                        {
                            loader: 'wdjf-file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                outputPath: 'assets/images/'
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: ['html-withimg-loader']
                }
            ]
        },
        plugins: [
            extractLess
        ],
        watchOptions: {
            ignored: /node_modules/, //忽略不用监听变更的目录
            aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
            poll: 1000 //每秒询问的文件变更的次数
        }
    };
JsFiles.forEach(function (f) {
    var name = /.*?\/(.*?)\.js/.exec(f)[1].replace('src/', '').replace("/js", "");//得到apps/question/index这样的文件名
    newEntries[name] = f;

    var plug = new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, './dist/pages/' + [name] + '.html'),
        chunks: [name],//需要引入的chunk，不配置就会引入所有页面的资源
        template: path.resolve(__dirname, './src/' + name + '.html'),
        inject: true,       //不会自动写入编译的css和js
        minify: {
            removeAttributeQuotes: true//压缩 去掉引号
        }
    });

    config.plugins.push(plug);
});

config.entry = Object.assign({}, config.entry, newEntries);//将config.entry,newEntries copy到congif.enyrt

module.exports = config;