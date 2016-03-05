/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').factory('ZtRunnerService', ZtRunnerService);
    
    ZtRunnerService.$inject = ['$q', '$interval'];
    
    function ZtRunnerService($q, $interval) {
        return {
            createNewTimer: createNewTimer,
            createNewStopwatch: createNewStopwatch,
            tickTimer: tickTimer,
            startTimers: startTimers,
            stopTimers: stopTimers,
            resetTimers: resetTimers
        };
        
        function createPrototype() {
            return {
                isRunning: false,
            };
        }
        
        function createNewTimer() {
            return $q.when(true).then(function () {
                var timer = Object.create(createPrototype());
                timer.type = 'Timer';
                timer.value = 300;
                timer.startValue = 300;
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
                stopwatch.startValue = 0;
                stopwatch.valueText = '00:00';
                stopwatch.multiplier = 1;
                return stopwatch;
            });
        }
        
        function _updateText(t) {
            var pad = '00';
            var min = Math.floor(t.value / 60).toString();
            var sec = Math.floor(t.value % 60).toString();
            var minText = '{0}{1}'.replace('{0}', pad).replace('{1}', min).slice(-Math.max(pad.length, min.length));
            var secText = '{0}{1}'.replace('{0}', pad).replace('{1}', sec).slice(-Math.max(pad.length, sec.length));
            t.valueText = '{0}:{1}'.replace('{0}', minText).replace('{1}', secText);
        }
        
        function _tickTimer(t) {
            t.value = Math.max(0, t.value + t.multiplier);
            _updateText(t);
        }
        
        function tickTimer(timer) {
            return $q.when(true).then(function () {
                _tickTimer(timer);
                return timer;
            });
        }
        
        function _startTimer(timer) {
            if(!timer.stop) {
                var delay = 1000;
                timer.stop = $interval(_tickTimer, delay, 0, true, timer);
            }
            timer.isRunning = true;
        }
        
        function startTimers(timers) {
            return $q.when(true).then(function () {
                timers.forEach(_startTimer);
                return timers;
            });
        }
        
        function _stopTimer(timer) {
            if(timer.stop) {
                $interval.cancel(timer.stop);
                delete timer.stop;
            }
            timer.isRunning = false;
        }
        
        function stopTimers(timers) {
            return $q.when(true).then(function () {
                timers.forEach(_stopTimer);
                return timers;
            });
        }
        
        function _resetTimer(timer) {
            _stopTimer(timer);
            timer.value = timer.startValue;
            _updateText(timer);
        }
        
        function resetTimers(timers) {
            return $q.when(true).then(function () {
                timers.forEach(_resetTimer);
                return timers;
            });
        }
    }
})();