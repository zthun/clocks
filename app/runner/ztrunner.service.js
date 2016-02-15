/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').factory('ZtRunnerService', ZtRunnerService);
    
    ZtRunnerService.$inject = ['$q'];
    
    function ZtRunnerService($q) {
        return {
            createNewTimer: createNewTimer,
            createNewStopwatch: createNewStopwatch,
            startTimers: startTimers,
            stopTimers: stopTimers,
            resetTimers: resetTimers
        };
        
        function createPrototype() {
            return {
                isRunning: false,
                tickHandle: null
            };
        }
        
        function createNewTimer() {
            return $q.when(true).then(function () {
                var timer = Object.create(createPrototype());
                timer.type = 'Timer';
                timer.value = 18000;
                timer.valueText = '05:00';
                timer.multiplier = -1;
                return timer;
            });
        }
        
        function createNewStopwatch() {
            return $q.when(true).then(function () {
                var stopwatch = Object.create(createPrototype());
                stopwatch.type = 'Stopwatch';
                stopwatch.value = 0;
                stopwatch.valueText = '00:00';
                stopwatch.multiplier = 1;
                return stopwatch;
            });
        }
        
        function startTimers(timers) {
            return $q.when(true).then(function () {
                return timers; 
            });
        }
        
        function stopTimers(timers) {
            return startTimers(timers);
        }
        
        function resetTimers(timers) {
            return startTimers(timers);
        }
    }
})();