const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin")

const distDirPath = path.resolve(__dirname, 'dist')

const srcDirName = 'src'
const srcDir = path.resolve(__dirname, srcDirName)

const publicDirPath = path.resolve(__dirname, 'public')

const mode = process.env.NODE_ENV
const isDevelopmentMode = mode === 'development'
const isProductionMode = !isDevelopmentMode

const staticRegexp = /\.(jpe?g|png|gif|svg|ico)$/
const fontRegexp = /\.(woff|woff2|ttf|otf|eot)$/

function makePerformance() {
    if(isDevelopmentMode) return undefined

    return {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}

function makeOptimization() {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    };

    if (isProductionMode) {
        config.minimizer = [
            new TerserWebpackPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin()
        ];
    }

    return config;
}

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: distDirPath,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    entry: srcDir + '/main.js',
    mode,
    target: 'web',
    devtool: isDevelopmentMode ? 'inline-source-map' : 'source-map',
    optimization: makeOptimization(),
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        liveReload: true,
        static: {
            directory: publicDirPath
        },
    },
    performance: makePerformance(),
    module: {
        rules: [
            {
                test: fontRegexp,
                type: 'asset/resource',
                generator: {
                    filename: content => {
                        let filename = content.filename
                        filename = filename.replace('node_modules', 'fonts')
                        filename = filename.replace('@', '')

                        return filename
                    }
                }
            },
            {
                test: staticRegexp,
                type: 'asset/resource',
                exclude: /node_modules/,
                generator: {
                    filename: content => {
                        let filename = content.filename.replace(`${srcDirName}/`, '')
                        filename = filename.replace(staticRegexp, '.[fullhash][ext]')

                        return filename
                    }
                },
                parser: { dataUrlCondition: { maxSize: 15000 } }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test:/\.(s*)css$/,
                generator: {
                    filename: '[name].[fullhash][ext]'
                },
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: publicDirPath + '/index.html',
            minify: {
                collapseWhitespace: isProductionMode,
                removeComments: isProductionMode,
                removeRedundantAttributes: isProductionMode,
                removeScriptTypeAttributes: isProductionMode,
                removeStyleLinkTypeAttributes: isProductionMode,
                useShortDoctype: isProductionMode,
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'app.[fullhash].css',
        })
    ],
    resolve: {
        alias: {
            '@': srcDir
        }
    }
}
