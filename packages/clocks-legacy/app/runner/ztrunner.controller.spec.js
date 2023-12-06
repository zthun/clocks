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
            spyOn(ztRunnerSvc, 'prepareForEdit').and.returnValue(q.when(true));
            spyOn(ztRunnerSvc, 'saveEdit').and.returnValue(q.when(true));
            spyOn(ztRunnerSvc, 'finishEdit').and.returnValue(q.when(true));
            spyOn(ztRunnerSvc, 'checkEdit').and.returnValue(q.when(true));
        }));
        
        function createTarget() {
            var target = controller('ZtRunnerController', controllerArgs);
            // Make sure the target timer list is empty. 
            ztMessagesSvc.publishOpDeleteAllTimers();
            scope.$apply();
            return target;
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
        
        describe('Start', function () {
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
        });
        
        describe('Stop', function () {
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
        });
        
        describe('Reset', function () {
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
        
        describe('Edit', function () {
            it('Begins an edit.', function () {
                // Arrange
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                var timer = target.timers[0];
                // Act 
                ztMessagesSvc.publishOpEditTimer(timer);
                scope.$apply();
                // Assert 
                expect(ztRunnerSvc.prepareForEdit).toHaveBeenCalledWith(timer);
            });
            
            it('Saves an edit.', function () {
                // Arrange
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                var timer = target.timers[0];
                ztMessagesSvc.publishOpEditTimer(timer);
                scope.$apply();
                // Act 
                ztMessagesSvc.publishOpSaveEdit(timer);
                scope.$apply();
                // Assert 
                expect(ztRunnerSvc.saveEdit).toHaveBeenCalledWith(timer);
            });
            
            it('Cancels an edit.', function () {
                // Arrange
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                var timer = target.timers[0];
                ztMessagesSvc.publishOpEditTimer(timer);
                scope.$apply();
                // Act 
                ztMessagesSvc.publishOpCancelEdit(timer);
                scope.$apply();
                // Assert 
                expect(ztRunnerSvc.finishEdit).toHaveBeenCalledWith(timer);
            });
            
            it('Updates the edit error state.', function () {
                // Arrange 
                var target = createTarget();
                ztMessagesSvc.publishOpNewTimer();
                scope.$apply();
                var timer = target.timers[0];
                // Act 
                ztMessagesSvc.publishOpUpdateEdit(timer);
                scope.$apply();
                // Assert
                expect(ztRunnerSvc.checkEdit).toHaveBeenCalledWith(timer);
            });
        });
    });
})();