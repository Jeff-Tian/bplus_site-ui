module.exports = function() {
	return {
		js: {
			files: ['client/www/js/**/*.js'],
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
			files: ['client/www/*.html', 'client/www/view-partial/*.html'],
			options: {
				livereload: true
			}
		},
		css: {
			files: ['client/www/css/**/*.less'],
			tasks: ['less:development'],
			options: {
				livereload: true,
			}
		}
	}
};