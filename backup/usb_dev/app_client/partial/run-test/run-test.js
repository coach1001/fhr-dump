angular.module('appClient').controller('RunTestCtrl', function($scope, $interval, $window) {
	var vm = this;	
	vm.elapsedTimeMs = 0;		
	var graphUpdateInterval = 25;
	var stopWatchUpdateInterval = 10;
	var graphUpdateTimer = null;
	var stopWatchTimer = null;

	var w = angular.element($window);

	vm.data = [{
		x: [0],
		y: [0],
		type: 'scatter',
		mode: 'lines',
		name: 'Real Rate',
		outlinewidth : 5
	}, {
		x: [0, 30],
		y: [0, 120],
		type: 'scatter',
		mode: 'lines',
		name: 'Required Rate',
		outlinewidth : 5
	}];

	vm.layout = {
		autosize: false,
		height: $window.innerHeight / 1.45,
		margin: {
			l: 30,
			r: 10,
			b: 70,
			t: 70,
			pad: 0
		},
		legend: { x: 0.02, y: 1 },
		/*legend: {'orientation':'h'},*/
		xaxis: { range: [0, 10], fixedrange: true, linewidth : 1, showline : true },
		yaxis: { range: [0, 200], fixedrange: true, linewidth : 1, showline : true}
	};
	vm.options = { showLink: false, displayLogo: false, displayModeBar: false };


	function graphUpdate() {
		
		if (vm.elapsedTimeMs / 1000 > vm.layout.xaxis.range[1]) {

			var x_min = vm.layout.xaxis.range[0];
			var x_max = vm.layout.xaxis.range[1];

			x_min += graphUpdateInterval / 1000;
			x_max += graphUpdateInterval / 1000;

			vm.layout.xaxis.range[0] = x_min;
			vm.layout.xaxis.range[1] = x_max;

			vm.data[0].x.pop();
			vm.data[0].y.pop();
		}

		vm.data[0].x.push(vm.elapsedTimeMs / 1000);
		vm.data[0].y.push(vm.elapsedTimeMs / 1000);
	}
	graphUpdateTimer = $interval(graphUpdate, graphUpdateInterval);

	if ($window.innerWidth === $window.outerWidth) {
		vm.layout.width = $window.innerWidth / 1.8;
	} else {
		vm.layout.width = $window.innerWidth / 1.8;
	}

	w.bind('resize', function() {
		if ($window.innerWidth === $window.outerWidth) {
			vm.layout.width = $window.innerWidth / 2.1;
		} else {
			vm.layout.width = $window.innerWidth / 2.1;
		}
		vm.layout.height = $window.innerHeight / 1.45;		
	});

	$scope.$on('$destroy', function() {
		$interval.cancel(graphUpdateTimer);
		$interval.cancel(stopWatchTimer);
	});

	
	var startTime = new Date();
	function stopWatchUpdate(){
		var now = new Date();
		vm.elapsedTimeMs = now.getTime() - startTime.getTime();
	}
	stopWatchTimer = $interval(stopWatchUpdate, stopWatchUpdateInterval);

});
