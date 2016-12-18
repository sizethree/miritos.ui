"use strict";

const path = require("path");
const del  = require("del");
const pug  = require("gulp-pug");
const loc  = require("../../locations");

module.exports = function(gulp) {

  let locals = {
    API_HOME: process.env["API_PROXY_HOME"]
  };

  gulp.task("clean:html", function() {
    return del([
      path.join(loc.dist.app, "index.html")
    ]);
  });

  gulp.task("html:release", ["clean:html"], function() {
    return gulp.src(path.join(loc.base, "src/html/index.jade"))
      .pipe(pug({locals, pretty: false}))
      .pipe(gulp.dest(loc.dist.app));
  });

  gulp.task("html", ["clean:html"], function() {
    return gulp.src(path.join(loc.base, "src/html/index.jade"))
      .pipe(pug({locals, pretty: true}))
      .pipe(gulp.dest(loc.dist.app));
  });

};
