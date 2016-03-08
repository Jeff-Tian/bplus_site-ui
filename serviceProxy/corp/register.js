var register = require('express')();
register.get("/apply", function(req, res, next){
    res.write("register apply");
    res.end();
});

module.exports = register;
