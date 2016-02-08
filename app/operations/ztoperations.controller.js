/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').controller('ZtOperationsController', ZtOperationsController);
    
    ZtOperationsController.$inject = ['ZtOperationsService'];
    
    function ZtOperationsController(ztOperationsService) {
        var vm = this;
        
        activate();
        
        function activate() {
            vm.addNewTimer = addNewTimer;
            vm.deleteAllTimers = deleteAllTimers;
            vm.resetAllTimers = resetAllTimers;
            vm.startAllTimers = startAllTimers;
            vm.stopAllTimers = stopAllTimers;
        }
        
        function addNewTimer() {
            ztOperationsService.publishAddNewTimer();
        }
        
        function deleteAllTimers() {
            ztOperationsService.publishDeleteAllTimers();
        }
        
        function resetAllTimers() {
            ztOperationsService.publishResetAllTimers();
        }
        
        function startAllTimers() {
            ztOperationsService.publishStartAllTimers();
        }
        
        function stopAllTimers() {
            ztOperationsService.publishStopAllTimers();
        }
    }
})();