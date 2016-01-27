/**
 * Created by Ornithopter on 2015/1/20.
 */
(function() {
    return {
        dialog: function (ctx) {
            return "Hi, " + ctx.name +". Your health is: " + ctx.health + " Choose :";
        },
        options: function (ctx) {
            var basic = [
                "-1",
                "-2"
            ];

            if (ctx.health >= 3){
                basic = basic.concat(["-3"]);
            }
            return basic;
        },
        callbacks: function (ctx, data) {
            switch (data){
                case 0:
                    ctx.health -= 1;
                    break;
                case 1:
                    ctx.health -= 2;
                    break;
                case 2:
                    ctx.health -= 3;
                    break;
            }
        },
        next: function (ctx, data) {
            if (ctx.health > 0){
                engine.audio.playSound('fallbackring.ogg');
                return 'test/next';
            }else{
                return 'test/end/dead';
            }
        }
    }
});