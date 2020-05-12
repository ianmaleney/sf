const { series, parallel, watch, src, dest } = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
var postcss = require("gulp-postcss");
var cssvariables = require("postcss-css-variables");
var browserSync = require("browser-sync").create();
const sitename = "sfwp"; // set your siteName here
const username = "ianmaleney"; // set your macOS userName here

var plugins = [cssvariables({ preserve: true })];

function css() {
  return src("build/sass/style.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("./"))
    .pipe(browserSync.stream());
}

function javascript() {
  return src(["build/js/*.js"])
    .pipe(babel())
    .pipe(terser())
    .pipe(concat("scripts.js"))
    .pipe(dest("js"))
    .pipe(browserSync.stream());
}

function subscribe() {
  return src(["build/js/subscribe/*.js"])
    .pipe(babel())
    .pipe(terser())
    .pipe(concat("subscribe.js"))
    .pipe(dest("js"))
    .pipe(browserSync.stream());
}

exports.build = parallel(css, javascript, subscribe);

exports.default = function() {
  browserSync.init({
    proxy: "https://" + sitename + ".test",
    host: sitename + ".test",
    open: "external",
    port: 8000,
    https: {
      key:
        "/Users/" +
        username +
        "/.config/valet/Certificates/" +
        sitename +
        ".test.key",
      cert:
        "/Users/" +
        username +
        "/.config/valet/Certificates/" +
        sitename +
        ".test.crt"
    }
  });
  watch("./**/*.php").on("change", browserSync.reload);
  watch("./build/sass/**/*.sass", css);
  watch("./build/js/*.js", javascript);
  watch("./build/js/subscribe/*.js", subscribe);
};
