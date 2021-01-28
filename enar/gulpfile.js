const {series, parallel, dest, src, watch} = require('gulp');

const del = require('del');
const jsmin = require('gulp-jsmin');
const sassCompiler = require('gulp-sass');
const gulpConcat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const compileStyles = () => {
    return src('src/sass/**/*.sass')
        .pipe(sourcemaps.init())
            .pipe(sassCompiler({
                outputStyle: 'expanded'
            }).on('error', sassCompiler.logError))
            .pipe(autoprefixer({
                cascade: false,
            }))
            .pipe(dest('src/css/'))
            .pipe(gulpConcat('main.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/css/'))
        .pipe(dest('src/css/'))
        .pipe(browserSync.stream());
}

const minifyStyles = () => {
    return src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/css/'));
}

const transferFiles = () => {
    src('src/*.html')
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());
    
    src('src/css/vendors/*.css')
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
        
    src(['src/fonts/*.woff2', 'src/fonts/*.woff'])
        .pipe(dest('dist/fonts'));
        
    src('src/video/*')
        .pipe(dest('dist/video'))
        .pipe(browserSync.stream());

    return src('src/img/*')
        .pipe(dest('dist/img'))
        .pipe(browserSync.stream());
}

const convertFonts = () => {
    src(['src/fonts/*.woff', 'src/fonts/*.woff2'])
      .pipe(dest('dist/fonts/'));

    return src('src/fonts/*.ttf')
      .pipe(ttf2woff2())
      .pipe(dest('dist/fonts/'));
}

const minifyJS = () => {
    
    src('src/js/vendors/*.js')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());

    return src('src/js/*.js')
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
  
    watch('./src/sass/**/*.sass', compileStyles);
    watch('./src/js/*.js', minifyJS);
    watch(['./src/*.html', './src/img/*.svg', './src/img/**.jpg', './src/img/**.jpeg', './src/img/**.png', './src/img/**.webp'], transferFiles);
    watch('./src/fonts/**', transferFiles);
  }

exports.build = series(wipe, parallel(convertFonts, series(compileStyles, minifyStyles), minifyJS, transferFiles));
exports.default = series(wipe, parallel(convertFonts, compileStyles), transferFiles, minifyJS, watchFiles);