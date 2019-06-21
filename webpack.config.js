const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const plugins = [new HtmlWebpackPlugin({
    template: "client/index.html",
    filename: "index.html",
    inject: "body"
})]

//webpack.config.js
module.exports = (env) => {
    if (env === 'production') {
        plugins.push(
            new OptimizeJsPlugin({
                sourceMap: false
            })
        )
    }
    return {
        mode: env,
        entry: './client/index.js',
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'app.bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: plugins,
        devServer: {
            proxy: {
                '/socket.io': {
                    target: 'localhost:8080',
                    ws: true
                }
            }
        }
    }
};