"use strict";

const path = require("path");
const del  = require("del");

module.exports = function(gulp) {

  let base   = path.join(__dirname, "../../");

  gulp.task("clean:img", function() {
    return del([
      path.join(base, "dist/assets/img")
    ]);
  });

  gulp.task("img", ["clean:img"], function() {
    return gulp.src("**/*", {cwd: path.join(base, "src/img")})
      .pipe(gulp.dest(path.join(base, "dist/assets/img")));
  });

};
