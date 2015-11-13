(function (exports) {
    exports.autoComplete = function ($http) {
        return {
            link: function (scope, element, attrs, ngModel) {
                var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
                var url = attrs.datasourceBplusAutocomplete ? ('/mock/' + attrs.datasourceBplusAutocomplete.replace('.json', '.' + lng + '.json')) : undefined;

                if (url) {
                    $http.get(url).success(function (data) {
                        $(element).autocomplete({
                            lookup: data,
                            onSelect: function (suggestion) {
                                var ngModelString = $(this).attr('ng-model');
                                var a = ngModelString.split('.');

                                scope[a[0]][a[1]] = suggestion.value;
                            }
                        });
                    });
                }
            }
        };
    };

    exports.autoComplete.$inject = ['$http'];
})(angular.bplus = angular.bplus || {});