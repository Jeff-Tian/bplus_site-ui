'use strict';

angular.module('ng.utils')
    .factory('msgBus', ['$rootScope', function ($rootScope) {
        var msgBus = {};
        msgBus.emitMsg = function (msg, data) {
            $rootScope.$emit(msg, data);
        };
        msgBus.onMsg = function (msg, scope, func) {
            var unbind = $rootScope.$on(msg, func);
            scope.$on('$destroy', unbind);
        };

        msgBus.events = {
            profile: {
                loaded: 'profile:loaded',
                updated: 'profile:updated'
            },
            translation: {
                loaded: 'translation:loaed'
            },
            viewContent: {
                loaded: '$viewContentLoaded'
            },
            loading: {
                show: 'loading:show',
                hide: 'loading:hide',
                ready: 'loading:ready'
            },
            wechatLogonCallback: {
                handled: 'wechatLogonCallback:handled'
            }
        };

        msgBus.showLoading = function () {
            if (angular.bplus.loading && angular.bplus.loading.ready === true) {
                msgBus.emitMsg(msgBus.events.loading.show);
            } else {
                msgBus.onMsg(msgBus.events.loading.ready, $rootScope, function () {
                    msgBus.emitMsg(msgBus.events.loading.show);
                });
            }
        };
        msgBus.hideLoading = function () {
            msgBus.emitMsg(msgBus.events.loading.hide);
        };
        msgBus.notifyLoadingReady = function () {
            msgBus.emitMsg(msgBus.events.loading.ready);
        };
        msgBus.onMemberLoaded = function ($scope, callback) {
            if ($scope.memberLoaded) {
                callback();
            } else {
                msgBus.onMsg(msgBus.events.profile.loaded, $scope, callback);
            }
        };
        msgBus.notifyWechatLogonCallbackHandled = function () {
            msgBus.emitMsg(msgBus.events.wechatLogonCallback.handled);
        };
        msgBus.onWechatLogonCallbackHandled = function ($scope, callback) {
            msgBus.onMsg(msgBus.events.wechatLogonCallback.handled, $scope, callback);
        };

        return msgBus;
    }]);