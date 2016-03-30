var proxy = require('../proxy');
var resources = require('express').Router();
var config = require('../../config');
var membership = require('../membership');
var leaveTrimmer = require('../../utils/leaveTrimmer');
var corpServiceUrls = leaveTrimmer.trim(config.serviceUrls.corp, '/corp-service-proxy/resources');

resources.get(corpServiceUrls.resources.tags.replace('{query}', ':query?'), membership.ensureAuthenticated, function (req, res, next) {
    var results = [
        {
            name: 'abc',
            value: 'abc'
        },
        {
            name: 'cde',
            value: 'cde'
        }
    ];

    res.json({
        success: true,
        isSuccess: true,
        results: req.params.query ? results.filter(function (e) {
            return e.value.indexOf(req.params.query) >= 0
        }) : results
    });
});

module.exports = resources;
