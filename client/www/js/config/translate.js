(function (exports) {
    exports.translate = function ($translateProvider) {
        $translateProvider.useLoader('translationLoader');

        $translateProvider.preferredLanguage(exports.localeHelper.getLocale(window.location.pathname));
    };

    exports.translate.$inject = ['$translateProvider'];
})(angular.bplus = angular.bplus || {});