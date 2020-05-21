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

        $scope.open = open;

        $scope.stable = stable;
        $scope.stable.constructionDate = Date.parse($scope.stable.constructionDate);

        if (stable && stable.id) {
            $scope.title = "Edit " + stable.name;
        } else {
            $scope.title = "New Stable";
        }

        $scope.save = function () {
            console.log("save called");
            $scope.stable.$save(function () {
                toastr.success("Stable saved");
            });
        };
    };

    app.controller("stableEditController", ["$scope", "stable", "moneyService", stableEditController]);

}());