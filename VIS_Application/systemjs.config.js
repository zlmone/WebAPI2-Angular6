/**
* System configuration for Angular samples
* Adjust as necessary for your application needs.
*/
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/',
            'underscore': 'node_modules/underscore/underscore.js'
        },
        //map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app', // 'dist',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'typescript': 'npm:typescript@2.0.3/lib/typescript.js',
            'underscore': 'npm:underscore',
            'ng2-bs3-modal': 'npm:/ng2-bs3-modal',
            'ng2-file-upload': 'npm:ng2-file-upload',

            'ng2-formly': 'npm:ng2-formly/bundles/ng2-formly.umd.js',
            "ng2-ckeditor": 'npm:ng2-ckeditor',
            'angular2-color-picker': 'node_modules/angular2-color-picker',
            'ng2-tab': 'node_modules/ng2-tab/dist',
            'angular-2-dropdown-multiselect': 'node_modules/angular-2-dropdown-multiselect',
            'ng2-datepicker': 'node_modules/ng2-datepicker',
            'file-saver': 'node_modules/file-saver',
            'xlsx': 'node_modules/xlsx',
            'xlsx-style': 'node_modules/xlsx-style',
            'ng2-tree': 'node_modules/ng2-tree'
            
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: { main: 'main.js', defaultExtension: 'js' },
            rxjs: { defaultExtension: 'js' },
            'ng2-bs3-modal': { main: '/bundles/ng2-bs3-modal.js', defaultExtension: 'js' },
            'ng2-file-upload': { main: 'index.js', defaultExtension: 'js' },
            'ng2-ckeditor': { main: 'lib/index.js', defaultExtension: 'js' },
            'underscore': { main: 'underscore.js', defaultExtension: 'js' },
            'angular2-color-picker': { main: 'index.js', defaultExtension: 'js' },
            'ng2-tab': { main: 'ng2-tab.umd.js', defaultExtension: 'js' },
            'angular-2-dropdown-multiselect': { main: 'bundles/dropdown.umd', defaultExtension: 'js' },
            'ng2-datepicker': { main: 'bundles/ng2-datepicker.umd', defaultExtension: 'js' },
            'file-saver': {
                format: 'global',
                main: 'FileSaver.js',
                defaultExtension: 'js'
            },
            'xlsx': {
                format: 'global',
                main: 'xlsx.js',
                defaultExtension: 'js'
            },
            'xlsx-style':
                {
                    format: 'global',
                    main: 'xlsx.js',
                    defaultExtension: 'js'
                },
            'ng2-tree':
                {
                    main: '/bundles/ng2-tree.umd.min',
                    defaultExtension: 'js'
                }
           
            

        }
    });
})(this);