angular.module('appClient').controller('MainMenuCtrl', function($scope, $uibModal/*ipc*/) {
	var vm = this;

	vm.exitDiag = function() {
		$uibModal.open({
			templateUrl: 'partial/modal/confirm/confirm.html',
			controller: 'ConfirmCtrl as vm',
			size : 'lg',
			resolve: {
				message : function(){
					return 'Exit Application';
				}
			}
		}).result.then(function(result) {
			var msg = { appdirective: true, exit: true, message: 'Main Menu Exit', minimize : false};
			/*ipc.send(msg);*/
		});
	};
});
