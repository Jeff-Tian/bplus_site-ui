module.exports = function() {
    return {
        scripts: ['<%= config.src %>/widgets/**/*.js'],
        options: {
            "jquery": true,
            //大括号包裹
            curly: true,
            //对于简单类型，使用===和!==，而不是==和!=
            eqeqeq: true,
            //对于首字母大写的函数（声明的类），强制使用new
            newcap: true,
            //禁用arguments.caller和arguments.callee
            noarg: true,
            //对于属性使用aaa.bbb而不是aaa['bbb']
            sub: true,
            //查找所有未定义变量
            undef: true,
            //查找类似与if(a = 0)这样的代码
            boss: true,
            //指定运行环境为node.js
            node: true,
            // global variables
            "globals": {
                "angular": false,
                "jasmine": false,
                "$": false,
                "_": false,
                "module": false,
                "require": false,
                "window": false
            }
        },
        //具体任务配置
        files: {
            src: ['client/www/js/**/*.js', 'client/www/api/*.js']
        }
    }
};