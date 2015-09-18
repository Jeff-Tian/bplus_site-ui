(function(exports) {
	exports.chinaMap = function($http, $translate, $filter) {
		return {
			restrict: 'AE',
			require: 'ngModel',
			template: '<div id="main" style="height:400px">',
			link: function($scope, $element, attrs, ngModel) {
				require.config({
					paths: {
						echarts: 'bower/echarts/build/dist'
					}
				});
				//使用
				require(
					[
						'echarts',
						'echarts/chart/map',
					],
					function(ec) {
						//加载中国地图（分区域）           
						var jsonPath = '/js/page/map/geoJson/area-' + $translate.preferredLanguage() + '.json';
						require('echarts/util/mapData/params').params.area = {
							getGeoJson: function(callback) {
								$.getJSON(jsonPath, callback);
							}
						};

						// 基于准备好的dom，初始化echarts图表
						var myChart = ec.init(document.getElementById('main'));
						var mapType = ['area', $filter('translate')('MapDongBei'), $filter('translate')('MapHuaBei'), $filter('translate')('MapHuaDong'), $filter('translate')('MapHuaNan'), $filter('translate')('MapHuaZhong'), $filter('translate')('MapXiNan'), $filter('translate')('MapXiBei'), $filter('translate')('MapGangAoTai')];
						var result = '';
						var option = {
							tooltip: {
								trigger: 'item',
								formatter: function(params, ticket, callback) {
									switch (params[1]) {
										case '东北地区':
										case 'DoneBei':
											result = $filter('translate')('MapDongBeiList');
											break;
										case '华北地区':
										case 'HuaBei':
											result = $filter('translate')('MapHuaBeiList');

											break;
										case '华东地区':
										case 'HuaDong':
											result = $filter('translate')('MapHuaDongList');

											break;
										case '华南地区':
										case 'HuaNan':
											result = $filter('translate')('MapHuaNanList');

											break;
										case '华中地区':
										case 'HuaZhong':
											result = $filter('translate')('MapHuaZhongList');

											break;
										case '西南地区':
										case 'XiNan':
											result = $filter('translate')('MapXiNanList');

											break;
										case '西北地区':
										case 'XiBei':
											result = $filter('translate')('MapXiBeiList');

											break;
										case '港澳台':
										case 'GangAoTai':
											result = $filter('translate')('MapGangAoTaiList');

											break;
									}
									return result;
								}
							},
							series: [{
								name: '中国',
								type: 'map',
								mapType: 'area',
								selectedMode: 'single',
								itemStyle: {
									normal: {
										label: {
											show: true
										},
									},
									emphasis: { // 也是选中样式
										color: '#ff3c42',
										label: {
											show: true,
											textStyle: {
												color: '#fff'
											}
										}
									}
								},
								data: []
							}]
						};

						// 为echarts对象加载数据 
						myChart.setOption(option);

						var ecConfig = require('echarts/config');
						myChart.on(ecConfig.EVENT.MAP_SELECTED, function(param) {
							var selected = param.selected;
							var str = '';
							for (var p in selected) {
								if (selected[p]) {
									str = p;
								}
							}
							ngModel.$setViewValue(str);
						});
					}
				);
			}
		};
	};

	exports.chinaMap.$inject = ['$http', '$translate', '$filter'];

})(angular.bplus = angular.bplus || {});