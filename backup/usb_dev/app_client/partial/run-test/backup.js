/*<canvas class="chart chart-line" chart-data="vm.data" chart-series="vm.series" chart-options="vm.options"></canvas>*/

angular.module('appClient').controller('RunTestCtrl', function($scope, $interval) {
	var vm = this;
	var  milli_seconds = 0;	
	var timeBase = 1000;// milliseconds
	var timeBaseSeconds = 1;
	var maxTimeBase = 60;
	var timer;

	
	vm.series = ['Load'];//can add more	
	
	vm.timeBase = 500;

	vm.data = [//can add more
		[
			{ x: 0, y: 0 },
		]
	];

	vm.options = {
		animation:false,
		tooltips: {
			enabled : false
		},
		scales: {
			yAxes: [{
				type: 'linear',
				position: 'left',
				ticks:{
					min: 0,
					max: 60
				}
			}],
			xAxes: [{
				type: 'linear',
				position: 'bottom',
				ticks: {
					min: 0,
					max: maxTimeBase,
					fixedStepSize: 5,
					stepSize : 5,
					maxRotation : 0
				}
			}]
		}
	};


	function callAtInterval() {
		milli_seconds += timeBase;
		if(milli_seconds/1000 > maxTimeBase ){
			vm.data[0].shift();
			vm.options.scales.xAxes[0].ticks.min = Math.round((vm.options.scales.xAxes[0].ticks.min + timeBaseSeconds)*10)/10;
			vm.options.scales.xAxes[0].ticks.max = Math.round((vm.options.scales.xAxes[0].ticks.max + timeBaseSeconds)*10)/10;
		}

		vm.data[0].push({ x: milli_seconds / 1000, y: milli_seconds / 1000 });
		console.log(vm.data[0]);
	}
	
	timer = $interval(callAtInterval, timeBase);
	
	$scope.$on('$destroy',function(){
		$interval.cancel(timer);
	});

});
