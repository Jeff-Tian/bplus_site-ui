(function(exports) {
	exports.resourceCtrl = function($scope, $translate, $filter) {

		$scope.resource = {
			'pdfs': [{
				name: 'ResourcePDF1',
				path: 'http://7xlpjd.com2.z0.glb.qiniucdn.com/download.pdf'
			}, {
				name: 'ResourcePDF2',
				path: 'http://7xlpjd.com2.z0.glb.qiniucdn.com/download.pdf'
			}, {
				name: 'ResourcePDF3',
				path: 'http://7xlpjd.com2.z0.glb.qiniucdn.com/download.pdf'
			}, {
				name: 'ResourcePDF4',
				path: 'http://7xlpjd.com2.z0.glb.qiniucdn.com/download.pdf'
			}, {
				name: 'ResourcePDF5',
				path: 'http://7xlpjd.com2.z0.glb.qiniucdn.com/download.pdf'
			}],
			'videos': [{
				name: 'ResourceVideo1',
			}, {
				name: 'ResourceVideo2',
			}, {
				name: 'ResourceVideo3',
			}, {
				name: 'ResourceVideo4',
			}, {
				name: 'ResourceVideo5',
			}, {
				name: 'ResourceVideo6',
			}, {
				name: 'ResourceVideo7',
			}, {
				name: 'ResourceVideo8',
			}]
		};

		$scope.open_modal = function(){
			$scope.show_dimmer = true;
		};

		var initItem = function() {
			$scope.css = {
				pdf: false,
				video: false
			};
		};

		var initPage = function() {
			initItem();
			$scope.css.pdf = true;
			$scope.language = $translate.preferredLanguage();
		};

		initPage();

		$scope.selectItem = function(item) {
			switch (item) {
				case 'pdf':
					initItem();
					$scope.css.pdf = true;
					break;
				case 'video':
					initItem();
					$scope.css.video = true;
					break;
			}
		};

	};

	exports.resourceCtrl.$inject = ['$scope', '$translate', '$filter'];

})(angular.bplus = angular.bplus || {});