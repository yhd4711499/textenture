/**
 * Created by Ornithopter on 2015/1/20.
 */
define(['app'], function (app) {
    app.directive('keyPress', ['$document', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                $document.bind('keypress', function(e) {
                    if (attrs.whichKey && e.which != attrs.whichKey)
                        return;
                    scope.$apply(attrs.keyPress + '(' + e.which + ')')
                })
            }
        }
    }]);

    app.directive('storyTeller', ['$document', function ($document) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div ng-click="proceed()" key-press="proceed" which-key="13"><ul><li ng-repeat="line in innerLines">{{line}}</li></ul></div>',
            scope: {
                lines: '=',
                onEnd: '='
            },
            controller: function ($scope) {
                var lines;
                $scope.innerLines = [];

                $scope.$watch('lines', function (newValue, oldValue) {
                    //$scope.innerLines = [];
                    if (!newValue)
                        return;
                    if (newValue.indexOf('\n') != -1)
                        lines = newValue.split('\n');
                    else
                        lines = [newValue];
                    proceed();
                });

                var proceed = $scope.proceed = function () {
                    if (lines && lines.length > 0)
                        $scope.innerLines.push(lines.splice(0,1)[0]);
                    else{
                        $scope.onEnd();
                    }
                };
            }
        }
    }])

    app.directive('attractive', ['$timeout', '$window', function ($timeout, $window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.addClass('hide');
                $timeout(function () {
                    elem[0].scrollIntoView();
                    $timeout(function () {
                        elem.removeClass('hide')
                    }, 100)
                })
            }
        }
    }]);
});