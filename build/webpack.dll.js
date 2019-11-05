const webpack = require('webpack')
const path = require('path')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const DLL = '../src/dll'
module.exports = {
    entry: {
        vendor: [
            'axios',
            'echarts',
            'xlsx',
            'lodash',
            'jquery',
            'jqueryui',
            'quill'
        ],
        vue: [
            'vue/dist/vue.esm.js',
            'vuex',
            'vuex-along',
            'vuedraggable',
            'vuescroll',
            'vue-router',
            'element-ui'
        ],
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, DLL),
        library: '[name]_[hash]',
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: true,
        }),
        new CleanWebpackPlugin({
            root: path.join(__dirname, DLL),
            verbose:false,
            cleanOnceBeforeBuildPatterns: []
            // exclude:['img']//不删除img静态资源
        }),
        // 使用插件 DllPlugin
        new webpack.DllPlugin({
            path: path.join(__dirname, DLL, '[name].manifest.json'),
            // This must match the output.library option above
            name: '[name]_[hash]',
            context: __dirname
        }),
        /* 多核压缩代码 */
  /*      new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS:{
                output: {
                    comments: false
                },
                warnings: false,
                compress: {
                    drop_debugger: true,
                    drop_console: true
                }

            }
        }),*/
        // new BundleAnalyzerPlugin({
        // 	analyzerMode: 'static'
        // }),
    ]
};
