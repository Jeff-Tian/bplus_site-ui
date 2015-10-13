define([
    "when"
], function (when) {
    var TIP_KEY_PREFIX = "CompleteRateTip";

    function progressFace(val) {
        val = parseInt(val);
        var progressLeft = document.getElementById('progressLeft'),
            progressRight = document.getElementById('progressRight'),
            step = 1,
            space = parseInt(1000 / val),
            maxRight = val >= 50 ? 180 : (val <= 0 ? 0 : val * 3.6),
            maxLeft = (val > 50 && val < 100) ? (val - 50) * 3.6 : 180;

        function circleRight() {
            var deg = Math.round(progressRight.style.transform.toString().match(/rotate\(([\d\.]+)deg\)/im)[1]);
            if (deg < maxRight) {
                progressRight.style.transform = 'rotate(' + (deg + 1) + 'deg)';
                setTimeout(circleRight, space);
            } else if (val > 50) {
                circleLeft();
            }
        }

        function circleLeft() {
            var deg = Math.round(progressLeft.style.transform.toString().match(/rotate\(([\d\.]+)deg\)/im)[1]);
            if (deg < maxLeft) {
                progressLeft.style.transform = 'rotate(' + (deg + 1) + 'deg)';
                setTimeout(circleLeft, space);
            }
        }

        circleRight();
    }

    return function (agModule) {
        agModule.controller('achievement', ['$scope', '$http', "personalinfoService", function ($scope, $http, model) {
            $scope.classNameFaceEdit = '';
            $scope.dataLoaded = false;
//          $http.get('/mock/profile-achievement.json').success( function (data) {
            var patterns = model.getPattern();
            var servicesArray = [];
            for (var i in patterns) {
                servicesArray.push(i);
            }
            var servicePromiseArray = servicesArray.map(function (value, key) {
                return model.getData(value);
            });
            var data = {
                gender: "",
                face: "",
                progress: 0,
                rate: 0
            };
            when.all(servicePromiseArray).then(function (serviceData) {
                $scope.dataLoaded = true;
                serviceData.forEach(function (value, index) {
                    if (servicesArray[index] === "memberExt") {
                        data.gender = value[0].gender;
                    }
                    if (value.length > 0) {
                        data.progress++;
                    }
                });

                (function () {
//                  if (!data.gender || (data.gender.toString().toLowerCase() != 'male' && data.gender.toString().toLowerCase() != 'female')) {
//                      data.gender = 'male';
//                  }
                    if (!data.face) {
                        if (data.gender.toString().toUpperCase() !== 'F') {
                            data.face = '/img/profile/icon_profile_picture_male_big.png';
                        } else {
                            data.face = '/img/profile/icon_profile_picture_female_big.png';
                        }
                    }
                })();

//              (function () {
//                  var list = (data.list instanceof Array) ? data.list : [];
//                  for (var i = 0, len = list.length; i < len; i++) {
//                      var item = list[i];
//                      if (('score' in item) && !/^[\+\-]/gim.test(item.score.toString())) {
//                          item.score = '+' + item.score;
//                      }
//                  }
//              })();
//
//              if ('score' in data) {
//                  data.score = '+' + data.score;
//              }

                data.tip = TIP_KEY_PREFIX + data.progress;
                data.rate = Math.floor(data.progress / servicesArray.length * 100);
                $scope.data = data;
                when().delay(500).then(function () {
                    progressFace(data.progress);
                });
            });
        }]);
    };
});