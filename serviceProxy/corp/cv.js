var cv = require('express')();
cv.get("/apply", function(req, res, next){
    res.write("apply cv");
    res.end();
});

module.exports = cv;
