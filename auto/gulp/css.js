"use strict";

const path = require("path");
const del  = require("del");
const sass = require("gulp-sass");

module.exports = function(gulp) {

  let base         = path.join(__dirname, "../../");
  let destination  = path.join(base, "dist/assets/css");
  let source       = [path.join(base, "src/sass/app.sass")];
  let includePaths = [
    path.join(base, "bower_components")
  ];

  gulp.task("clean:css", function() {
    return del([destination]);
  });

  gulp.task("css:release", ["clean:css"], function() {
    let outputStyle = "compressed";
    return gulp.src(source)
      .pipe(sass({outputStyle, includePaths}).on("error", sass.logError))
      .pipe(gulp.dest(destination));
  });

  gulp.task("css", ["clean:css"], function() {
    let outputStyle = "expanded";
    return gulp.src(source)
      .pipe(sass({outputStyle, includePaths, sourceComments: true}).on("error", sass.logError))
      .pipe(gulp.dest(destination));
  });

};
