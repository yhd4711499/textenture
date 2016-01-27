/**
 * Created by Ornithopter on 2015/1/21.
 */
(function (ctx) {
    var final = {
        dialog: "再见"
    };
    return {
        dialog: "你想知道什么？" + ctx.name,
        options: ["我的名字", "我的年龄"],
        next: [
            {
                dialog: "你叫" + ctx.name,
                next: final
            },
            {
                dialog: "你现在25岁了",
                next: final
            }
        ]
    }
});