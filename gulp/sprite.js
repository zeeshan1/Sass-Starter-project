var gulp = require('gulp'),
	rename = require('gulp-rename')
	svgSprite = require('gulp-svg-sprite'),
	del = require('del');

	var config = {
		mode: {
			css: {
				sprite: 'svg/sprite.svg',
				render: {
					css: {
						template: './gulp/sprite.css'
					}
				}
			}
		}
	}

	gulp.task('beginClean', function(){
		return	del(['./app/temp', './app/assets/images/sprites'])
	})

	gulp.task('createSprite', ['beginClean'], function(){
		return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))

		.pipe(gulp.dest('./app/temp/sprite/'))
	});

	gulp.task('copySpriteGraphic',['createSprite'], function(){
		return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'))
	});

	gulp.task('copySpriteCSS', ['createSprite'], function(){
		return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/sass/module'))
	});

	gulp.task('endClean', ["copySpriteGraphic","copySpriteCSS"], function(){
		return del('./app/temp');
	});
	gulp.task('icons', ["beginClean","createSprite", "copySpriteGraphic","copySpriteCSS", 'endClean' ])

