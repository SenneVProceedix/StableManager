(function () {
    var app = angular.module("stableManager");

    var mainController = function ($scope, userResource, currentUser) {
        $scope.isLoggedIn = function () {
            return currentUser.getProfile().isLoggedIn;
        };

        $scope.user = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        var errorHandling = function (response) {
            toastr.error(response.statusText);
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    toastr.error(response.data.modelState[key]);
                }
            }
            if (response.data.exceptionMessage) {
                toastr.error(response.data.exceptionMessage);
            }
        };

        $scope.login = function () {
            $scope.user.grant_type = "password";
            $scope.user.username = $scope.user.email;
            userResource.identification.login($scope.user, function (data) {
                toastr.success("you have been logged in");
                currentUser.setProfile($scope.user.username, data.access_token);
            }, errorHandling);
        };

        $scope.register = function () {
            $scope.user.confirmPassword = $scope.user.password;
            $scope.user.username = $scope.user.email;
            userResource.registration.register($scope.user, function () {
                toastr.success("You have succesfully been registered!");
                $scope.login();
            }, errorHandling);
        };
    };

    app.controller("mainController", ["$scope", "userResource", "currentUser", mainController]);
}());