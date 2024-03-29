angular.module('bridgeplus.corp')
    .service('cvService', ['$q', 'service', 'DeviceHelper', function ($q, service, DeviceHelper) {
        var me = this;
        var hasInitialized = false;
        var resourceData = {};
        var resourceSet = [
            "qualifications",
            "worktype",
            "communityposition",
            "language",
            "langguageproficiency",
            "englishlevel",
            "industry",
            "job"
        ];
        var PARAM_MAPPING = {
            'delivered': "todo",
            'interested': "unlocked",
            'deleted': "dropped"
        };
        var JOB_URL_PREFIX = "corp-service-proxy/jobapply/";
        var RESOURCE_URL_PREFIX = "corp-service-proxy/resource/";

        me.getCV = function (currentTab, option) {
            var url = JOB_URL_PREFIX + PARAM_MAPPING[currentTab];
            var param = $.extend(true, {
// company_id : "26198a21-16cb-481a-a4e0-ec5350ccf7fa"
//company_id : "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
                company_id: DeviceHelper.getCookie('corp_id')
            }, option);
            return service.post(url, param).then(function (value) {
                return value;
            });
        };
        // Resources
        me.getResourceByID = function (key, id) {
            var data = resourceData[key];
            // Array.prototype.find
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    return data[i].text;
                }
            }
            return "";
        };
        me.getIndustry = function (id) {
            var key = "industry";
            return me.getResourceByID(key, id);
        };
        me.getLanguage = function (id) {
            var key = "language";
            return me.getResourceByID(key, id);
        };
        me.getCommunityPosition = function (id) {
            var key = "communityposition";
            return me.getResourceByID(key, id);
        };
        me.getLangguageProficiency = function (id) {
            var key = "langguageproficiency";
            return me.getResourceByID(key, id);
        };
        me.getEnglishLevel = function (id) {
            var key = "englishlevel";
            return me.getResourceByID(key, id);
        };
        me.getQulificationsByID = function (id) {
            var key = "qualifications";
            return me.getResourceByID(key, id);
        };
        me.getJobByID = function (id) {
            var key = "job";
            return me.getResourceByID(key, id);
        };
        me.getWorktypeByID = function (id) {
            var key = "worktype";
            return me.getResourceByID(key, id);
        };

        /////////////
        // Two functions below are utils function for data parsing
        me.produceDataString = function (startDate, endDate) {
            var startDateString = '';
            var endDateString = '';

            function getYearAndMonth(dataString) {
                var date = new Date(dataString);
                return date.getFullYear() + '/' + (date.getMonth() + 1);
            }

            startDateString = getYearAndMonth(startDate);
            if (endDate === "") {
                endDateString = '至今';
            } else {
                endDateString = getYearAndMonth(endDate);
            }
            return startDateString + "~" + endDateString;
        };
        me.levelMapping = function (value) {
            var ret = 0;
            if (value < 20) {
                ret = 'e';
            } else if (value < 40) {
                ret = 'd';
            } else if (value < 60) {
                ret = 'c';
            } else if (value < 80) {
                ret = 'b';
            } else {
                ret = 'a';
            }
            return ret;
        };
        ////////
        me.unlockCV = function (cv) {
            var url = '/corp-service-proxy/jobapply/unlockCandidate';
            var param = {
                applierList: [cv]
            };
            return service.post(url, param);
        };
        me.restoreCV = function (cv) {
            var url = '/corp-service-proxy/jobapply/restoreCandidate';
            var param = {
                applierList: [cv]
            };
            return service.post(url, param);
        };
        me.dropCV = function (cvArray) {
            var url = '/corp-service-proxy/jobapply/dropCandidate';
            var param = {
                applierList: cvArray
            };
            return service.post(url, param);
        };
        me.getResume = function (idParam) {
            var url = '/corp-service-proxy/candidate/resume';
            var param = $.extend(true, {
                member_id: "759c1586-2e9b-4535-9d43-01a8cc8f2e89"
            }, idParam);
            return service.post(url, param);
        };
        me.getPublishedJobs = function () {
            var url = '/corp-service-proxy/jobapply/publishedJobs';
            var param = {
// company_id : "26198a21-16cb-481a-a4e0-ec5350ccf7fa"
//                company_id: "ed0842cf-c96b-46b5-b5c8-033c5ac3dbd5"
                company_id: DeviceHelper.getCookie('corp_id')
            };
            return service.post(url, param);
        };
        me.init = function () {
            // Get resources
            var resourcePromises = resourceSet.map(function (value) {
                var url = RESOURCE_URL_PREFIX + value;
                return service.get(url);
            });
            return $q.all(resourcePromises).then(function (ret) {
                resourceSet.forEach(function (value, index) {
                    resourceData[value] = ret[index];
                });
                hasInitialized = true;
            });
        };
    }])
;
