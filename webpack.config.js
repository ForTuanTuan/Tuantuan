const path = require('path');
const HtmlWabpackPlugin = require('html-webpack-plugin');
const HtmlPlugin = new HtmlWabpackPlugin({
    template: './src/index.html',
    filename: 'index.html'
})

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [HtmlPlugin],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    }
}