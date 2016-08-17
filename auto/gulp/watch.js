"use strict";

const path  = require("path");

module.exports = function(gulp) {

  const base     = path.join(__dirname, "../../");
  const js_dir   = path.join(base, "src/js");
  const sass_dir = path.join(base, "src/sass");
  const html_dir = path.join(base, "src/html");

  gulp.task("watch", ["default"], function() {
    gulp.watch(["**/*.js", "**/*.jsx"], {cwd: js_dir}, ["js"]);
    gulp.watch(["**/*.jade"], {cwd: html_dir}, ["html"]);
    return gulp.watch(["**/*.sass"], {cwd: sass_dir}, ["sass"]);
  });

};
