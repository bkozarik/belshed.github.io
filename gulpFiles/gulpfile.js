const {series, parallel, dest, src, watch} = require('gulp');

const del = require('del');
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
const sassCompiler = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const compileStyles = () => {
    return src('source/sass/**/*.sass')
        .pipe(sourcemaps.init())
            .pipe(sassCompiler({
                outputStyle: 'expanded'
              }).on('error', sassCompiler.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css/'));
}

const minifyStyles = () => {
    return src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/css/'));
}

const autoprefixStyles = () => {

    return src('dist/css/*.css')
        .pipe(sourcemaps.init())
            .pipe(autoprefixer({
                cascade: false,
            }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

const transferFiles = () => {
    src('source/**/*.html')
        .pipe(dest('dist/'));
        
    src(['source/fonts/*.woff2', 'source/fonts/*.woff'])
        .pipe(dest('dist/fonts'));

    src('source/js/*.js')
        .pipe(dest('dist/js/'))
        .pipe(jsmin())

    return src(['source/img/*.jpg', 'source/img/*.png', 'source/img/*.jpeg', 'source/img/*.svg', 'source/img/*.webp'])
        .pipe(dest('dist/img'))
        .pipe(browserSync.reload());
}

const convertFonts = () => {
    src(['source/fonts/*.woff', 'source/fonts/*.woff2'])
      .pipe(dest('dist/fonts/'));

    return src('source/fonts/*.ttf')
      .pipe(ttf2woff2())
      .pipe(dest('dist/fonts/'));
}

const minifyJS = () => {
    return src('source/js/*.js')
        .pipe(jsmin())
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

const wipe = () => {
    return del('dist/');
}

const watchFiles = () => {
    browserSync.init({
      server: {
        baseDir: "./dist"
      },
    });
  
    watch('./source/sass/**/*.sass', series(compileStyles, autoprefixStyles));
    watch('./source/js/**/*.js', minifyJS);
    watch('./source/**/*.html', transferFiles);
    watch('./source/img/**.jpg', transferFiles);
    watch('./source/img/**.jpeg', transferFiles);
    watch('./source/img/**.png', transferFiles);
    watch('./source/img/**.webp', transferFiles);
    watch('./source/fonts/**', series(convertFonts, transferFiles));
  }

exports.build = series(wipe, parallel(convertFonts, series(compileStyles, autoprefixStyles, minifyStyles), minifyJS, transferFiles));
exports.default = series(wipe, parallel(series(convertFonts, compileStyles, autoprefixStyles), transferFiles), watchFiles);