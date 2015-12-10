var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task("styles", function() {

	return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    //.pipe(sourcemaps.init())
    .pipe(minifyCSS())
    //.pipe(sourcemaps.write("./build/app.min.css.map"))
    .pipe(rename('mki.min.css'))
    .pipe(gulp.dest('./build/'))
});

gulp.task('browserify', function () {
	return browserify('./source/app.js', { debug: true })
	.transform(babelify, {presets: ["react"]})
	.bundle()
	.pipe(source('mki.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(uglify())
    .pipe(sourcemaps.write('./'))

	.pipe(gulp.dest('./build/'));

});

gulp.task('watch', function() {
  gulp.watch('./source/**/*.js', ['browserify']);
  gulp.watch('./source/**/*.css', ['styles']);
});

gulp.task('default', ['watch', 'browserify', "styles"]);