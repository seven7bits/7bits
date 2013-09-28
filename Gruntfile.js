module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		client_js: ['public/javascripts/*.js', 'public/javascripts/**/*.js', '!public/javascripts/libs/*.js'],
		server_js: ['*.js', 'src/*.js'],
		jade: ['views/*.jade'],
		// uglify: {
		// 	build: {
		// 		src: '<%= javascripts %>',
		// 		dest: 'public/publish/main.js'
		// 	}
		// },
		// concat: {
		// 	dist: {
		// 		src: ['<%= javascripts %>'],
		// 		dest: 'public/publish/main.js'				
		// 	}
		// },
		jshint: {
			client: ['Gruntfile.js', '<%= client_js %>'],
			server: ['<%= server_js %>'],
			options: {
				sub: true,
				smarttabs: true,
				ignores: [],
				laxcomma: true
			}
		},

		requirejs: {
			options: {
				baseUrl: '.',
				appDir: 'app/js',
				mainConfigFile: 'app/js/main.js',
				optimize: 'uglify2',
				generateSourceMaps: true,
				preserveLicenseComments: false,
				useStrict: true,
				removeCombined: false,
				modules: [{
					name: 'main',
				}]
			},

			main : {
				options: {
					dir: 'app/app_builds'
				}
			}
		},

		watch: {
			scripts: {
				options: {
				  livereload: true
				},
				files: ['<%= client_js %>'],
				tasks: ['javascripts']
			},
			server_js: {
				files: ['<%= server_js %>'],
				tasks: ['jshint:server']
			},
			jade: {
				options: {
					livereload: true
				},
				files: ['<%= jade %>']
			},
			styles: {
				options: {
				  livereload: true
				},
				files: ['styles/*.styl'],
				tasks: ['stylus']
			}
		},
		stylus: {
			compile: {
				options: {
					'include css': true,
					'paths': ['styles'],
					'compress': true
				},
				files: {
					'app/css/gamepad.css': ['styles/gamepad.styl'],
					'app/css/main.css': ['styles/main.styl']
				}
			}
		},
		open : {
			dev : {
			  path: 'http://127.0.0.1:3000/'
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-open');

	grunt.registerTask('server', 'Start a custom web server', function() {
		require('./src/app.js');
	});

	grunt.registerTask('default', ['jshint', 'stylus', 'server', 'open', 'watch']);
	grunt.registerTask('scripts', ['jshint:client']);
};