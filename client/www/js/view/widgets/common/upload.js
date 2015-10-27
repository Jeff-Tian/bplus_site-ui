function Upload($http, uploadHandlerService) {
    return {
        restrict: "A",
        scope: {
            handle: '='
        },
        template: '\
<form class="upload-form" method="post" enctype="multipart/form-data">\
    <input class="upload-file" type="file" name="file" filechange model="fileChange"/>\
    <input type="hidden" name="x:category" value="{{category}}"/>\
    <input type="hidden" name="callback" value="{{callback}}"/>\
</form>',
        link: function($scope, $element, $attrs, ngModel) {
            var category = $scope.category = 'upload-' + Math.random().toString();
            var iframe = document.createElement('iframe');
            var form = $element.children('form');
            uploadHandlerService.handle[category] = $scope.handle;
            iframe.name = category;
            iframe.id = category;
            iframe.className = 'upload-iframe';
            document.body.appendChild(iframe);
            $scope.name = 'file';
            $scope.action = service_upload + '/upload/hcd-resource';
            $scope.callback = location.origin + '/upload/callback';
            form.attr('action', $scope.action);
            form.attr('target', category);
            $scope.fileChange = function(event) {
                form.submit();
            };
        }
    };
}
Upload.$inject = ['$http', 'uploadHandlerService'];