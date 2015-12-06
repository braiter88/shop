(function() {
    "use strict";

    angular.module('app', [ 'ui.router', 'oc.lazyLoad', 'ngResource', 'uiRouterStyles', 'angular-loading-bar', 'ngSanitize'])
        .config(configureApp)
        .run(['$rootScope', '$state', '$location', function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(event, toUrl) {
                console.log(toUrl);
                if ((!angular.isDefined(toUrl.data) || !angular.isDefined(toUrl.data.isPublic)) && !localStorage.token) {
                    console.log('toHome');
                    event.preventDefault();
                    $state.go('home', {}, {reload: true});
                }
            });
        }])
        .filter('formatDate', formatDate);

    configureApp.$inject = ['$httpProvider', '$locationProvider', '$interpolateProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', 'cfpLoadingBarProvider'];

    function configureApp($httpProvider, $locationProvider, $interpolateProvider, $stateProvider,   $urlRouterProvider, $ocLazyLoadProvider, cfpLoadingBarProvider ) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 200;
        $interpolateProvider.startSymbol('[[').endSymbol(']]');
        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push(errorHandler);
        $httpProvider.interceptors.push(requestHandler);
        $httpProvider.useApplyAsync(true);
        initModules($ocLazyLoadProvider);
        initStates($stateProvider, $ocLazyLoadProvider);
        $httpProvider.defaults.withCredentials = true;
        $urlRouterProvider.otherwise('/');
    };

    function errorHandler($q, $rootScope) {
        return {
            responseError: function(response) {
                var message = '';
                if (response.status === 401 || response.status === 400) {
                    if (response.data && response.data.error) {
                        message = response.data.error;
                    } else {
                        message =  'Token expired';
                    }

                    $rootScope.$broadcast('authExpired', { text: message });
                }
                return $q.reject(response);
            }
        };
    };

    function requestHandler() {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if (localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + localStorage.token;
                }
                return config;
            }
        };
    }

    function formatDate(){
        return function(text) {
            var d = new Date(text);
            var currDate = d.getDate();
            var currMonth = d.getMonth() + 1;
            var currYear = d.getFullYear();

            return currYear + "-" + currMonth + "-" + currDate;
        };
    }

})();