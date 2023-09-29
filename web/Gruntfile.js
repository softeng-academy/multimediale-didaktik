
module.exports = function (grunt) {
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.initConfig({
        copy: {
            "normalize": {
                files: [
                    {   expand: true, flatten: false, cwd: "node_modules/normalize.css",
                        src: "normalize.css", dest: "lib/normalize/" }
                ]
            },
            "jquery": {
                files: [
                    {   expand: true, flatten: false, cwd: "node_modules/jquery/dist",
                        src: "jquery.min.js", dest: "lib/jquery/",
                        rename: (src, dest) => src + dest.replace(/\.min/, "") }
                ]
            },
            "fontawesome": {
                files: [
                    {   expand: true, flatten: false, cwd: "node_modules/@fortawesome/fontawesome-free/css",
                        src: "all.min.css", dest: "lib/fontawesome/",
                        rename: (src, dest) => src + "fontawesome.css",
                    }, {
                        expand: true, flatten: false, cwd: "node_modules/@fortawesome/fontawesome-free/webfonts",
                        src: "fa-*", dest: "lib/fontawesome/",
                        rename: (src, dest) => src + dest.replace(/fa-/, "fontawesome-")
                    }
                ],
                options: {
                    encoding: null,
                    process: (content, srcpath) => {
                        if (srcpath.match(/all\.min\.css/))
                            content = content.toString().replace(/\.\.\/webfonts\/fa-/g, "fontawesome-")
                        return content
                    }
                }
            },
            "fancybox": {
                files: [
                    {   expand: true, flatten: false, cwd: "node_modules/@fancyapps/fancybox/dist",
                        src: "jquery.fancybox.css", dest: "lib/jquery-fancybox/" },
                    {   expand: true, flatten: false, cwd: "node_modules/@fancyapps/fancybox/dist",
                        src: "jquery.fancybox.js", dest: "lib/jquery-fancybox/" }
                ]
            },
            "typopro": {
                files: [
                    {   expand: true, flatten: false, cwd: "node_modules/typopro-web/web",
                        src: "TypoPRO-OpenSans/**", dest: "lib/typopro/" },
                    {   expand: true, flatten: false, cwd: "node_modules/typopro-web/web",
                        src: "TypoPRO-DejaVu/**", dest: "lib/typopro/" },
                    {   expand: true, flatten: false, cwd: "node_modules/typopro-web/web",
                        src: "TypoPRO-Journal/**", dest: "lib/typopro/" }
                ]
            }
        },
        clean: {
            clean:     [ "lib" ],
            distclean: [ "node_modules" ]
        }
    });
    grunt.registerTask("default", [ "copy" ]);
};

