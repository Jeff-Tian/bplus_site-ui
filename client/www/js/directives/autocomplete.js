(function (exports) {
    exports.autoComplete = function ($http) {
        var findScopeValue = function($scope, sourceStr) {
            return sourceStr.split(".").reduce(function(target, key) {
                if (target){
                    return target[key];
                } else {
                    return null;
                }
            }, $scope)
        }
        return {
            link: function (scope, element, attrs) {
                debugger;
                var lng = angular.bplus.localeHelper.getLocale(window.location.pathname);
                var url = attrs.datasourceBplusAutocomplete ? ('/mock/' + attrs.datasourceBplusAutocomplete.replace('.json', '.' + lng + '.json')) : undefined;
                if (url) {
                    var dataSource = findScopeValue(scope, url);
                    if (dataSource) {
                        $(element).autocomplete({
                            lookup: dataSource,
                            onSelect: function (suggestion) {
                                var ngModelString = $(this).attr('ng-model');
                                findScopeValue(scope, ngModelString) = suggestion.value;
                            }
                        });
                    } else {
                        $http.get(url).success(function (data) {
                            $(element).autocomplete({
                                lookup: data,
                                onSelect: function (suggestion) {
                                    var ngModelString = $(this).attr('ng-model');
                                    findScopeValue(scope, ngModelString) = suggestion.value;
                                    // var a = ngModelString.split('.');

                                    // scope[a[0]][a[1]] = suggestion.value;
                                }
                            });
                        });
                    }
                }
            }
        };
    };

    exports.autoComplete.$inject = ['$http'];
})(angular.bplus = angular.bplus || {});