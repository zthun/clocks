/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').factory('ZtOperationsService', ZtOperationsService);
    
    ZtOperationsService.$inject = ['$q', 'ZtMessagesService'];
    
    function ZtOperationsService($q, zPubSub) {
        return {
            publishAddNewTimer: publishAddNewTimer,
            publishAddNewStopwatch: publishAddNewStopwatch,
            publishDeleteAllTimers: publishDeleteAllTimers,
            publishStartAllTimers: publishStartAllTimers,
            publishStopAllTimers: publishStopAllTimers,
            publishResetAllTimers: publishResetAllTimers
        };
        
        function publishAddNewStopwatch() {
            return $q.when(true).then(function () {
                return zPubSub.publishOpNewStopwatch().firstDefined();
            });
        }
        
        function publishAddNewTimer() {
            return $q.when(true).then(function () {
                return zPubSub.publishOpNewTimer().firstDefined();
            });
        }
        
        function publishDeleteAllTimers() {
            return $q.when(true).then(function () {
                return zPubSub.publishOpDeleteAllTimers().firstDefined();
            });
        }
        
        function publishStartAllTimers() {
            return $q.when(true).then(function () {
                return zPubSub.publishOpStartAllTimers().firstDefined();
            });
        }
        
        function publishStopAllTimers() {
            return $q.when(true).then(function () {
                return zPubSub.publishOpStopAllTimers().firstDefined();
            });
        }
        
        function publishResetAllTimers() {
            return $q.when(true).then(function () {
               return zPubSub.publishOpResetAllTimers().firstDefined();
            });
        }
    }
})();