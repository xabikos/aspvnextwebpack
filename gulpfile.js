/// <binding Clean='clean' />

var path = require('path'),
    gulp = require('gulp'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    fs = require('fs'),
    webpack = require('gulp-webpack-build'),
    project = require("./project.json");

var paths = {
      bower: "./bower_components/",
      lib: "./" + project.webroot + "/lib/"
    },
    webpackConfig = {
      useMemoryFs: true,
      progress: true
    },
    webpackOverride = {
      debug: true,
      devtool: '#source-map',
      watchDelay: 200
    },
    CONFIG_FILENAME = webpack.config.CONFIG_FILENAME;
    
gulp.task("clean", function (cb) {
  rimraf(paths.lib, cb);
});

gulp.task('development', function () {
    return gulp.src(path.join(CONFIG_FILENAME))
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides(webpackOverride))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['development'], function () {
    gulp.watch(path.join('./scripts', '**/*.*')).on('change', function (event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve('./scripts') })
                .pipe(webpack.closest(CONFIG_FILENAME))
                .pipe(webpack.configure(webpackConfig))
                .pipe(webpack.overrides(webpackOverride))
                .pipe(webpack.watch(
                    function (err, stats) {
                        gulp.src(this.path, { base: this.base })
                            .pipe(webpack.proxy(err, stats))
                            .pipe(webpack.format({
                                verbose: true,
                                version: false
                            }))
                            .pipe(gulp.dest('./aspvnextwebpack'));
                    }
                ));
        }
    });
});

gulp.task('production', function () {
    
    var jsFilter = filter('**/*.js');
    var cssFilter = filter('**/*.css');
    
    return gulp.src(path.join(CONFIG_FILENAME))
        .pipe(webpack.configure(webpackConfig))
        .pipe(webpack.overrides({
            debug: false
        }))
        .pipe(webpack.compile())
        .pipe(webpack.format({
            version: false,
            timings: true
        }))
        .pipe(webpack.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(minifycss())
        .pipe(cssFilter.restore())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest('.'));
});

gulp.task("copy", ["clean"], function () {
  var bower = {
    "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
    "bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
    "hammer.js": "hammer.js/hammer*.{js,map}",
    "jquery": "jquery/jquery*.{js,map}",
    "jquery-validation": "jquery-validation/jquery.validate.js",
    "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"
  };

  for (var destinationDir in bower) {
    gulp.src(paths.bower + bower[destinationDir])
      .pipe(gulp.dest(paths.lib + destinationDir));
  }
});