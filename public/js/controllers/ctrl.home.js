/**
 * Created by Ornithopter on 14/11/21.
 */
define([
    'app', 'texenture', 'directives/drtv.common'
], function (app, texenture) {
    app.constant('SETTINGS', {
        story: 'nz',
        scenarioDivider: '================================'
    });
    app.controller('ctrl.home',
        ['$rootScope', '$scope', '$location', '$cookieStore', '$state', 'SETTINGS',
            function ($rootScope, $scope, $location, $cookieStore, $state, SETTINGS){
                var engineNextTick;
                $scope.lines = [];

                var apply = function () {
                    if(!$scope.$$phase) {
                        $scope.$digest();
                    }
                };

                $scope.next = function (index) {
                    //if ($scope.type == 'options')
                    //    $scope.lines.push($scope.options[index]);
                    engineNextTick(index);
                };

                $scope.proceed = function () {
                    if ($scope.showInteraction == false)
                        engineNextTick();
                };

                var engine = texenture;

                var onOptions = function (options, next) {
                    $scope.showInteraction = true;
                    $scope.type = 'options';
                    $scope.options = options;
                    engineNextTick = next;
                    apply();
                };

                var onInput = function(next) {
                    $scope.showInteraction = true;
                    $scope.type = 'input';
                    engineNextTick = next;
                    apply();
                };

                var onScenarioChanged = function (next) {
                    $scope.lines.push(SETTINGS.scenarioDivider);
                    engineNextTick = next;
                    engineNextTick();
                    apply();
                };

                var onEnd = function (ctx) {
                    $scope.ended = true;
                    apply();
                };

                var onNewLine = function (line, next) {
                    $scope.showInteraction = false;
                    $scope.lines.push(line);
                    engineNextTick = next;
                    apply();
                };

                engine.init(onNewLine, onOptions, onInput, onScenarioChanged, onEnd);
                engine.start(SETTINGS.story);

                $rootScope.$on('click', $scope.proceed);
            }]
    );
});