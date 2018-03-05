angular.module('appClient').controller('ConfirmCtrl',function($scope,$uibModalInstance,message){
	var vm = this;
	vm.message = angular.extend(message);

	vm.Yes = function(){
		$uibModalInstance.close();
	};
	
	vm.No = function(){
		$uibModalInstance.dismiss();
	};

});