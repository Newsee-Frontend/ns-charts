'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
    dev: {
        entry: {
            app: './docs/SPA/src/main.js',
        },
        // Paths
        assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsSubDirectory: 'static',// 编译输出的二级目录
        proxyTable: {},
        contentBase: path.join(__dirname, '../docs/SPA/dist'),       //"./dist/"
        host: 'localhost',
        port: 8002,
        inline: true,
        autoOpenBrowser: true,
        errorOverlay: true,
        hot: true,
        quiet: true,
        /**
         * Source Maps
         */
        devtool: 'cheap-module-eval-source-map',
        notifyOnErrors: true,
        poll: false,
        useEslint: true,
        showEslintErrorsInOverlay: false,
        usePostCSS: true,
        /** Source Maps */
        devCssSourceMap: false,
        devJsSourceMap: false,
        cacheBusting: true,
    },
    plugin: {
        entry: {
            app: './src/ns-charts.js',
        },
        outputFilename: 'nsCharts',
        outputLibrary: 'nsCharts',
        // Paths
        assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
        assetsRoot: path.resolve(__dirname, './lib'),// 编译输出的静态资源路径
        assetsSubDirectory: 'static',// 编译输出的二级目录
        devtool: '#source-map',
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report || false,
        extract: true,//是否需要分离出js中的css代码,然后分别进行打包
        usePostCSS: true,//补全css代码的兼容性前缀
        useEslint: false,
        /** Source Maps */
        prodCssSourceMap: false,// 是否开启 cssSourceMap
        prodJsSourceMap: false,// 是否开启 jsSourceMap
        cacheBusting: true
    },
    base: {
        JSinclude: ['src', 'docs', 'test'],
        templateSPA: './docs/SPA/index.html',
        staticPath: './docs/SPA/static',
        mockPath: './docs/SPA/mock',
        sassResources: [],
        aliasPath: [
            {name: '@', path: path.resolve('./docs/SPA/src')},
        ],
        prettier: {
            switch: false,
            files: [
                'src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}',
                'docs/**/*.{js,ts,json}'
            ]
        },
    }
};
