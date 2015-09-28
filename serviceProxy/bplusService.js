var http = require('http');
var bplusService = require('../config').bplusService;
var ssoService = require('../config').sso;
var bplusServiceParams = require('../config').bplusServiceParams;
var proxy = require('./proxy');
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
        });
    },
    
    updateData: function(req, res, next) {
        var operation = req.params.operation;
        var classification = req.params.classification;
        var mapping = bplusServiceParams.mapping;
        return proxyBPlus({
            path: '/profile/' + classification + '/' + operation,
            dataMapper: function (d) {
            }
        });
    },

    getResource: function (req, res, next) {
        var language = 'zh-CN';

        if (req.params.language === 'en') {
            language = 'en-US';
        }

        proxyBPlus({
            path: '/resource/load/' + req.params.resourceKey + '/' + language
        })(req, res, next);
    }
};