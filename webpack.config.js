const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './dist/module/index.js',
    output: {
        path: __dirname + '/dist/umd/',
        filename: 'react-lazy.js',
        publicPath: '/build/',
        library: 'ReactLazy',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: [
                    '/demo/',
                    '/dist/',
                    '/node_modules/',
                    '/style/',
                    '/test/',
                ],
                query: {
                    presets: [['es2015', { loose: true, modules: false }], 'stage-0', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: /^$/,
            compress: {
                warnings: false
            },
            mangle: true,
            output: {
                comments: false,
                semicolons: false
            },
            sourceMap: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
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
            },
            'prop-types': {
                root: 'PropTypes',
                commonjs2: 'prop-types',
                commonjs: 'prop-types',
                amd: 'prop-types'
            }
        }
    ],
}
