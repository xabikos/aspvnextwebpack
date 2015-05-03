var path = require('path');
var project = require("./project.json");

var paths = {  
  js: "./" + project.webroot + "/js/"
};

module.exports = {
    context: path.join(__dirname, 'scripts'),
    entry: {
        app: './loremCreator'
    },
    output: {
        path: paths.js,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
          // Transform ES6 code to ES5 using Babel
          { test: /\.js$/, loader: 'babel-loader' }
        ],
    },
    resolve: {
        // Declares the root folder used for aliases
        root: path.resolve(__dirname, './scripts'),
        alias: {
            'loremCreator' : 'loremCreator'  
        },        
        extensions: ['.js']
    },
    externals: {        
        jquery: 'jQuery'
    }
};