require.config({

    // alias libraries paths
    paths: {
        'jquery': '../../bower_components/jquery/dist/jquery.min',
        'angular': '../../bower_components/angular/angular',
        'angular-touch': '../../bower_components/angular-touch/angular-touch',
        'angularAMD': '../../bower_components/angularAMD/angularAMD',
        'ngload': '../../bower_components/angularAMD/ngload',
        'angular-cookies': '../../bower_components/angular-cookies/angular-cookies',
        'angular-loading-bar': '../../bower_components/angular-loading-bar/src/loading-bar',
        'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap',
        'angular-resource': '../../bower_components/angular-resource/angular-resource',
        'ui-router': '../../bower_components/ui-router/release/angular-ui-router',
        'buzz': '../../bower_components/buzz/dist/buzz.min',
        'texenture': '../js/lib/texenture/index'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    // and define dependencies for each module if necessary
    shim: {
        'angular':{exports: 'angular'},
        'angular-touch': ['angular'],
        'angular-cookies': ['angular'],
        'angular-loading-bar': ['angular'],
        'angular-resource': ['angular'],
        'angularAMD': ['angular'],
        'ngload': ['angularAMD'],
        'ui-router': ['angular']
    },

    // kick start application
    deps: ['plugins','app']
});
