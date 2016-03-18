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
            resetTimers: resetTimers,
            prepareForEdit: prepareForEdit,
            saveEdit: saveEdit,
            finishEdit: finishEdit
        };
        
        function _create(type, value, multiplier) {
            var t =  {
                isRunning: false,
                type: type,
                value: value,
                startValue: value,
                multiplier: multiplier,
                valueText: '00:00'
            };
            _updateText(t);
            return t;
        }
        
        function createNewTimer() {
            return $q.when(true).then(function () {
                return _create('Timer', 300, -1);
            });
        }
        
        function createNewStopwatch() {
            return $q.when(true).then(function () {
                return _create('Stopwatch', 0, 1);
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
        
        function _createEdit(timer) {
            return { 
                minutes: Math.floor(timer.value / 60),
                seconds: Math.floor(timer.value % 60)
            };
        }
        
        function prepareForEdit(timer) {
            return $q.when(true).then(function () {
                return stopTimers([timer]);
            }).then(function () {
                timer.edit = _createEdit(timer);
                return timer;
            });
        }
        
        function saveEdit(timer) {
            return $q.when(true).then(function () {
                return timer.edit ? true : $q.reject('The timer is not being edited.'); 
            }).then(function () {
                var value = Math.floor(timer.edit.minutes * 60) + timer.edit.seconds;
                timer.value = value;
                timer.startValue = value;
                _updateText(timer);
                return finishEdit(timer);
            });
        }
        
        function finishEdit(timer) {
            return $q.when(true).then(function () {
                return timer.edit ? true : $q.reject('The timer is not being edited.');
            }).then(function () {
                delete timer.edit;
                return timer;
            });
        }
    }
})();