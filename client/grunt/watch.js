module.exports = function() {
	return {
		js: {
			files: ['client/www/js/**/*.js','client/config/*.js','client/serviceProxy/*.js','locales/*.js','locales/*.json'],
			options: {
				livereload: true,
				nospawn: true
			},
			tasks: ['jshint'],
		},
		api:{
			files: ['client/www/api/*.js'],
			tasks: ['jshint'],
		},
		html: {
			files: ['client/www/*.html', 'client/www/view-partial/*.html', 'client/www/mobile/*.html'],
			options: {
				livereload: true
			}
		},
		css: {
			files: ['client/www/css/**/*.less','client/www/css/transition.css'],
			tasks: ['less:development'],
			options: {
				livereload: true,
			}
		}
	}
};