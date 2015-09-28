var http = require('http');
var bplusService = require('../config').bplusService;
var ssoService = require('../config').sso;
var bplusServiceParams = require('../config').bplusServiceParams;
var proxy = require('./proxy');
var extend = require('util')._extend;
var Q = require('q');

function proxyBPlus(options) {
    return function (req, res, next) {
        options.host = bplusService.host;
        options.port = bplusService.port;

        proxy(options)(req, res, next);
    };
}

function mapEducation(d) {
    d.qualifications_id = d.educationBackground;
    delete d.educationBackground;
    d.university = d.name;
    delete d.name;

    if (d.startYear && d.startMonth) {
        d.start_date = new Date(Date.UTC(d.startYear, Number(d.startMonth) - 1, 1));
    }
    delete d.startYear;
    delete d.startMonth;

    if (d.endYear && d.endMonth) {
        d.end_date = new Date(Date.UTC(d.endYear, Number(d.endMonth) - 1, 1));
    }
    delete d.endYear;
    delete d.endMonth;

    return d;
}

function updateMemberData(req, res, next) {
    var $noop = function() {};
    var operation = req.params.operation;
    if (operation !== "update") {
        res.send("Method error! Method is---" + operation);
        return;
    }
    var mapping = bplusServiceParams.mapping;
    var serviceNames = ["memberExt", "memberSso"];
    var serviceParams = [
        {
            host: bplusService.host,
            port: bplusService.port,
            path: "/profile/memberExt/update"
        },
        {
            host: ssoService.host,
            port: ssoService.port,
            path: "/profile/update",
            dataMapper: function (d) {
                d.application_id = ssoService.applicationId;
                return d;
            }
        }
    ];
    var rawData = req.body;
    var promiseArray = [];
    serviceNames.forEach(function(serviceValue, index) {
        var paramKeys = bplusServiceParams[serviceValue];
        var param = {};
        var hasData = false;
        paramKeys.forEach(function(value) {
            var rawValue = rawData[mapping[value]];
            if (rawValue) {
                param[value] = rawValue;
                hasData = true;
            }
        });
        if (hasData) {
            promiseArray.push(Q.promise(function(resolve, reject) {
                var serviceParam = serviceParams[index];
                var newReq = extend({}, req);
                serviceParam.responseInterceptor = function(res, chunks) {
                    resolve(chunks);
                    return true;
                };
                //TODO
                //TEST CODES BELOW
                retParam.member_id = "d74623c0-5265-4b28-b11c-dd8758423a7b";
                /////////
                newReq.body = param;
                proxy.execute(newReq, res, $noop, serviceParam);
            }));
        }
    });
    Q.any(promiseArray).then(function(result){
        res.send(result);
    }, function(error){
        console.log(error);
        res.send(error.toString());
    });
}

function updateOtherData(req, res, next) {
    var classification = req.params.classification;
    var operation = req.params.operation;
    var mapping = bplusServiceParams.mapping;
    return proxyBPlus({
        path: '/profile/' + classification + '/' + operation,
        dataMapper: function (d) {
            var retParam = {};
            bplusServiceParams[classification].forEach(function(value) {
                var originKey = mapping[value];
                var originValue = d[originKey];
                if (originValue) {
                    retParam[value] = originValue;
                }
            });
            //TODO
            //TEST CODES BELOW
            retParam.member_id = "d74623c0-5265-4b28-b11c-dd8758423a7b";
            /////////
            return retParam;
        }
    })(req, res, next);
}

module.exports = {
    loadProfile: function (req, res, next) {
        proxyBPlus({path: '/profile/load/' + res.locals.hcd_user.member_id})(req, res, next);
    },

    updateProfile: proxyBPlus({
        path: '/profile/memberExt/update',
        dataMapper: function (d) {
            d.current_location = d.currentLocation;
            d.hide_birthday = d.setPrivacy;

            return d;
        }
    }),

    addEducation: proxyBPlus({
        path: '/profile/education/add',
        dataMapper: mapEducation
    }),

    updateEducation: proxyBPlus({
        path: '/profile/education/update',
        dataMapper: function (d) {
            d.education_id = d.educationId;
            delete d.educationId;

            return mapEducation(d);
        }
    }),

    loadProfileAll: function(req, res, next) {
        var $noop = function() {};
        var memberID = res.locals.hcd_user.member_id;
        var ssoPath = '/profile/load/' + memberID;
        var bplusPath = '/profile/load/' + memberID;
        var ssoProfilePromise = Q.promise(function(resolve, reject) {
            proxy.execute(req, res, $noop, {
                host: ssoService.host,
                port: ssoService.port,
                path: ssoPath,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'User-Agent': 'BridgePlus Web'
                },
                responseInterceptor: function(res, chunks) {
                    resolve(chunks);
                    return true;
                }
            });
        });
        var bplusProfilePromise = Q.promise(function(resolve, reject) {
            proxyBPlus({
                path: bplusPath,
                responseInterceptor: function(res, chunks) {
                    resolve(chunks);
                    return true;
                }
            })(req, res, $noop);
        });
        Q.all([ssoProfilePromise, bplusProfilePromise]).spread(function(ssoProfile, bplusProfile){
            var targetResult = bplusProfile.result;
            var memberSsoKeys = bplusServiceParams.memberSso;
            var mapping = bplusServiceParams.mapping;
            memberSsoKeys.forEach(function(value) {
                targetResult.memberExt[value] = ssoProfile.result[value];
            });
            var resultString = JSON.stringify(targetResult);
            //Replace service keys to bplus keys
            resultString = resultString.replace(/[,|{]"([^\"]+)":/g, function(value, groupValue){
                var mappingValue = mapping[groupValue];
                var retString = mappingValue ? value.replace(groupValue, mapping[groupValue]) : value;
                return retString;
            });
            targetResult = JSON.parse(resultString);
            bplusProfile.result = targetResult;
            res.send(bplusProfile);
        }, function(error) {
            console.log(error);
            res.send(error.toString());
        });
    },
    
    updateData: function(req, res, next) {
        var classification = req.params.classification;
        if (classification === "memberExt") {
            return updateMemberData(req, res, next);
        } else {
            return updateOtherData(req, res, next);
        }
    },
    
    getResource: function (req, res, next) {
        var language = bplusServiceParams.language[req.params.language];
        proxyBPlus({
            path: '/resource/load/' + req.params.resourceKey + '/' + language
        })(req, res, next);
    }
};