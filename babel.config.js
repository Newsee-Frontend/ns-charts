const useESModules = process.env.BABEL_MODULE !== 'commonjs';

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                modules: useESModules ? false : 'commonjs',
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 5 versions",
                      "ie >= 8"
                    ]
                }
            }
        ],
    ],
    "plugins": [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-transform-object-assign",
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-proposal-class-properties", {"loose": true}],
        "@babel/plugin-syntax-jsx",
        "@vue/babel-plugin-transform-vue-jsx",
        "jsx-v-model"
    ],
    "env": {
        "development": {
            "plugins": [
                "dynamic-import-node"
            ]
        }
    }
};
