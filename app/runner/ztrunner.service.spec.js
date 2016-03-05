/*global module, beforeEach, inject*/
(function () {
    'use strict';
    
    describe('ZtRunnerService', function () {
        var target;
        var scope;
        var q;
        
        beforeEach(module('ZTimer'));
        
        beforeEach(inject(function(ZtRunnerService, $rootScope, $q) {
            target = ZtRunnerService;
            scope = $rootScope;
            q = $q;
        }));
        
        describe('Timer Creation', function () {
            it('constructs a timer object.', function () {
                // Arrange 
                var value;
                // Act 
                target.createNewTimer().then(function (timer) { value = timer.type; });
                scope.$apply();
                // Assert
                expect(value).toBe('Timer');
            });
            
            it('constructs a timer that counts down.', function () {
                // Arrange
                var value; 
                // Act 
                target.createNewTimer().then(function (timer) { value = timer.multiplier; });
                scope.$apply();
                // Assert 
                expect(value).toBe(-1);
            });
        });
        
        describe('Stopwatch Creation', function () {
            it('constructs a stopwatch object.', function () {
                // Arrange
                var value;
                // Act 
                target.createNewStopwatch().then(function (stopwatch){ value = stopwatch.type; });
                scope.$apply();
                // Assert
                expect(value).toBe('Stopwatch');
            });
            
            it('constructs a timer that counts up.', function () {
                // Arrange
                var value;
                // Act
                target.createNewStopwatch().then(function (stopwatch) { value = stopwatch.multiplier; });
                scope.$apply();
                // Assert 
                expect(value).toBe(1);
            });
        });
        
        describe('Running Timers', function () {
            var timer;
            var stopwatch;
            var timers;
            
            beforeEach(function () {
                target.createNewStopwatch().then(function (sw) { 
                    stopwatch = sw; 
                    return sw;
                }).then(function () { 
                    return target.createNewTimer(); 
                }).then(function (tm) { 
                    timer = tm; 
                    return tm;
                }).then(function () { 
                    timers = [timer, stopwatch]; 
                    return timers;
                });
                scope.$apply();
            });
            
            afterEach(function () {
                target.stopTimers(timers);
            });
            
            it('runs the timers.', function () {
                // Arrange & Act 
                target.startTimers(timers);
                scope.$apply();
                // Assert
                timers.forEach(function (t) { expect(t.isRunning).toBeTruthy(); });
            });
            
            it('stops the timers.', function () {
                // Arrange
                var start = target.startTimers(timers);
                // Act 
                start.then(function () { return target.stopTimers(timers); });
                scope.$apply();
                // Assert 
                timers.forEach(function (t) { expect(t.isRunning).toBeFalsy(); });
            });
            
            it('resets the timer values.', function () {
                // Arrange 
                target.tickTimer(timer);
                target.tickTimer(stopwatch);
                scope.$apply();
                // Act 
                target.resetTimers(timers);
                scope.$apply();
                // Assert
                expect(timer.value).toBe(timer.startValue);
                expect(stopwatch.value).toBe(stopwatch.startValue);
            });
            
            it('updates the timer value on tick.', function () {
                // Arrange
                var currentSeconds = timer.value;
                // Act 
                target.tickTimer(timer);
                scope.$apply();
                // Assert  
                expect(timer.value).toBe(currentSeconds - 1);
            });
            
            it('does not start a timer if it was already started.', function(){
                // Arrange 
                timer.isRunning = false;
                target.startTimers(timers);
                scope.$apply();
                // Act 
                target.startTimers(timers);
                scope.$apply();
                // Assert
                expect(timer.isRunning).toBeTruthy();
            });
            
            it('stops a timer if it ticks to 0.', function () {
                // Arrange
                timer.value = 1;
                // Act 
                target.tickTimer(timer);
                scope.$apply();
                // Assert
                expect(timer.isRunning).toBeFalsy();
            });
            
            it('does not stop a timer if it was never started.', function () {
                // Arrange & Act
                target.stopTimers(timers);
                target.stopTimers(timers);
                // Assert 
                expect(timer.isRunning).toBeFalsy();
                expect(stopwatch.isRunning).toBeFalsy();
            });
            
            it('keeps a timer at 0 if it ticks at 0.', function () {
                // Arrange
                timer.value = 0;
                // Act 
                target.tickTimer(timer);
                scope.$apply();
                // Assert
                expect(timer.value).toBe(0);
            });
            
            it('updates the stopwatch value on tick.', function () {
                // Arrange
                var currentSeconds = stopwatch.value;
                // Act
                target.tickTimer(stopwatch);
                scope.$apply();
                // Assert
                expect(stopwatch.value).toBe(currentSeconds + 1);
            });
            
            it('updates the timer text on tick.', function () {
                // Arrange 
                timer.value = 120;
                q.when(true)
                    .then(function () { return target.tickTimer(timer); })  // 01:59
                    .then(function () { return target.tickTimer(timer); })  // 01:58
                    .then(function () { return target.tickTimer(timer); }); // 01:57
                scope.$apply();
                // Act 
                var value = timer.valueText;
                // Assert
                expect(value).toBe('01:57');
            });
        });
    });
})();