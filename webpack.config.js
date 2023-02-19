const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCss = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require("copy-webpack-plugin")

const distDir = path.join(__dirname, '/dist')
const srcDir = path.join(__dirname, '/src')
const publicDir = path.join(__dirname, 'public')
const publicIndex = path.join(__dirname, 'public', 'index.html')
const assetsDir = 'assets'

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: distDir,
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',
    },
    mode,
    target: 'web',
    devServer: {
        port: 3000,
        open: false,
        hot: true,
        liveReload: true,
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
                test:/\.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: publicIndex
        }),
        new miniCss({
            filename: 'app.css',
        })
    ],
    resolve: {
        alias: {
            '@': srcDir
        }
    }
}
