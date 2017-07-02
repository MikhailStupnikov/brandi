var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	pug = require('gulp-pug'),
	prettify = require('gulp-html-prettify'),
	sass = require('gulp-sass'),
	del = require('del'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync');

gulp.task('pug', function() {
	gulp.src('app/pug/*.pug')
		.pipe(pug())
		.pipe(prettify({indent_char: '	', indent_size: 1}))
		.pipe(wiredep({
			ignorePath: '../'
		}))
		.pipe(gulp.dest('app/'));
});

gulp.task('sass', function() {
	gulp.src('app/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css/'));
});

gulp.task('bower', function() {
	gulp.src('app/index.html')
		.pipe(wiredep())
		.pipe(gulp.dest('app/'));
});

gulp.task('server', ['pug', 'sass'], function() {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('reload', ['server'], function() {
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch([
		'app/*.html',
		'app/css/*.css',
		'app/js/*.js'
	]).on('change', browserSync.reload);
});



// ========== СБОРКА ==========
gulp.task('useref', function() {
	gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss()))
		.pipe(gulp.dest('dist/'));
});

gulp.task('php', function() {
	gulp.src('app/php/*')
		.pipe(gulp.dest('dist/php'));
});

gulp.task('js', function() {
	gulp.src('app/js/main.js')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('fonts', function() {
	gulp.src(['app/fonts/*', '!app/fonts/*.css'])
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('svg', function() {
	gulp.src('app/img/icons/*')
		.pipe(gulp.dest('dist/img/icons/'));
});

gulp.task('images', function() {
	gulp.src('app/img/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true
		}))
		.pipe(gulp.dest('dist/img/'));
})

gulp.task('clean', function() {
	del.sync('dist/');
});

gulp.task('build', ['clean', 'useref', 'js', 'php', 'fonts', 'svg', 'images']);