(function () {

    var app = angular.module("stableManager");

    var stableDetailController = function ($scope, stable) {
        $scope.stable = stable;
    };

    app.controller("stableDetailController", ["$scope", "stable", stableDetailController]);

}())