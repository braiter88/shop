(function() {
    angular.module('controller.adminCtrl', []).controller('adminCtrl', [
        '$scope',
        '$state',
        function($scope, $state) {
            angular.element('#loginForm').modal('show');

            $scope.login = function(){
                console.log('login');
            }
        }
    ]);
})();