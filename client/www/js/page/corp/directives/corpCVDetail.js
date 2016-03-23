angular.module('corpModule')
.directive('corpCvDetail', [function () {
    return {
        templateUrl: 'js/page/corp/directives/corpCVDetail.html',
        scope: true,    //Need param: resumeDetail
        link: function($scope) {
            console.log("corpCVDetail");
        }
    };
}])
;