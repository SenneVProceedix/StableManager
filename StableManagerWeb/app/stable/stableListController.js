(function () {

    var app = angular.module("stableManager");

    var stableListController = function ($scope, stableResource) {
        $scope.hideImage = false;

        $scope.toggleImage = function () {
            $scope.hideImage = !$scope.hideImage;
        };

        stableResource.query(function (data) {
            $scope.stables = data;
        });
        /*
        $scope.stables = 
        */
    };

    app.controller("stableListController", ["$scope", "stableResource", stableListController]);
}());