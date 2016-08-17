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

  gulp.task("fonts", ["clean:fonts"], function() {
    return gulp.src("**/*", {cwd: path.join(base, "src/fonts")})
      .pipe(gulp.dest(path.join(base, "dist/assets/fonts")));
  });

};
