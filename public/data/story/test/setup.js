/**
 * Created by Ornithopter on 2015/1/20.
 */
(function() {
    return {
        dialog: function (ctx) {
            return "How may I call you?";
        },
        input: function (ctx) {
            return true
        },
        callbacks: function (ctx, input) {
            ctx.name = input;
            ctx.health = 5;
        },
        next: function () {
            return "test/next";
        }
    }
});