/**
 * Created by Ornithopter on 2015/1/20.
 */
ex(function() {
    "use strict";

    var parser = {};
    parser.root = "";
    parser.parseScenario = function (path, ctx, next) {
        if (angular.isObject(path))
            return next(null, path);
        var xhtml = new XMLHttpRequest();
        xhtml.open("GET","data/story/" + parser.root + path + ".js",false);
        xhtml.send();

        var scenario = eval(xhtml.responseText);
        next(null, scenario);
    };
    return parser;
});