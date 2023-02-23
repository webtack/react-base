const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCss = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require("copy-webpack-plugin")

const distDir = path.resolve(__dirname, 'dist')
const srcDir = path.resolve(__dirname, 'src')
const publicDir = path.resolve(__dirname, 'public')
const publicIndex = path.resolve(publicDir, 'index.html')
const assetsDir = 'assets'

const mode = process.env.NODE_ENV
const isDevelopmentMode = mode === 'development';
const isProductionMode = !isDevelopmentMode;

function makePerfomance() {
    if(isDevelopmentMode) return undefined

    return {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: distDir,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    entry: srcDir + '/main.js',
    mode,
    target: 'web',
    devtool: isDevelopmentMode ? 'inline-source-map' : 'source-map',
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        liveReload: true,
        static: {
            directory: publicDir
        },
    },
    performance: makePerfomance(),
    module: {
        rules: [
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: assetsDir + '/[name].[hash][ext]'
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
                test:/\.(s*)css$/,
                generator: {
                    filename: '[name].[hash][ext]'
                },
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: miniCss.loader,
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
        new miniCss({
            filename: 'app.[hash].css',
        })
    ],
    resolve: {
        alias: {
            '@': srcDir
        }
    }
}
