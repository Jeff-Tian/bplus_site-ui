define([
  "text!./upload.html"
], function(template) {
    return function(agModel) {
        agModel.directive("upload", ['uploadHandlerService', function(uploadService) {
            return {
                restrict: "A",
                scope: {
                    handle: '='
                },
                template: template,
                link: function($scope, $element) {
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
        });
    }
})
