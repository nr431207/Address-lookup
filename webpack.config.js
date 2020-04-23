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
                test: /\.jsx?/,
                include: SRC_DIR,
                use: ['babel-loader'],
            }
        ]

    },
    output: {
        filename: 'bundle.js',
        path: DIST_DIR
    }
};