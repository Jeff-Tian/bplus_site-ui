define([

], function (

) {
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
        agModule.controller('achievement', ['$scope', '$http', function ($scope, $http) {
            $scope.classNameFaceEdit = '';
            $http.get('/mock/profile-achievement.json').success( function (data) {
                if (!data) { return; }

                var isProgress = false;

                (function () {
                    if (!data.gender || (data.gender.toString().toLowerCase() != 'male' && data.gender.toString().toLowerCase() != 'female')) {
                        data.gender = 'male';
                    }
                    if (!data.face) {
                        if (data.gender.toString().toLowerCase() == 'male') {
                            data.face = '/img/profile/icon_profile_picture_male_big.png';
                        } else {
                            data.face = '/img/profile/icon_profile_picture_female_big.png';
                        }
                    }
                })();

                (function () {
                    var list = (data.list instanceof Array) ? data.list : [];
                    for (var i = 0, len = list.length; i < len; i++) {
                        var item = list[i];
                        if (('score' in item) && !/^[\+\-]/gim.test(item.score.toString())) {
                            item.score = '+' + item.score;
                        }
                    }
                })();

                if ('score' in data) {
                    data.score = '+' + data.score;
                }

                if (typeof(data.progress) == 'number' && (!$scope.data || ($scope.data.progress != data.progress))) {
                    isProgress = true;
                    data.tip = '差强人意，多说点';
                }

                $scope.data = data;

                if (isProgress) {
                    progressFace($scope.data.progress);
                }
            });
        }]);
    }
});