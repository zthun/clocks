/*global angular, zw*/
(function () {
    angular.module('ZTimer').factory('ZtMessagesService', ZtMessagesService);
    
    function ZtMessagesService() {
        var zPubSub = new zw.ZPubSub();
        
        // Commands
        zPubSub.register('OpNewTimer');
        zPubSub.register('OpNewStopwatch');
        zPubSub.register('OpDeleteTimer');
        zPubSub.register('OpStartTimer');
        zPubSub.register('OpStopTimer');
        zPubSub.register('OpResetTimer');
        zPubSub.register('OpDeleteAllTimers');
        zPubSub.register('OpResetAllTimers');
        zPubSub.register('OpStartAllTimers');
        zPubSub.register('OpStopAllTimers');
        zPubSub.register('OpEditTimer');
        zPubSub.register('OpSaveEdit');
        zPubSub.register('OpCancelEdit');
        zPubSub.register('OpUpdateEdit');
        
        return zPubSub;
    }
})();