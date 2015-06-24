'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var config = grunt.file.readYAML('Gruntconfig.yml');

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
			]
		},
		pagespeed: {
			options: {
				nokey: true,
				local: "en_GB",
				threshold: 40
			},
			local: {
				options: {
					strategy: "desktop"
				}
			},
			mobile: {
				options: {
					strategy: "mobile"
				}
			}
		},
		watch: {
		}
	});

	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
		var done = this.async();
		var port = 9292;

		ngrok.connect(port, function(err, url) {
			if (err !== null) {
				grunt.fail.fatal(err);
				return done();
			}
			grunt.config.set('pagespeed.options.url', url);
			grunt.task.run('pagespeed');
			done();
		});
	});

	grunt.registerTask('default', [
		'jshint',
		'psi-ngrok'
	]);
};