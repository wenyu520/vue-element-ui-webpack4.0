const path = require('path');
// 合并配置文件
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.base.js');
// 打包之前清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 压缩CSS插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 压缩CSS和JS代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin'); // 引入 PWA 插件
const productionGzipExtensions = ['js', 'css']
function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
}
const matchVendorsChunk = /vue|vue-router|axios|vuex/
module.exports = merge(common, {
    /*optimization: {
        // 分离chunks
        splitChunks: {
            chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial', // 只打包初始时依赖的第三方
                },
            },
        },
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                cache: true,
                parallel: true,
                sourceMap: false, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },*/
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         // you can specify a publicPath here
                    //         // by default it use publicPath in webpackOptions.output
                    //         publicPath: '../',
                    //     },
                    // },
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',

                    // 'postcss-loader',
                    'sass-loader'
                ],
            }/*,
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            }*/,
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 5000,
                            name: 'imgs/[hash].[ext]',
                        },
                    },
                    // 图片压缩
                    {
                        loader: 'img-loader',
                        options: {
                            //   bypassOnDebug: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true, // false 则不压缩
        // chunk for the webpack runtime code and chunk manifest
        minimizer: [
            new OptimizeCSSPlugin({
                parser: require('postcss-safe-parser'),
                discardComments: {
                    removeAll: true
                }
            }),

            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2
                    },
                    mangle: {
                        safari10: true
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true
                    }
                },
                parallel: true,
                cache: true,
                sourceMap: false
            })
        ],
        runtimeChunk: {
            name: 'manifest'
        },
        // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
        splitChunks: {
            cacheGroups: {
                // default: false, // 禁止默认的优化
                vendors: {
                    test (chunk) {
                        return matchVendorsChunk.test(chunk.context)
                    },
                    name: 'vendors',
                    chunks: 'all'
                },
                commons: {
                    // 抽取 demand-chunk 下的公共依赖模块
                    name: 'commons',
                    minChunks: 3, // 在chunk中最小的被引用次数
                    chunks: 'async',
                    minSize: 0 // 被提取模块的最小大小
                }
            }
        }
    },

    plugins: [

    /*    new CleanWebpackPlugin({
            // Simulate the removal of files
            //
            // default: false
            dry: false,

            // Write Logs to Console
            // (Always enabled when dry is true)
            //
            // default: false
            verbose: false,

            // Automatically remove all unused webpack assets on rebuild
            //
            // default: true
            cleanStaleWebpackAssets: false,

            // Do not allow removal of current webpack assets
            //
            // default: true
            protectWebpackAssets: false,

            // **WARNING**
            //
            // Notes for the below options:
            //
            // They are unsafe...so test initially with dry: true.
            //
            // Relative to webpack's output.path directory.
            // If outside of webpack's output.path directory,
            //    use full path. path.join(process.cwd(), 'build/!**!/!*')
            //
            // These options extend del's pattern matching API.
            // See https://github.com/sindresorhus/del#patterns
            //    for pattern matching documentation

            // Removes files once prior to Webpack compilation
            //   Not included in rebuilds (watch mode)
            //
            // Use !negative patterns to exclude files
            //
            // default: ['**!/!*']
            cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns

            // Removes files after every build (including watch mode) that match this pattern.
            // Used for files that are not created directly by Webpack.
            //
            // Use !negative patterns to exclude files
            //
            // default: []
            cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],

            // Allow clean patterns outside of process.cwd()
            //
            // requires dry option to be explicitly set
            //
            // default: false
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }),*/
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
        // 配置 PWA
        // new WorkboxPlugin.GenerateSW({
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
    ],
    mode: 'production',
    output: {
        // filename: 'js/[name].[contenthash].js',
        // path: path.resolve(__dirname, '../dist'),
        path: resolve('../dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: 'chunks/[name].[contenthash].js',
    },
});
