var corp = require('express')();

corp.use("/register", require("./register"));
corp.use("/cv", require("./cv"));

module.exports = corp;