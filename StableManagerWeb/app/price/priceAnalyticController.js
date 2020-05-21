(function () {

    var app = angular.module("stableManager");

    var priceAnalyticController = function ($scope, stable, moneyService) {
        console.log(stable);
        $scope.percent = {
            labels: [],
            series: ["Margin Percent"],
            data: [],
            options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
        };
        $scope.amount = {
            labels: [],
            series: ["Cost", "Price", "Margin"],
            data: [[], [], []],
            options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }
        };


        for (var i = 0; i < stable.length; i++) {
            $scope.percent.labels[i] = stable[i].name;
            $scope.amount.labels[i] = stable[i].name;

            $scope.percent.data[i] = moneyService.calculateMarginPercent(stable[i].price, stable[i].cost);
            $scope.amount.data[0][i] = stable[i].cost;
            $scope.amount.data[1][i] = stable[i].price;
            $scope.amount.data[2][i] = moneyService.calculateMarginAmount(stable[i].price, stable[i].cost);

        }

    };
    app.controller("priceAnalyticController", ["$scope", "stable", "moneyService", priceAnalyticController]);

}());