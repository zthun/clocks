/*global module, inject*/
(function () {
    'use strict';
    
    describe('ZtOperationsService', function () {
        var target;
        var scope;
        var zPubSub;
        
        beforeEach(module('ZTimer'));
        
        beforeEach(inject(function(ZtOperationsService, $rootScope, ZtMessagesService) {
            target = ZtOperationsService;
            scope = $rootScope;
            zPubSub = ZtMessagesService;
            
            spyOn(zPubSub, 'publishOpNewTimer').and.callThrough();
            spyOn(zPubSub, 'publishOpDeleteAllTimers').and.callThrough();
            spyOn(zPubSub, 'publishOpResetAllTimers').and.callThrough();
            spyOn(zPubSub, 'publishOpStartAllTimers').and.callThrough();
            spyOn(zPubSub, 'publishOpStopAllTimers').and.callThrough();
        }));
        
        describe('New Timers', function () {
            it('publishes the OpNewTimer command.', function () {
                // Arrange & Act
                target.publishAddNewTimer();
                scope.$apply();
                // Assert
                expect(zPubSub.publishOpNewTimer).toHaveBeenCalled();
            });
        });
        
        describe('Delete All Timers', function () {
            it('publishes the OpDeleteAllTimers command.', function () {
                // Arrange & Act
                target.publishDeleteAllTimers();
                scope.$apply();
                // Assert
                expect(zPubSub.publishOpDeleteAllTimers).toHaveBeenCalled();
            });
        });
        
        describe('Reset All Timers', function () {
            it('publishes the OpResetAllTimers command.', function () {
                // Arrange & Act
                target.publishResetAllTimers();
                scope.$apply();
                // Assert
                expect(zPubSub.publishOpResetAllTimers).toHaveBeenCalled();
            });
        });
        
        describe('Start All Timers', function () {
            it('publishes the OpStartAllTimers command.', function () {
                // Arrange & Act
                target.publishStartAllTimers();
                scope.$apply();
                // Assert
                expect(zPubSub.publishOpStartAllTimers).toHaveBeenCalled();
            });
        });
        
        describe('Stop All Timers', function () {
            it('publishes the OpStopAllTimers command.', function () {
                // Arrange & Act
                target.publishStopAllTimers();
                scope.$apply();
                // Assert
                expect(zPubSub.publishOpStopAllTimers).toHaveBeenCalled();
            });
        });
    });
})();