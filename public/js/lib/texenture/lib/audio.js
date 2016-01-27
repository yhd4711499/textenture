/**
 * Created by Ornithopter on 2015/1/20.
 */
ex(['buzz'], function(buzz) {
    "use strict";

    var audio = {};

    var getSound = function (name, dir) {
        var options;
        if (name.length > 4 && name.charAt(name.length - 4) == '.')
            options = null;
        else
            options = {formats: [ "m4a", "mp3", "ogg" ]};
        return new buzz.sound("../data/" + dir + '/' + name, options);
    };
    audio.playSound = function (name, next) {
        var mySound = getSound(name, 'sounds');
        mySound.play();
    };

    audio.playBGM = function (name, next) {
        var mySound = getSound(name, 'bgm');
        mySound.play().loop();
    };
    return audio;
});