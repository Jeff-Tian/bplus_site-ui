define([
    'angular',
    'jquery',
    'bplus-ui/../jquery-autocomplate/dist/jquery.autocomplete.min'
], function (
    angular,
    $,
    jqueryAutocomplate
) {
    return function (agModule) {
        agModule.directive('bplusAutocomplate', ['$http', function ($http) {
            var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
            function link(scope, element, attrs) {
                var url = attrs.datasourceBplusAutocomplate ? ('/mock/' + attrs.datasourceBplusAutocomplate.replace('.json', '.' + lng + '.json')) : undefined;
                if (url) {
                    $http.get(url).success(function(data) {
                        $(element).autocomplete({
                            lookup: data
                        });
                    });
                }
            }
            return {
                link: link
            };
        }]);
    };
});