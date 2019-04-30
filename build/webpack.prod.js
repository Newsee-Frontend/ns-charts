var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'ns-charts': './src/ns-charts.js'
    },
    output: {
        path: path.resolve('./lib'),
        library: 'ns-charts',
        filename: '[name].min.js'
    },
    performance: false,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ]
    }
};
