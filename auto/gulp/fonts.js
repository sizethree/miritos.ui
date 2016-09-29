"use strict";

const path = require("path");
const del  = require("del");

module.exports = function(gulp) {

  let base   = path.join(__dirname, "../../");

  gulp.task("clean:fonts", function() {
    return del([
      path.join(base, "dist/assets/fonts")
    ]);
  });

  gulp.task("fonts:material", ["clean:fonts"], function() {
    let cwd = path.join(base, "bower_components/materialize/fonts");

    return gulp.src("**/*", {cwd})
      .pipe(gulp.dest(path.join(base, "dist/assets/fonts")));
  });

  gulp.task("fonts", ["fonts:material"], function() {
    let cwd = path.join(base, "src/fonts");
    return gulp.src("**/*", {cwd})
      .pipe(gulp.dest(path.join(base, "dist/assets/fonts")));
  });

};
