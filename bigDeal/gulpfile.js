const {series, parallel, dest, src, watch} = require('gulp');

const del = require('del');
const jsmin = require('gulp-jsmin');
const sassCompiler = require('gulp-sass');
const gulpConcat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const ttf2woff2 = require('gulp-ttf2woff2');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');

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
        .pipe(sourcemaps.write('./'))
        .pipe(dest('src/css/'))
        .pipe(browserSync.stream());
}

const concatCSS = () => {
    return src(['src/css/vendors/*.css', 'src/css/*.css'])
        .pipe(gulpConcat('index.css'))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

const minifyStyles = () => {
    return src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(dest('dist/css/'));
}

const htmlInclude = () => {
    return src(['./src/*.html'])
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(dest('./dist'))
      .pipe(browserSync.stream());
}

const transferFiles = () => {
    src('src/*.html')
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());

    src('src/php/**/*')
        .pipe(dest('dist/php'))
        
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
      .pipe(dest('src/fonts/'))
      .pipe(dest('dist/fonts/'));
}

const minifyJs = () => {
    return src('src/js/*.js')
    .pipe(jsmin())
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream());
}

const compileJS = () => {    
    return src('src/js/*.js')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

const concatJS = () => {
    src('src/js/transfer/*.js')
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());

    return src(['src/js/vendors/*.js', 'dist/js/*.js'])
        .pipe(gulpConcat('main.js'))
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
  
    watch('./src/sass/**/*.sass', series(compileStyles, concatCSS));
    watch('./src/js/**/*.js', series(compileJS, concatJS));
    watch(['./src/img/*.svg', './src/img/**.jpg', './src/img/**.jpeg', './src/img/**.png', './src/img/**.webp'], series(transferFiles, htmlInclude));
    watch('./src/fonts/**', transferFiles);
    watch('./src/php/*', transferFiles);
    watch('./src/*.html', htmlInclude);
    watch('./src/html/*.html', htmlInclude);
  }

exports.build = series(wipe, parallel(convertFonts, series(compileStyles, concatCSS, minifyStyles), series(compileJS, minifyJs, concatJS), transferFiles), htmlInclude);
exports.default = series(wipe, parallel(convertFonts, series(compileStyles, concatCSS)), compileJS, concatJS, transferFiles, htmlInclude, watchFiles);