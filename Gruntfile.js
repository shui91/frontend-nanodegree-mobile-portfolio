module.exports = function(grunt) {
	'use strict';

	var ngrok = require('ngrok');

	require('load-grunt-tasks')(grunt);

	var config = grunt.file.readYAML('Gruntconfig.yml');

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js', 'src/**/*.js', 'dist/**/*.js'
			]
		},
		pagespeed: {
			options: {
				nokey: true,
				locale: "en_GB",
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
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: '*.css',
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyCSS: true,
				},
				files: {
					'dist/index.html': 'src/index.html',
					'dist/project-2048.html': 'src/project-2048.html',
					'dist/project-mobile.html': 'src/project-mobile.html',
					'dist/project-webperf.html': 'src/project-webperf.html',
					'dist/views/pizza.html': 'src/views/pizza.html'
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/js/app.min.js': ['src/js/perfmatters.js']
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'src/', 
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/',
				}]
			}
		},
		watch: {
			scripts: {
				files: ['dist/js/*.js', 'src/js/*.js'],
				tasks: ['jshint']
			},
			src: {

			}
		}
	});

	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
		var done = this.async();
		var port = 8080;

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
		'psi-ngrok',
		'htmlmin',
		'cssmin',
		'uglify',
		'imagemin'
	]);

	grunt.registerTask('minify', [
		'htmlmin',
		'cssmin',
		'uglify',
		'jshint']);
};