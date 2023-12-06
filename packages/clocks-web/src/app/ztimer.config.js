/*global angular*/
(function () {
    'use strict';
    
    angular.module('ZTimer').config(ZTimerConfig);
    
    ZTimerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    
    function ZTimerConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider.state('ztimer', {
            abstract: true,
            templateUrl: 'src/app/ztimer.html',
        }).state('ztimer.app', {
            url: '/',
            views: {
                runner: {
                    templateUrl: 'src/app/runner/ztrunner.html',
                    controller: 'ZtRunnerController',
                    controllerAs: 'runner'
                },
                operations: {
                    templateUrl: 'src/app/operations/ztoperations.html',
                    controller: 'ZtOperationsController',
                    controllerAs: 'operations'
                }
            }
        });
    }
})();