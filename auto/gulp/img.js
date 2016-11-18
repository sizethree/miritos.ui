"use strict";

const path = require("path");
const del  = require("del");
const loc  = require("../../locations");

module.exports = function(gulp) {
  gulp.task("clean:img", function() {
    return del([path.join(loc.dist.app, "assets/img")]);
  });

  gulp.task("img", ["clean:img"], function() {
    return gulp.src("**/*", {cwd: path.join(loc.base, "src/img")})
      .pipe(gulp.dest(path.join(loc.dist.app, "assets/img")));
  });

};
