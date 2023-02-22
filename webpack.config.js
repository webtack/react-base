const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CopyWebpackPlugin = require("copy-webpack-plugin")

const distDir = path.resolve(__dirname, 'dist')
const srcDir = path.resolve(__dirname, 'src')
const srcIndex = path.resolve(srcDir, 'main.js')
const publicDir = path.resolve(__dirname, 'public')
const publicIndex = path.resolve(publicDir, 'index.html')
const assetsDir = 'assets'

const mode = process.env.NODE_ENV
const isDevelopmentMode = mode === 'development'
const isProductionMode = !isDevelopmentMode;

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
        ]
    }

    return config;
}



module.exports = {
    entry: srcIndex,
    output: {
        path: distDir,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    mode,
    target: 'web',
    optimization: makeOptimization(),
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        liveReload: true,
        compress: true,
        static: {
            directory: publicDir
        },
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: assetsDir + '/fonts/[name][ext]'
                }
            },
            {
                test: /^\/.*\.(jpe?g|png|gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: assetsDir + '/images/[name]-[hash][ext]'
                },
                parser: { dataUrlCondition: { maxSize: 15000 } }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.(s*)css$/i,
                include: srcDir,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: publicIndex,
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
            filename: `app.[hash].css`,
            // chunkFilename: '[id].css'
        })
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.jpg', '.png', '.svg', '.json'],
        alias: {
            '@': srcDir
        }
    }
}
