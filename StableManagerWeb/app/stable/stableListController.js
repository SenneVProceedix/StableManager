(function () {

    var app = angular.module("stableManager");

    var stableListController = function ($scope, stableResource) {
        $scope.hideImage = false;

        $scope.odata = {
            search : ""
        };

        $scope.toggleImage = function () {
            $scope.hideImage = !$scope.hideImage;
        };

        var errorHandling = function (response) {
            toastr.error(response.statusText);
            if (response.data && response.data.modelState) {
                for (var key in response.data.modelState) {
                    toastr.error(response.data.modelState[key]);
                }
            }
            if (response.data && response.data.exceptionMessage) {
                toastr.error(response.data.exceptionMessage);
            }
        };

        $scope.searchClicked = function () {
            stableResource.query({ $filter: "contains(tolower(Name), tolower('" + $scope.odata.search + "'))" }, function (data) {
                $scope.stables = data;
                $scope.stables.forEach(function (stable) {
                    stable.size = stable.length + "x" + stable.width;
                }, errorHandling);
            });
        };

        stableResource.query( function (data) {
            $scope.stables = data;
            $scope.stables.forEach(function (stable) {
                stable.size = stable.length + "x" + stable.width;
            });
        }, errorHandling);
    };

    app.controller("stableListController", ["$scope", "stableResource", stableListController]);
}());