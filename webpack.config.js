var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        path: path.resolve(paths.js),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            // Transform ES6 code to ES5 using Babel
            { test: /\.js$/, loader: 'babel-loader' },
            // Transform the scss syntax to css and extract it to a separate file
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')}
        ],
    },
    plugins:[
        new ExtractTextPlugin('../css/[name].css')    
    ],
    externals: {        
        jquery: 'jQuery'
    }
};