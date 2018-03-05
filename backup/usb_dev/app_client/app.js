angular.module('appClient', ['ui.bootstrap', 'ui.router', 'ngAnimate',/*'electangular',*/'plotly']);

angular.module('appClient').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('main-menu', {
    url: '/main-menu',
    views: {
      'top@': {
        templateUrl: 'partial/top-nav/top-nav.html',
        controller: 'TopNavCtrl as vm',
        resolve: {
          state: function() {
            return 1;
          }
        }
      },
      'main@': {
        templateUrl: 'partial/main-menu/main-menu.html',
        controller: 'MainMenuCtrl as vm',
      }
    }
  });

  $stateProvider.state('run-test', {
    url: '/run-test',
    views: {
      'top@': {
        templateUrl: 'partial/top-nav/top-nav.html',
        controller: 'TopNavCtrl as vm',
        resolve: {
          state: function() {
            return 2;
          }
        }
      },

      'main@': {
        templateUrl: 'partial/run-test/run-test.html',
        controller: 'RunTestCtrl as vm',
      }
    }
  });
  /* Add New States Above */
  $urlRouterProvider.otherwise('/main-menu');

});

angular.module('appClient').run(function($rootScope) {

  $rootScope.safeApply = function(fn) {
    var phase = $rootScope.$$phase;
    if (phase === '$apply' || phase === '$digest') {
      if (fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

});

angular.module('appClient').filter('stopwatchTime', function () {
    return function (input) {
        if(input){
            
            var elapsed = input;//input.getTime();
            var hours = parseInt(elapsed / 3600000,10);
            elapsed %= 3600000;
            var mins = parseInt(elapsed / 60000,10);
            elapsed %= 60000;
            var secs = parseInt(elapsed / 1000,10);
            var ms = elapsed % 1000;

            var hours_s = '' + hours;
            var mins_s = '' + mins;
            var secs_s = '' + secs;
            var ms_s = '' + ms;

            var pad = '00';
            var time_s = 
            pad.substring(0, pad.length - hours_s.length) + hours_s + ':' +
            pad.substring(0, pad.length - mins_s.length) + mins_s + ':' +
            pad.substring(0, pad.length - secs_s.length) + secs_s + ':' +
            pad.substring(0, pad.length - ms_s.length) + ms_s;

            return time_s;
            //return hours + ':' + mins + ':' + secs + ':' + ms;
        }
    };
});