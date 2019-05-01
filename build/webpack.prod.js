var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'nsCharts': './src/ns-charts.js',
        // 'gcx': './test/gcx.js'
    },
    output: {
        path: path.resolve('./lib'),
        library: 'nsCharts',
        libraryTarget: 'umd',
        filename: '[name].min.js',
        umdNamedDefine: true,

        // path: path.resolve('./lib'),
        // library: 'gcx',
        // filename: '[name].min.js'
    },
    performance: false,
    externals: {
        echarts: {
            root: 'echarts',
            commonjs: 'echarts',
            commonjs2: 'echarts',
            amd: 'echarts'
        }
    },
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
