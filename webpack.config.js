module.exports = {
    entry: "./src/frontend/index.js",
    output: {
        filename: "src/frontend/public/bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};
