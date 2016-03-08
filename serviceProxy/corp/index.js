var corp = require('express')();

// Should according to backend server rules
corp.use("/register", require("./register"));
corp.use("/cv", require("./cv"));

module.exports = corp;