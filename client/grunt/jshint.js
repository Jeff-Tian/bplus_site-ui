module.exports = function() {
	return {
		scripts: ['<%= config.src %>/widgets/**/*.js'],
		options: {
			ignores: [
			]
		}
	}
};