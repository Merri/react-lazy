var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/dist/umd/',
        filename: 'react-lazy.js',
        publicPath: '/build/',
        library: 'ReactLazy',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [
                    '/demo/',
                    '/dist/',
                    '/node_modules/',
                    '/style/',
                    '/test/',
                ],
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin,
        new webpack.optimize.UglifyJsPlugin
    ],
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            },
            'react-dom/server': {
                root: 'ReactDOMServer',
                commonjs2: 'react-dom/server',
                commonjs: 'react-dom/server',
                amd: 'react-dom/server'
            }
        }
    ],
}
