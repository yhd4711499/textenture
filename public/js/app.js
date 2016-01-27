define([
    'angular',
    'angularAMD',
    'angular-loading-bar',
    'angular-cookies',
    'ui-router',
    'angular-touch'
],function (angular, angularAMD){
    var app = angular.module("texenture", [
        'angular-loading-bar', 'ui.router', 'ngCookies', 'ngTouch']);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider
            // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
            .otherwise('/');

        $stateProvider.get = function (main, state, route, view, ctrl, ctrlUrl, abs, params) {
            var routeInfo = {
                url: route,
                //templateUrl: 'views/'+ view + '.html',
                controller: ctrl,
                abstract: abs == true,
                params: params
            };

            if (ctrlUrl || ctrl){
                routeInfo.controllerUrl = 'js/controllers/' + (ctrlUrl || ctrl) + '.js';
            }

            if (routeInfo.abstract && !view){
                routeInfo.template= '<ui-view></ui-view>';
            }else{
                routeInfo.templateUrl= 'partials/'+ view + '.html';
            }
            return this.state(state, angularAMD.route(routeInfo))
        };

        $stateProvider.get(true, 'home', '/', 'index', 'ctrl.home');

        delete $stateProvider.get;
        //get(false, 'user.profile', '/profile', 'common/user/view', 'dishes.ctrl.auth');
    }]);

    app.run(['$rootScope', '$state', '$stateParams', '$location', '$cookieStore', function ($rootScope,   $state,   $stateParams, $location, $cookieStore) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.navCollapsed = true;
        /* Reset error when a new view is loaded */
        $rootScope.$on('$viewContentLoaded', function() {
            $rootScope.navCollapsed = false;
            delete $rootScope.error;
        });

        $rootScope.onKeyPress = function (e) {
            $rootScope.$broadcast('keypress', e)
        };

        $rootScope.onClick = function (e) {
            $rootScope.$broadcast('click');
        };

        $rootScope.initialized = true;
    }]);

    // Bootstrap Angular when DOM is ready

    //require([
    //    'domReady!'
    //], function (document) {
    //});

    return angularAMD.bootstrap(app);
});
