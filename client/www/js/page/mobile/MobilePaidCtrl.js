(function (exports) {
    exports.MobilePaidCtrl = function ($scope, $stateParams, $state, service, msgBus, $rootScope) {
        function askForPay() {
            $state.go('select-payment-method');
        }

        $scope.gameLink = window.location.protocol + '//' + window.location.host + '/m/national';

        $scope.paidUser = {
            member_id: $stateParams.who,
            displayName: $stateParams.displayName
        };

        msgBus.onMemberLoaded($scope, function () {
            if ($scope.paidUser.member_id === $scope.memberInfo.member_id) {
                $scope.currentUserIsMe = true;

                if ($state.current.name === 'paid') {
                    service.post($scope.serviceUrls.checkNationalGame2015OrderPayment)
                        .then(function (result) {
                            if (!/^true$/i.test(result.hasRight)) {
                                askForPay();
                            } else {
                                $scope.showPaid = true;
                            }
                        })
                        .catch(askForPay)
                    ;
                }
            } else {
                $scope.showPaid = true;
            }
        });

        $rootScope.pageTitle = '报名 Bridge+ 全国大赛';
        $rootScope.pageDescription = '快来一起报名吧!';

        var imgUrl = angular.bplus.config.cdn.normal + 'img/b-wechat.jpg?' + angular.bplus.config.cdn.version;
        var lineLink = window.location.href;
        var descContent = $rootScope.pageDescription;
        var shareTitle = $rootScope.pageTitle;
        var appid = 'wxc9937e3a66af6dc8';

        var wxBridge = window.WeixinJSBridge;

        function shareFriend() {
            wxBridge.invoke('sendAppMessage', {
                "appid": appid,
                "img_url": imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function (res) {
                //_report('send_msg', res.err_msg);
                window.alert(JSON.stringify(res));
            });
        }

        function shareTimeline() {
            wxBridge.invoke('shareTimeline', {
                "img_url": imgUrl,
                "img_width": "640",
                "img_height": "640",
                "link": lineLink,
                "desc": descContent,
                "title": shareTitle
            }, function (res) {
                //_report('timeline', res.err_msg);
                window.alert(JSON.stringify(res));
            });
        }

        function shareWeibo() {
            wxBridge.invoke('shareWeibo', {
                "content": descContent,
                "url": lineLink,
            }, function (res) {
                //_report('weibo', res.err_msg);
                window.alert(JSON.stringify(res));
            });
        }

        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            window.alert('ready');

            // share to friend
            wxBridge.on('menu:share:appmessage', function (argv) {
                window.alert('hello');
                shareFriend();
            });

            // share to timeline
            wxBridge.on('menu:share:timeline', function (argv) {
                shareTimeline();
            });

            // share to weibo
            wxBridge.on('menu:share:weibo', function (argv) {
                shareWeibo();
            });
        }, false);
    };

    exports.MobilePaidCtrl.$inject = ['$scope', '$stateParams', '$state', 'service', 'msgBus', '$rootScope'];
})(angular.bplus = angular.bplus || {});