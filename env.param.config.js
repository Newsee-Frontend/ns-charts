'use strict';
const path = require('path');

module.exports = {
    dev: {
        entry: {
            app: './docs/SPA/src/main.js',
        },
        templateSPA: './docs/SPA/index.html',
        staticPath: './docs/SPA/static',
        port: 8086,
        useEslint: false
    },
    plugin: {
        // entry config
        entry: "./src/ns-charts.js",

        // Output config
        outputLibrary: "nsCharts",//output file/Library name
        libraryTarget: "umd",
        filename: "nsCharts.min.js",
        isMinify: true,//是否压缩

        // Paths
        assetsPublicPath: "./",
        assetsRoot: path.resolve("./lib"),
        assetsSubDirectory: "static",
        staticPath: "./static"
    },
    base: {
        mockPath: './docs/SPA/mock',

        JSBabelInclude: ['src', 'mock', 'test', 'docs'],

        prettier: {
            switch: true,
            files: [
                "mock/**/*.js",
                ".postcssrc.js",
                "env.config.js",
                "env.param.config.js",
                ".eslintrc.js"
            ]
        }
    }
};
