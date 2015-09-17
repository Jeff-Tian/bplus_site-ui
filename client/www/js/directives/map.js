(function(exports) {
	exports.chinaMap = function($http) {

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
						require('echarts/util/mapData/params').params.area = {
							getGeoJson: function(callback) {
								$.getJSON('js/page/map/geoJson/area.geo.json', callback);
							}
						};

						// 基于准备好的dom，初始化echarts图表
						var myChart = ec.init(document.getElementById('main'));
						var mapType = ['area', '东北地区', '华北地区', '华东地区', '华南地区', '华中地区', '西南地区', '西北地区', '港澳台'];
						var result = '';
						var option = {
							tooltip: {
								trigger: 'item',
								formatter: function (params,ticket,callback) {
									switch(params[1]){
										case '东北地区':
											result = '辽宁、吉林、黑龙江'; break;
										case '华北地区':
											result = '北京、天津、河北、山西、内蒙古'; break;
										case '华东地区':
											result = '山东、江苏、安徽、浙江、福建、上海'; break;
										case '华南地区':
											result = '广东、广西、海南'; break;
										case '华中地区' :
											result = '湖北、湖南、河南、江西'; break;
										case '西北地区':
											result = '宁夏、新疆、青海、陕西、甘肃'; break;
										case '西南地区':
											result = '四川、云南、贵州、西藏、重庆'; break;
										case '港澳台':
											result = '香港、澳门、台湾'; break;
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

	exports.chinaMap.$inject = ['$http'];

})(angular.bplus = angular.bplus || {});