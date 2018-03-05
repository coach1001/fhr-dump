angular.module('appClient').controller('TopNavCtrl', function($scope, state, $uibModal/*ipc*/) {
	var vm = this;
	vm.state = angular.extend(state);

	vm.exitDiag = function() {
		$uibModal.open({
			templateUrl: 'partial/modal/confirm/confirm.html',
			controller: 'ConfirmCtrl as vm',
			size :'lg',
			resolve: {
				message: function() {
					return 'Exit Application';
				}
			}
		}).result.then(function(result) {
			var msg = { appdirective: true, exit: true, message: 'Main Menu Exit', minimize: false };
			/*ipc.send(msg);*/
		});
	};

	vm.minApp = function() {
			var msg = { appdirective: true, exit: false, message: 'Minify Application', minimize: true };
			/*ipc.send(msg);		*/
	};

});
