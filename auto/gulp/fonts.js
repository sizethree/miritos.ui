"use strict";

const path = require("path");
const del  = require("del");
const loc  = require("../../locations");

module.exports = function(gulp) {
  let dest = path.join(loc.dist.app, "assets/fonts");

  gulp.task("clean:fonts", function() {
    return del([dest]);
  });

  gulp.task("fonts:material", ["clean:fonts"], function() {
    let cwd = path.join(loc.base, "bower_components/materialize/fonts");

    return gulp.src("**/*", {cwd})
      .pipe(gulp.dest(dest));
  });

  gulp.task("fonts", ["fonts:material"], function() {
    let cwd = path.join(loc.base, "src/fonts");
    return gulp.src("**/*", {cwd})
      .pipe(gulp.dest(dest));
  });

};
