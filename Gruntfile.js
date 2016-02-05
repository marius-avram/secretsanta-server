"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint:
        {
            options:
            {
                node:true
            },
            
            all: ['server/**/*.js']
        },
        apidoc:
        {
            all:
            {
                src: 'server/',
                dest: 'docs/'
            }
        }
    });

    grunt.loadNpmTasks ('grunt-contrib-jshint');
    grunt.loadNpmTasks ('grunt-apidoc');

    grunt.registerTask ('default', [
            'jshint',
            'apidoc']);

};