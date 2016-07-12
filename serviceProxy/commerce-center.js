var config = require('../config');
var proxyTo = require('./proxyTo');
var router = require('express').Router();

proxyTo.proxyPostToPost(router, config.serviceUrls.commerceCenter.orderHistory, config.commerce.inner);

module.exports = router;