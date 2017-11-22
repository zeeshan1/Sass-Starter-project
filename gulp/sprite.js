var gulp = require('gulp'),
	rename = require('gulp-rename')
	svgSprite = require('gulp-svg-sprite');

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

	gulp.task('createSprite', function(){
		return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))

		.pipe(gulp.dest('./app/temp/sprite/'))
	});

	gulp.task('copySpriteGraphic',['createSprite'], function(){
		return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'))
	})

	gulp.task('copySpriteCSS', ['createSprite'], function(){
		return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/sass/module'))
	});
	gulp.task('icons', ["createSprite", "copySpriteGraphic","copySpriteCSS" ])

