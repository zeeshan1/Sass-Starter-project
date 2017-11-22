
const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function(){
    return gulp.src(['./app/assets/styles/sass/*.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/assets/styles/css'))
        .pipe(browserSync.stream());
})

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server: 'app'
    })

    gulp.watch(['./app/assets/styles/sass/**/*.scss'], ['sass']);
    gulp.watch(['./app/*.html']).on('change', browserSync.reload);
    gulp.watch(['./app/assets/scripts/**/*.js']);
})

// Default
gulp.task('default', ['serve']);