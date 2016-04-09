/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').controller('ZtRunnerController', ZtRunnerController);
    
    ZtRunnerController.$inject = ['$scope', '$q', 'ZtRunnerService', 'ZtMessagesService'];
    
    function ZtRunnerController($scope, $q, ztRunnerService, ztMessagesService) {
        var vm = this;
        
        activate();
        
        $scope.$on('$destroy', function () {
            ztMessagesService.unsubscribeAll(vm);
        });
        
        function activate() {
            vm.timers = [];
            vm.addTimer = addTimer;
            vm.addStopwatch = addStopwatch;
            vm.deleteTimer = deleteTimer;
            vm.deleteAll = deleteAll;
            vm.stopTimer = stopTimer;
            vm.stopAll = stopAll;
            vm.startTimer = startTimer;
            vm.startAll = startAll;
            vm.resetTimer = resetTimer;
            vm.resetAll = resetAll;
            vm.editTimer = editTimer;
            vm.saveEdit = saveEdit;
            vm.cancelEdit = cancelEdit;
            vm.updateEdit = updateEdit;
            
            ztMessagesService.subscribeOpNewTimer(vm, addTimer);
            ztMessagesService.subscribeOpNewStopwatch(vm, addStopwatch);
            ztMessagesService.subscribeOpDeleteTimer(vm, deleteTimer);
            ztMessagesService.subscribeOpDeleteAllTimers(vm, deleteAll);
            ztMessagesService.subscribeOpStartTimer(vm, startTimer);
            ztMessagesService.subscribeOpStopTimer(vm, stopTimer);
            ztMessagesService.subscribeOpResetTimer(vm, resetTimer);
            ztMessagesService.subscribeOpStartAllTimers(vm, startAll);
            ztMessagesService.subscribeOpStopAllTimers(vm, stopAll);
            ztMessagesService.subscribeOpResetAllTimers(vm, resetAll);
            ztMessagesService.subscribeOpEditTimer(vm, editTimer);
            ztMessagesService.subscribeOpSaveEdit(vm, saveEdit);
            ztMessagesService.subscribeOpCancelEdit(vm, cancelEdit);
            ztMessagesService.subscribeOpUpdateEdit(vm, updateEdit);
            
            // We will start off with 1 stopwatch
            addStopwatch();
        }
        
        function addTimer() {
            return $q.when(true).then(function () {
                return ztRunnerService.createNewTimer();
            }).then(function (timer) {
                vm.timers.push(timer); 
                return timer;
            });
        }
        
        function addStopwatch() {
            return $q.when(true).then(function () {
                return ztRunnerService.createNewStopwatch();
            }).then(function (stopwatch) {
                vm.timers.push(stopwatch);
                return stopwatch;
            });
        }
        
        function deleteAll() {
            return $q.when(true).then(function () {
                return ztRunnerService.stopTimers(vm.timers);
            }).then(function () {
                vm.timers = [];
                return 0;
            });
        }
        
        function deleteTimer(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.stopTimers([timer]);
            }).then(function () {
                var index = vm.timers.indexOf(timer);
                vm.timers.splice(index, 1);
                return index;
            });
        }
        
        function startTimer(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.startTimers([timer]);
            });
        }
        
        function stopTimer(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.stopTimers([timer]);
            });
        }
        
        function resetTimer(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.resetTimers([timer]);
            });
        }
        
        function startAll() {
            return $q.when(true).then(function () {
                return ztRunnerService.startTimers(vm.timers);
            });
        }
        
        function stopAll() {
            return $q.when(true).then(function () {
                return ztRunnerService.stopTimers(vm.timers);
            });
        }
        
        function resetAll() {
            return $q.when(true).then(function () {
                return ztRunnerService.resetTimers(vm.timers);
            });
        }
        
        function editTimer(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.prepareForEdit(timer);
            });
        }
        
        function saveEdit(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.saveEdit(timer); 
            });
        }
        
        function cancelEdit(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.finishEdit(timer); 
            });
        }
        
        function updateEdit(timer) {
            return $q.when(true).then(function () {
                return ztRunnerService.checkEdit(timer);
            });
        }
    }
})();