(function (exports) {
    exports.UnfinishedCoursesCtrl = function ($scope) {

        $scope.courses = [{
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '30'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '40'
        }, {
            name: '咨询公司求职,如何修改简历?',
            teacher: 'Julia合得国际创始人,HBS Alumni',
            startDate: '2016年1月26日(周四)',
            startTime: '20:00',
            endTime: '21:00',
            status: '100'
        }];

        $scope.showDimmer = function($event){
            $($event.target).closest('.dimmable').dimmer('show');
        };

        $scope.hideDimmer = function($event){
            $($event.currentTarget).dimmer('hide');
        };
    };

    exports.UnfinishedCoursesCtrl.$inject = ['$scope'];
})(angular.bplus = angular.bplus || {});