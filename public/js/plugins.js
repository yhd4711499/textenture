ng = function (a) {
    return a;
};

ex = function(deps, mod) {
    if (!mod)
        mod = deps;
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        module.exports = mod();
    else if (typeof define == "function" && define.amd) // AMD
        return define(deps, mod);
    else // Plain browser env
        this.texenture = mod();
};

guid = (function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return function() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    /**
     * search throughout the array finding the item whose id == target id
     * @param id target id
     * @param found function(index)
     * @param notfound function()
     * @returns {number} index
     */
    Array.prototype.indexById = function(id, found, notfound){
        var i = 0;
        for (; i < this.length; i++){
            if (this[i].id == id){
                break;
            }
        }
        if (i == this.length){
            i = -1;
        }
        if (i != -1){
            if (found){
                found(i);
            }
        }else{
            if (notfound){
                notfound();
            }
        }
        return i;
    };

    /**
     * search throughout the array finding the item whose id == target id
     * @param id target id
     * @param found function(found)
     * @param notfound function()
     * @returns {object} found item or null if not found
     */
    Array.prototype.findById = function(id, found, notfound){
        var i = 0;
        for (; i < this.length; i++){
            if (this[i].id == id){
                break;
            }
        }
        if (i == this.length){
            i = -1;
        }
        if (i != -1){
            if (found){
                found(this[i]);
            }
        }else{
            if (notfound){
                notfound();
            }
        }
        return i == -1? null:this[i];
    };

    Array.prototype.find = function (condition) {
        var i = 0;
        var results = [];
        for (; i < this.length; i++){
            if (condition(this[i])){
                results.push(this[i]);
            }
        }
        return results;
    };

    Array.prototype.findOne = function (condition) {
        var i = 0;
        var results = [];
        for (; i < this.length; i++){
            if (condition(this[i])){
                return this[i];
            }
        }
        return null;
    };

    Array.prototype.removeAll = function (condition) {
        for (var i = 0; i < this.length; ){
            if (condition(this[i])){
                this.splice(i, 1);
            }else{
                i++;
            }
        }
    };

    Array.prototype.shuffle = function (){
        for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    };
}());

// Place any jQuery/helper plugins in here.
