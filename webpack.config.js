var path = require('path');
var project = require("./project.json");

var paths = {  
  js: "./" + project.webroot + "/js/"
};

module.exports = {
    context: path.join(__dirname, 'scripts'),
    entry: {
        app: './app'
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
    externals: {        
        jquery: 'jQuery'
    }
};