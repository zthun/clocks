/*global module, inject, angular*/
(function () {
    'use strict';
    
    describe('ZtRunnerController', function () {
        var controller;
        var controllerArgs;
        var ztMessagesSvc;
        var ztRunnerSvc;
        var timer;
        var stopwatch;
        var scope;
        var q;
        
        beforeEach(module('ZTimer'));
        
        beforeEach(inject(function($controller, $q, $rootScope, ZtMessagesService, ZtRunnerService) {
            ztMessagesSvc = ZtMessagesService;
            controller = $controller;
            ztRunnerSvc = ZtRunnerService;
            q = $q;
            scope = $rootScope;
            
            controllerArgs = {
                $scope: $rootScope.$new()
            };
            
            timer = {};
            stopwatch = {};
            
            spyOn(ztRunnerSvc, 'createNewTimer').and.returnValue(q.when(timer));
            spyOn(ztRunnerSvc, 'createNewStopwatch').and.returnValue(q.when(stopwatch));
            spyOn(ztRunnerSvc, 'stopTimers').and.callFake(function(timers) { return q.when(timers.length); });
            spyOn(ztRunnerSvc, 'startTimers').and.callFake(function (timers){ return q.when(timers.length); });
            spyOn(ztRunnerSvc, 'resetTimers').and.callFake(function (timers){ return q.when(timers.length); });
        }));
        
        function createTarget() {
            return controller('ZtRunnerController', controllerArgs);
        }
        
        describe('Add', function () {
            it('Adds a new timer on the new timer message.', function () {
                // Arrange 
                var target = createTarget();
                // Act 
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                // Assert
                expect(target.timers[0]).toBe(timer);
            });
            
            it('Adds a new stopwatch on the new timer message.', function () {
                // Arrange
                var target = createTarget();
                // Act 
                ztMessagesSvc.publishOpNewStopwatch();
                scope.$apply();
                // Assert
                expect(target.timers[0]).toBe(stopwatch);
            });
        });
        
        describe('Delete', function () {
             it('Deletes all timers.', function () {
                // Arrange
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                ztMessagesSvc.publishOpNewStopwatch();
                scope.$apply();
                // Act 
                ztMessagesSvc.publishOpDeleteAllTimers();
                scope.$apply();
                // Assert
                expect(target.timers.length).toBe(0);
            });
            
            it('Stops all timers before deleting them.', function () {
                // Arrange 
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                ztMessagesSvc.publishOpNewStopwatch();
                scope.$apply();
                var timers = angular.copy(target.timers);
                // Act 
                ztMessagesSvc.publishOpDeleteAllTimers();
                scope.$apply();
                // Assert 
                expect(ztRunnerSvc.stopTimers).toHaveBeenCalledWith(timers);
            });
        
            it('Deletes the timer on the delete timer message.', function () {
                // Arrange 
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                // Act 
                ztMessagesSvc.publishOpDeleteTimer(target.timers[0]);
                scope.$apply();
                // Assert 
                expect(target.timers.length).toBe(0);
            });
            
            it('Stops the individual timer before deleting it.', function () {
                // Arrange 
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                var timer = target.timers[0];
                // Act 
                ztMessagesSvc.publishOpDeleteTimer(target.timers[0]);
                scope.$apply();
                // Assert 
                expect(ztRunnerSvc.stopTimers).toHaveBeenCalledWith([timer]);
            });
        
        });
        
        it('Starts an individual timer.', function () {
            // Arrange 
            var target = createTarget();
            ztMessagesSvc.publishOpNewTimer();
            scope.$apply();
            var timer = target.timers[0];
            // Act 
            ztMessagesSvc.publishOpStartTimer(timer);
            scope.$apply();
            // Assert 
            expect(ztRunnerSvc.startTimers).toHaveBeenCalledWith([timer]);
        });
        
        it('Stops an individual timer.', function () {
            // Arrange 
            var target = createTarget();
            ztMessagesSvc.publishOpNewStopwatch();
            scope.$apply();
            var timer = target.timers[0];
            // Act 
            ztMessagesSvc.publishOpStopTimer(timer);
            scope.$apply();
            // Assert 
            expect(ztRunnerSvc.stopTimers).toHaveBeenCalledWith([timer]);
        });
        
        it('Resets an individual timer.', function () {
            // Arrange 
            var target = createTarget();
            ztMessagesSvc.publishOpNewTimer();
            scope.$apply();
            var timer = target.timers[0];
            // Act 
            ztMessagesSvc.publishOpResetTimer(timer);
            scope.$apply();
            // Assert 
            expect(ztRunnerSvc.resetTimers).toHaveBeenCalledWith([timer]);
        });
        
        
        it('Starts all timers', function () {
            // Arrange
            var target = createTarget();
            ztMessagesSvc.publishOpNewTimer();
            ztMessagesSvc.publishOpNewStopwatch();
            scope.$apply();
            // Act 
            ztMessagesSvc.publishOpStartAllTimers();
            scope.$apply();
            // Assert
            expect(ztRunnerSvc.startTimers).toHaveBeenCalledWith(target.timers);
        });
        
        it('Stops all timers.', function () {
            // Arrange
            var target = createTarget();
            ztMessagesSvc.publishOpNewTimer();
            ztMessagesSvc.publishOpNewStopwatch();
            scope.$apply();
            // Act 
            ztMessagesSvc.publishOpStopAllTimers();
            scope.$apply();
            // Assert
            expect(ztRunnerSvc.stopTimers).toHaveBeenCalledWith(target.timers);
        });
        
        it('Resets all timers', function () {
            // Arrange
            var target = createTarget();
            ztMessagesSvc.publishOpNewTimer();
            ztMessagesSvc.publishOpNewStopwatch();
            scope.$apply();
            // Act 
            ztMessagesSvc.publishOpResetAllTimers();
            scope.$apply();
            // Assert
            expect(ztRunnerSvc.resetTimers).toHaveBeenCalledWith(target.timers);
        });
        
    });
})();