/*global module, inject*/
(function () {
    'use strict';
    
    describe('ZtOperationsController', function () {
        var controller;
        var q;
        var controllerArgs;
        var ztOperationsSvc;
        
        beforeEach(module('ZTimer'));
    
        beforeEach(inject(function($controller, $q, $rootScope, ZtOperationsService) {
            controller = $controller;
            controllerArgs = {$scope: $rootScope.$new()};
            ztOperationsSvc = ZtOperationsService;
            q = $q;
            
            spyOn(ztOperationsSvc, 'publishAddNewTimer').and.returnValue($q.when(true));
            spyOn(ztOperationsSvc, 'publishAddNewStopwatch').and.returnValue($q.when(true));
            spyOn(ztOperationsSvc, 'publishResetAllTimers').and.returnValue($q.when(true));
            spyOn(ztOperationsSvc, 'publishStartAllTimers').and.returnValue($q.when(true));
            spyOn(ztOperationsSvc, 'publishStopAllTimers').and.returnValue($q.when(true));
            spyOn(ztOperationsSvc, 'publishDeleteAllTimers').and.returnValue($q.when(true));
        })); 
        
        function createTarget() {
            return controller('ZtOperationsController', controllerArgs);
        }
        
        it('Adds a new timer.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.addNewTimer();
            // Assert 
            expect(ztOperationsSvc.publishAddNewTimer).toHaveBeenCalled();
        });
        
        it('Adds a new stopwatch.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.addNewStopwatch();
            // Assert 
            expect(ztOperationsSvc.publishAddNewStopwatch).toHaveBeenCalled();
        });
        
        it('Resets all timers.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.resetAllTimers();
            // Assert
            expect(ztOperationsSvc.publishResetAllTimers).toHaveBeenCalled();
        });
        
        it('Starts all timers.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.startAllTimers();
            // Assert
            expect(ztOperationsSvc.publishStartAllTimers).toHaveBeenCalled();
        });
        
        it('Stops all timers.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.stopAllTimers();
            // Assert
            expect(ztOperationsSvc.publishStopAllTimers).toHaveBeenCalled();
        });
        
        it('Deletes all timers.', function () {
            // Arrange
            var target = createTarget();
            // Act 
            target.deleteAllTimers();
            // Assert
            expect(ztOperationsSvc.publishDeleteAllTimers).toHaveBeenCalled();
        });
    });
})();