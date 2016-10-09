var gulp = require('gulp')
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var pug = require('gulp-pug');

// Server dev
gulp.task('serve', function () {
	browserSync.init({
		server: {
			baseDir: './' //sirviendo ficheros
		}
	})
})

// Process css
gulp.task('sass', function () {

	return gulp
		.src('./src/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./assets/css'))
		.pipe(browserSync.stream()) // refrescar navegador
})

function compile() {
	var bundle = browserify('./src/index.js', {debug: true}) /*ruta de archivo que browserify procesara*/

	bundle
		.bundle()  /*genera ese bundle*/
		.on('error', function (err) {console.log(err); this.emit('end')	})
		.pipe(source('index.js')) /* transformacion de lo que nos mando bundle() de browserify para que lo entienda gulp*/
		.pipe(gulp.dest('./assets/js'))
}

gulp.task('build', function() {
	return compile();
});

// Watch changes
gulp.task('watch', function() {
	gulp.watch('./src/*.js', ['build'])
	gulp.watch('./src/*.scss', ['sass'])
	gulp.watch('./*.html').on('change', browserSync.reload)  // ejecuta function cada vez que escuche cambios
})

gulp.task('default', ['watch', 'serve'])