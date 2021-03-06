module.exports = function(grunt) {
	'use strict';

	var ngrok = require('ngrok');

	require('load-grunt-tasks')(grunt);

	var config = grunt.file.readYAML('Gruntconfig.yml');

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js', 'src/**/*.js'
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
				}]},
			target2: {
				files: [{
					expand: true,
					cwd: 'src/views/css',
					src: '*.css',
					dest: 'dist/views/css',
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
					'dist/index.html': 'src/index-ready.html',
					'dist/project-2048.html': 'src/project-2048-ready.html',
					'dist/project-mobile.html': 'src/project-mobile-ready.html',
					'dist/project-webperf.html': 'src/project-webperf-ready.html',
					'dist/views/pizza.html': 'src/views/pizza-ready.html'
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'dist/js/perfmatters.min.js': ['src/js/perfmatters.js'],
					'dist/views/js/main.js': ['src/views/js/main.js']
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
		compress: {
			main: {
				options: {
					mode: 'gzip'
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*'],
					dest: 'dist/',
					ext: '.gz'
				}]
			}
		},
		processhtml: {
			dist: {
				options: {
					data: {
						title: "Mobile Optimization Project",
						message: "This is the production distribution"
					}
				},
				files: {
					'src/index-ready.html' : ['src/index.html'],
					'src/project-mobile-ready.html' : ['src/project-mobile.html'],
					'src/project-webperf-ready.html' : ['src/project-webperf.html'],
					'src/project-2048-ready.html' : ['src/project-2048.html'],
					'src/views/pizza-ready.html' : ['src/views/pizza.html']
				}

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
		'processhtml',
		'htmlmin',
		'cssmin',
		'uglify',
		'jshint']);
};