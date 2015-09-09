define([

], function (

) {
    function progressFace(val) {
        val = parseInt(val);
        var progress = document.getElementById('b-profile-face-progress'),
            progress2 = document.getElementById('b-profile-face-progress2'),
            step = 1,
            space = parseInt(1000 / val),
            maxV1 = val >= 50 ? 50 : (val <= 0 ? 0 : val),
            maxV2 = (val > 50 && val < 100) ? val : 100;
        function fnProgress() {
            var v = parseFloat(progress.getAttribute('value'));
            if (v < maxV1) {
                progress.setAttribute('value', v + step);
                setTimeout(fnProgress, space);
            } else if (val > 50) {
                fnProgress2();
            }
        }
        function fnProgress2() {
            var v = parseFloat(progress2.getAttribute('value'));
            if (v < maxV2) {
                progress2.setAttribute('value', v + step);
                setTimeout(fnProgress2, space);
            }
        }
        fnProgress();
    }

    return function (agModule) {
        agModule.controller('achievement', ['$scope', '$http', function ($scope, $http) {
            $http.get('/mock/profile-achievement.json').success( function (data) {
                var isProgress = false;
                (function () {
                    var list = (data && (data.list instanceof Array)) ? data.list : [];
                    for (var i = 0, len = list.length; i < len; i++) {
                        var item = list[i];
                        if (('score' in item) && !/^[\+\-]/gim.test(item.score.toString())) {
                            item.score = '+' + item.score;
                        }
                    }
                })();
                if (data && ('score' in data)) {
                    data.score = '+' + data.score;
                }
                if (typeof(data.progress) == 'number' && (!$scope.data || ($scope.data.progress != data.progress))) {
                    isProgress = true;
                }
                $scope.data = data;
                if (isProgress) {
                    progressFace($scope.data.progress);
                }
            });
        }]);
    }
});