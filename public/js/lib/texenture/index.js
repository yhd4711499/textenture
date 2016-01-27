/**
 * Created by Ornithopter on 2015/1/20.
 *
 * This is the Texenture engine.
 */
var libPrefix = 'lib/texenture/lib';

ex([libPrefix + '/parser/index',
    libPrefix + '/audio',
    libPrefix + '/ctx'], function(parser, audio, ctx) {
    "use strict";

    var engine = {};

    /**
     * New line from dialog
     */
    var eventNewLine,
        /**
         * Notify user to choose from given options
         */
        eventOptions,
        /**
         * Notify user to input
         */
        eventInput,
        /**
         * When scenario changed
         */
        onScenarioChanged,
        /**
         * When the story ends
         */
        eventEnd;

    /**
     * Audio engine. It is exposed for external use.
     */
    engine.audio = audio;

    var consts = engine.consts = {};
    engine.consts.types = {
        normal: 'normal',
        options: 'options',
        input: 'input'
    };

    /**
     * Pop out all of the lines
     * @param {(String[])| String} lines an array of lines
     * @param {(String)} type the type of the current scenario
     * @param {(function())=} done when all the lines are popped out.
     */
    var popLines = function (lines, type, done) {

        if (angular.isString(lines)){
            if (lines.indexOf('\n') != -1)
                lines = lines.split('\n');
            else
                lines = [lines];
        }

        if (lines.length == 0) {
            if (done)
                done();
            return;
        }

        var next = function () {
            popLines(lines, type, done);
        };

        eventNewLine(lines.splice(0, 1)[0], next);

        if (type != 'normal' && (lines.length == 0)){
            if (done)
                done();
        }
    };

    var fireScenarioChanged = function (next) {
        onScenarioChanged(next);
    };

    var fireInput = function (done) {
        eventInput(done);
    };

    var fireOptions = function (options, done) {
        var optionText = [];
        angular.forEach(options, function (item) {
            if (angular.isArray(item)){
                optionText.push(item[0]);
            }else{
                optionText.push(item)
            }
        });
        eventOptions(optionText, done);
    };

    /**
     *
     * @param {function(String, function())} newLine
     * @param {function(String[], function(int))} options
     * @param {function(function(String))} input
     * @param {function(function())} scenarioChanged
     * @param {function(ctx)} end
     */
    engine.init = function (newLine, options, input, scenarioChanged, end) {
        eventNewLine = newLine;
        eventOptions = options;
        eventInput = input;
        onScenarioChanged = scenarioChanged;
        eventEnd = end;
    };

    engine.start = function (path) {
        parser.root = path + '/';
        /**
         * Get value from scenario data object.
         * This function should be moved to parser
         * @param property
         * @param {*=} data
         * @returns {*}
         */
        var getValue = function (property, data) {
            if (!property)
                return null;
            if (angular.isFunction(property)){
                return property(ctx, data);
            }else if (angular.isArray(property) && angular.isDefined(data)){
                return getValue(property[data]);
            }else{
                return property;
            }
        };

        var scenarioChanged = false;

        var cb = function (err, scenario) {
            var next = function (input) {
                /**
                 * user interaction callback
                 * @param input
                 */
                var done = function (input) {
                    if (scenario.callbacks)
                        scenario.callbacks(ctx, input);

                    var options = getValue(scenario.options);
                    if (angular.isDefined(options) && angular.isNumber(input)){
                        if (angular.isArray(options[input])){
                            popLines(options[input][1]);
                        }else{
                            popLines(options[input]);
                        }
                    }

                    if (!scenario.next){
                        // this game is ended.
                        if (eventEnd)
                            eventEnd(ctx);
                        return;
                    }

                    var nextScenario = getValue(scenario.next, input);

                    // nextScenario is String means it's a link to another scenario.
                    scenarioChanged = angular.isString(nextScenario);

                    // continue parsing scenarios.
                    parser.parseScenario(nextScenario, ctx, cb);
                };

                // promote for user interaction if necessary.
                if (scenario.input){
                    fireInput(done)
                }else if (scenario.options){
                    fireOptions(getValue(scenario.options), done)
                }else{
                    done(input);
                }
            };

            if (scenario.bgm){
                audio.playBGM(scenario.bgm(ctx));
            }

            var type = consts.types.normal;
            if (scenario.input){
                type = consts.types.input;
            }else if (scenario.options){
                type = consts.types.options;
            }

            /**
             * prepare lines for dialog and display the first line after scenario is changed.
             */
            var afterScenarioChanged = function () {
                popLines(getValue(scenario.dialog), type, next);
            };

            if (scenarioChanged)
                fireScenarioChanged(afterScenarioChanged);
            else{
                afterScenarioChanged();
            }
        };

        parser.parseScenario('main', ctx, cb);
    };

    window.engine = engine;
    return engine;
});