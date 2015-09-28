(function(exports) {
	exports.gameHome = function() {
		return {
			templateUrl: '../../view-partial/game-home.html',
			scope: {},
			link: function($scope, element) {
				console.log('home');
			}
		};
	};
	exports.gameOfficial = function() {
		return {
			templateUrl: '../../view-partial/game-official.html',
			scope: {},
			link: function($scope, element) {
				console.log('official');
			}
		};
	};
	exports.gameNational = function() {
		return {
			templateUrl: '../../view-partial/game-national.html',
			scope: {},
			link: function($scope, element) {
				console.log('national');
			}
		};
	};
	exports.gameSeason = function() {
		return {
			templateUrl: '../../view-partial/game-season.html',
			scope: {},
			link: function($scope, element) {
				console.log('season');
			}
		};
	};
	exports.gamePersonalRecord = function() {
		return {
			templateUrl: '../../view-partial/game-personal-record.html',
			scope: {},
			link: function($scope, element) {
				console.log('personal-record');
			}
		};
	};
	exports.gameRankingList = function() {
		return {
			templateUrl: '../../view-partial/game-ranking-list.html',
			scope: {},
			link: function($scope, element) {
				console.log('ranking-list');
			}
		};
	};
	exports.gameHome.$inject = [];
	exports.gameOfficial.$inject = [];
	exports.gameNational.$inject = [];
	exports.gameSeason.$inject = [];
	exports.gamePersonalRecord.$inject = [];
	exports.gameRankingList.$inject = [];
})(angular.bplus = angular.bplus || {});