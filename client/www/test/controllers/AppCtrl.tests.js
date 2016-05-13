describe('App Controller', function () {
    var scope;

    // load the controller's module
    beforeEach(module('bplusModule'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('AppCtrl', {$scope: scope});
    }));

    // tests start here
    // it('should get avatar url', function () {
    //     expect(scope.getAvatarUrl('http://wx.qlogo.cn/mmopen/HoGxrZYTwPFI41jDzTXXVbTPegxibFlLvvkwTRfPn8XUbicHGtn1khJlWhxia8tuHF9l6E9QvyHia8hqqy6rSX9XRafyt6fdoRtp/0')).toEqual('http://wx.qlogo.cn/mmopen/HoGxrZYTwPFI41jDzTXXVbTPegxibFlLvvkwTRfPn8XUbicHGtn1khJlWhxia8tuHF9l6E9QvyHia8hqqy6rSX9XRafyt6fdoRtp/0');
    // });
});