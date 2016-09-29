"use strict";

const path    = require("path");
const del     = require("del");
const concat  = require("gulp-concat");
const babel   = require("gulp-babel");
const helpers = require("gulp-babel-external-helpers");
const uglify  = require("gulp-uglify");
const rjs     = require("gulp-requirejs-optimize");

module.exports = function(gulp) {

  const base   = path.join(__dirname, "../../");
  const bundle = path.join(base, "dist/assets/vendors/bundle.js");

  function bower(lib_path) {
    return path.join(base, "bower_components", lib_path);
  }

  let vendors = [
    bower("q/q.js"),
    bower("page/page.js"),
    bower("flyby/flyby.js"),
    bower("react/react.js"),
    bower("react/react-dom.js"),
    bower("requirejs/require.js")
  ];

  vendors.release = [
    bower("q/q.js"),
    bower("page/page.js"),
    bower("flyby/flyby.js"),
    bower("react/react.min.js"),
    bower("react/react-dom.min.js"),
    bower("requirejs/require.js")
  ];

  let presets = ["es2015", "react"];
  let plugins = ["external-helpers", "transform-es2015-modules-amd"];

  gulp.task("clean:js", function() {
    return del([bundle]);
  });

  gulp.task("js:vendors:release", function() {
    return gulp.src(vendors.release)
      .pipe(concat("bundle.js"))
      .pipe(gulp.dest(path.dirname(bundle)))
      .pipe(uglify())
      .pipe(gulp.dest(path.dirname(bundle)));
  });

  gulp.task("js:vendors", function() {
    return gulp.src(vendors)
      .pipe(concat("bundle.js"))
      .pipe(gulp.dest(path.dirname(bundle)));
  });

  gulp.task("js:babel", ["clean:js"], function() {
    return gulp.src(["**/*.js", "**/*.jsx"], {cwd: path.join(base, "src/js")})
      .pipe(babel({presets, plugins}))
      .pipe(helpers("helpers.js"))
      .pipe(gulp.dest(path.join(base, "tmp/js")));
  });

  gulp.task("js:copy", ["js:babel", "js:vendors"], function() {
    return gulp.src("**/*.js", {cwd: path.join(base, "tmp/js")})
      .pipe(gulp.dest(path.join(base, "dist/assets/js")));
  });

  gulp.task("js:copy:release", ["js:babel", "js:vendors"], function() {
    return gulp.src("**/*.js", {cwd: path.join(base, "tmp/js")})
      .pipe(gulp.dest(path.join(base, "dist/assets/js")))
      .pipe(uglify())
      .pipe(gulp.dest(path.join(base, "dist/assets/js")));
  });

  gulp.task("js:rjs", ["js:copy"], function() {
    return gulp.src(["main.js"], {cwd: path.join(base, "tmp/js")})
      .pipe(rjs({optimize: "none"}))
      .pipe(gulp.dest(path.join(base, "dist/assets/js")));
  });

  gulp.task("js:rjs:release", ["js:copy:release"], function() {
    return gulp.src(["main.js"], {cwd: path.join(base, "tmp/js")})
      .pipe(rjs({optimize: "uglify"}))
      .pipe(gulp.dest(path.join(base, "dist/assets/js")));
  });

  gulp.task("js", ["js:vendors", "js:rjs"]);

  gulp.task("js:release", ["js:vendors:release", "js:rjs:release"]);

};
