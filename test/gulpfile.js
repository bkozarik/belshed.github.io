let {series, parallel, src, dest, watch} = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let livereload = require('gulp-livereload');
let cleanCSS = require('gulp-clean-css');
let sassCompiler = require('gulp-sass');
let rename = require('gulp-rename');
let clean = require('gulp-clean');
let reload = require('browser-sync').create();

const compileSass = () => {
    return src('./sass/*.sass')
            .pipe(sassCompiler().on('error', sassCompiler.logError))
            .pipe(dest('./css/'));
}

const browserSyncInit = (cb) => {
    reload.init({
        server: {
          baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });

    watch("./*.html").on('change', reload.reload);
    watch("./style/*.css").on('change', reload.reload);
    watch("./js/*.js").on('change', reload.reload);
}

const prefixCss = () => {
    return src('./css/*.css')
            .pipe(autoprefixer())
            .pipe(dest('./css'))
            .pipe(reload.stream());
}

const watchSass = () => {
    watch('./sass/*.sass', series(parallel(deleteOldCss, compileSass), minifyCss, prefixCss));
}

const deleteOldCss = () => {
    return src('./css/*.css', {read: false})
            .pipe(clean({force: true}))
            .pipe(dest('./css/'));
}

const minifyCss = () => {
    return src('./css/*.css')
            .pipe(cleanCSS())
            .pipe(rename({
                extname: ".min.css"
            }))
            .pipe(dest('./css/'));
}

const defaultFunc = () =>{
    return parallel(watchSass, browserSyncInit);
}

exports.default = defaultFunc();