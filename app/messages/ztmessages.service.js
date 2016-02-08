/*global angular, zw*/
(function () {
    angular.module('ZTimer').factory('ZtMessagesService', ZtMessagesService);
    
    function ZtMessagesService() {
        var zPubSub = new zw.ZPubSub();
        
        // Commands
        zPubSub.register('OpNewTimer');
        zPubSub.register('OpDeleteAllTimers');
        zPubSub.register('OpResetAllTimers');
        zPubSub.register('OpStartAllTimers');
        zPubSub.register('OpStopAllTimers');
        
        return zPubSub;
    }
})();