module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Watch //
        watch: {
            jekyll: {
                files: ['_includes/**', '_layouts/**', '_posts/**', '_sass/**'],
                tasks: ['jekyll', 'styles', 'js', 'html'],
                options: {
                    spawn: false,
                    interupt: true,
                },
            },
            // styles: {
            //     files: ['_site/css/*.css'],
            //     tasks: ['styles'],
            //     options: {
            //         spawn: false,
            //         interupt: true,
            //     },
            // },
            // js: {
            //     files: ['js/**'],
            //     tasks: ['js'],
            //     options: {
            //         spawn: false,
            //         interupt: true,
            //     },
            // },
            // image: {
            //     files: ['build/images/*'],
            //     tasks: ['images'],
            //     options: {
            //         spawn: false,
            //         interupt: true,
            //     },
            // },
            // html: {
            //     files: ['_site/*.html'],
            //     tasks: ['html'],
            //     options: {
            //         spawn: false,
            //         interupt: true,
            //     },
            // },
        },

        // JS //
        uglify: {
            build: {
                src: ['js/libs/jquery-2.1.1.min.js', 'js/libs/tappy.js', 'js/main.js'],
                dest: '_site/js/main.min.js'
            }
        },

        // CSS //
        autoprefixer: {
            options: {
                browsers: ['> 7%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            autoprefix: {
                expand: true,
                flatten: true,
                src: '_site/css/main.css',
                dest: '_site/css/',
            },
        },
        cssmin: {
            dist: {
                files: {
                    '_site/css/main.css': '_site/css/main.css'
                }
            }
        },

        // // Images //
        // copy: {
        //     main: {
        //         files: [{
        //             expand: true,
        //             cwd: 'build/',
        //             src: ['images/**'],
        //             dest: 'dist/'
        //         }]
        //     },
        //     // svgs: {
        //     //     files: [{
        //     //         expand: true,
        //     //         cwd: 'build/images',
        //     //         src: ['**'],
        //     //         dest: 'dist/images'
        //     //     }]
        //     // }
        // },
        // imageoptim: {
        //     myTask: {
        //         options: {
        //             jpegMini: false,
        //             imageAlpha: false,
        //             quitAfter: true
        //         },
        //         src: ['dist/images']
        //     }
        // },
        // svgmin: { // Task
        //     options: { // Configuration that will be passed directly to SVGO
        //         plugins: [{
        //             removeViewBox: false
        //         }, {
        //             removeUselessStrokeAndFill: false
        //         }, {
        //             convertPathData: {
        //                 straightCurves: false // advanced SVGO plugin option
        //             }
        //         }]
        //     },
        //     dist: { // Target
        //         files: [{ // Dictionary of files
        //             expand: true, // Enable dynamic expansion.
        //             cwd: 'build/images/', // Src matches are relative to this path.
        //             src: ['*.svg'], // Actual pattern(s) to match.
        //             dest: 'dist/images/', // Destination path prefix.
        //             ext: '.svg' // Dest filepaths will have this extension.
        //             // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
        //         }]
        //     },
        // },

        // HTML //
        htmlmin: {
            main: {
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: '_site/', // Src matches are relative to this path.
                    src: ['*.html', '**/**/**/*.html'], // Actual pattern(s) to match.
                    dest: '_site/', // Destination path prefix.
                    ext: '.html', // Dest filepaths will have this extension.
                    extDot: 'first' // Extensions in filenames begin after the first dot
                }]
            }
        },


        shell: {
            jekyll: {
                command: "jekyll build --incremental"
            }
        },

        // Host //
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['_site/*']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "_site"
                    },
                    notify: false,
                    ghostMode: false
                }
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-autoprefixer');
    // grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-browser-sync');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-shell');



    // Tasks
    grunt.registerTask('default', ['styles', 'html']);
    grunt.registerTask('jekyll', ['shell', 'styles', 'js', 'html']);
    grunt.registerTask('styles', ['cssmin', 'autoprefixer']);
    grunt.registerTask('js', ['uglify']);
    // grunt.registerTask('images', ['newer:copy:main', 'newer:imageoptim:myTask', 'svgmin']);
    grunt.registerTask('html', ['htmlmin']);
    grunt.registerTask('serve', ['jekyll', 'browserSync:dev', 'watch']);


};
