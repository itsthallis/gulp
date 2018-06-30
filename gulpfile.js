
// Load plugins
const gulp = require('gulp'),
sass = require('gulp-ruby-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
notify = require('gulp-notify'),
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server = lr(),
image = require('gulp-image'),
refresh = require('gulp-refresh');

// Styles
gulp.task('styles', function () {
    return sass('src/styles/**/*.scss', {
           style: 'compressed',
        })
        .pipe(livereload())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Images
gulp.task('images', function() {
  gulp.src('src/images/*.!(db)')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
    livereload.reload();
});

// Clean
    gulp.task('clean', function() {
      return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
    });

// Html
    gulp.task('html', function() {
      gulp.src('./*.html')
        .pipe(livereload());
    });

// Watch
    gulp.task('watch', function(){
      livereload.listen();
      gulp.watch('src/**/*.scss', ['styles']);
      gulp.watch('src/images/**/*', ['images']);
      gulp.watch('./*.html', ['html']);
    });






