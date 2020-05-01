
var path = require('path');
var SRC_DIR = path.join(__dirname, './client/src');
var DIST_DIR = path.join(__dirname, './client/dist');

module.exports = {
    entry: SRC_DIR + '/index.jsx',

    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    }
                ]

            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
              },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000' },
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                use: ['babel-loader'],
            }
        ]

    },
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      }
};