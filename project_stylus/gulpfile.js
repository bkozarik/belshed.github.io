var gulp         = require('gulp'),
	browserSync  = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	stylus       = require('gulp-stylus'),

	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),

	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	uncss = require('gulp-uncss'),
	plumber = require('gulp-plumber'),
	svgSprite = require('gulp-svg-sprite');


	const del = require('del'),
	uglify = require('gulp-uglify');



gulp.task('mytask', function() {
	console.log ('hi its me');
})


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'source'
		},
		notify: false
	});
})

gulp.task('styl', function() {
	return gulp.src('source/styl/*.styl')
		.pipe(plumber())
		.pipe(stylus({
			linenos: false
		}))
		.pipe(autoprefixer([
			'Android 2.3',
			'Android >= 4',
			'Chrome >= 20',
			'Firefox >= 24',
			'Explorer >= 8',
			'iOS >= 6',
			'Opera >= 12',
			'Safari >= 6'
		]))
		.pipe(gulp.dest('source/css/'));

});


gulp.task('watch', ['browser-sync'] , function() {
	gulp.watch("source/styl/*.styl", ['styl'], browserSync.reload);
	gulp.watch('source/*.html', browserSync.reload);
	gulp.watch('source/css/**/*.css', browserSync.reload);
	gulp.watch('source/js/**/*.js', browserSync.reload);
})





gulp.task('concat-js', function() {
	del.sync(['source/js/plagins.js']);
    return gulp.src(['source/js/*.js', '!source/js/scripts.js', '!source/js/source5.js', '!source/js/jquery-3.2.1.min.js'])
        .pipe(concat('plagins.js'))
        .pipe(uglify())
        .pipe(gulp.dest('source/js'))

});

gulp.task('concat-css', function() {
	del.sync(['source/css/plagins.css']);
    return gulp.src(['source/css/*.css', ,'!source/css/bootstrap-grid.min.css', '!source/css/style.css',  '!source/css/icons.css', '!source/css/style-mobile.css', '!source/css/style-tablet.css'])
        .pipe(concat('plagins.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('source/css'))
});

gulp.task('concat', ['concat-js','concat-css'], function() {});





gulp.task('image', function () {
	return gulp.src(['source/img/*','source/img/*/*'])
		.pipe(plumber())
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))

		.pipe(gulp.dest('dist/img/'));
});


/*
gulp.task('image', function () {
	return gulp.src('source/img/*')

		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img/'));
});
*/



gulp.task('build-js', function() {
	return gulp.src(['source/js/plagins.js', 'source/js/scripts.js', 'source/js/source5.js', 'source/js/jquery-3.2.1.min.js'])
			.pipe(gulp.dest('dist/js'))
})

gulp.task('build-css', function() {
	return gulp.src(['source/css/plagins.css','source/css/bootstrap-grid.min.css', 'source/css/style.css',  'source/css/icons.css', 'source/css/style-mobile.css', 'source/css/style-tablet.css', , 'source/css/all.css'])
        .pipe(gulp.dest('dist/css'))
})
gulp.task('build-fonts', function() {
	return gulp.src(['source/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
})
gulp.task('build-source', function() {
	return gulp.src(['source/*.html'])
        .pipe(gulp.dest('dist'))
})


gulp.task('clear' , function() {del.sync(['dist']);})

gulp.task('build', ['clear', 'image','build-js', 'build-css', 'build-fonts', 'build-source'], function() {
})

gulp.task('svg', function () {
    return gulp.src('source/sprite/*.svg') // svg files for sprite
        .pipe(svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"  //sprite file name
                    }
                },
            }
        ))
        .pipe(gulp.dest('source/img/'));
});
