(function () {

    var app = angular.module("stableManager");

    var stableEditController = function ($scope, stable, moneyService) {

        $scope.date = {
            opened: false
        };

        $scope.price = {};

        $scope.price.priceOption = "percent";

        $scope.marginPercent = function () {
            return moneyService.calculateMarginPercent($scope.stable.price,
                $scope.stable.cost);
        };

        $scope.calculatePrice = function () {
            var price = 0;

            if ($scope.price.priceOption === 'amount') {
                price = moneyService.calculatePriceFromMarkupAmount(
                    $scope.stable.cost, $scope.price.markupAmount);
            }

            if ($scope.price.priceOption === 'percent') {
                price = moneyService.calculatePriceFromMarkupPercent(
                    $scope.stable.cost, $scope.price.markupPercent);
            }
            console.log($scope.price.markupPercent + " - " + $scope.price.markupAmount + " - " + $scope.price.priceOption);
            $scope.stable.price = price;
        };

        var open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.date.opened = !$scope.date.opened;
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

        $scope.open = open;

        if (stable.status && stable.status !== 200) {
            console.log(stable);
            errorHandling(stable);
        } else {
            $scope.stable = stable;
            $scope.stable.constructionDate = Date.parse($scope.stable.constructionDate);
            $scope.stable.size = stable.length + "x" + stable.width;
            console.log($scope.stable);
        }

        if (stable && stable.id) {
            $scope.title = "Edit " + stable.name;
        } else {
            $scope.title = "New Stable";
        }

        $scope.save = function () {
            console.log("save called");
            $scope.stable.length = $scope.stable.size[0];
            $scope.stable.width = $scope.stable.size[$scope.stable.size.length - 1];
            $scope.stable.constructionDate = new Date($scope.stable.constructionDate).toISOString();

            if ($scope.stable.id) {
                $scope.stable.$update({ id: $scope.stable.id }, function (data) {
                    $scope.stable = data;
                    $scope.stable.constructionDate = Date.parse($scope.stable.constructionDate);
                    $scope.stable.size = data.length + "x" + data.width;
                    toastr.success("Stable Updated");
                    console.log($scope.stable);
                }, errorHandling);
            } else {
                $scope.stable.$save(function (data) {
                    $scope.stable = data;
                    $scope.stable.constructionDate = Date.parse($scope.stable.constructionDate);
                    $scope.stable.size = data.length + "x" + data.width;
                    toastr.success("New Stable Created");
                    console.log($scope.stable);
                }, errorHandling);
            }
        };
    };

    app.controller("stableEditController", ["$scope", "stable", "moneyService", stableEditController]);

}());