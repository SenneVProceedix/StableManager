(function () {

    var app = angular.module("stableManager", [
        "common.services",
        //"stableResourceMock",
        "ui.router",
        "ui.mask",
        "ui.bootstrap",
        "chart.js"
    ]);
        

    var routing = function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider.state("stablesList", {
            url: "/stables",
            templateUrl: "App/Stable/StableListView.html",
            controller: "stableListController",
            data: {

            }
        })
            .state("priceAnalytic", {
                url: "/price",
                templateUrl: "App/Price/PriceAnalyticView.html",
                controller: "priceAnalyticController",
                resolve: {
                    stableResource: "stableResource",
                    stable: function (stableResource) {
                        return stableResource.query(
                            function (response) { },
                            function (response) {
                                if (response.status) {
                                    alert("Error accessing resource: " + response.config.method + " " + response.config.url);
                                } else {
                                    alert(response.statusText);
                                }
                            },
                            function (statusNotification) { }
                        ).$promise;
                    }
                }
            })
            .state("stableEdit", {
                abstract: true,
                url: "/stables/edit/:id",
                templateUrl: "App/Stable/StableEditView.html",
                controller: "stableEditController",
                resolve: {
                    authenticate: function (currentUser) {
                        if (!currentUser.getProfile().isLoggedIn) {
                            throw "not authorized";
                        }
                    },
                    stableResource: "stableResource",
                    stable: function (stableResource, $stateParams) {
                            return stableResource.get({ id: $stateParams.id }).$promise.then(
                                function (stable) {
                                    return stable;
                                },
                                function (error) {
                                    return error;
                                }
                            );
                    }
                }
            })
            .state("stableEdit.info", {
                url: "/info",
                templateUrl: "App/Stable/StableEditInfoView.html"
            })
            .state("stableEdit.price", {
                url: "/price",
                templateUrl: "App/Stable/StableEditPriceView.html"
            })
            .state("stableEdit.image", {
                url: "/image",
                templateUrl: "App/Stable/StableEditImageView.html"
            })
            .state("home", {
                url: "/",
                templateUrl: "App/home.html"
            })
            .state("stableDetail", {
                url: "/stables/detail/:id",
                templateUrl: "App/Stable/StableDetailView.html",
                controller: "stableDetailController",
                
                resolve: {
                    authenticate: function (currentUser) {
                        if (!currentUser.getProfile().isLoggedIn) {
                            throw "not authorized";
                        }
                    },
                    stableResource: "stableResource",
                    stable: function (stableResource, $stateParams, $location) {
                        return stableResource.get({ id: $stateParams.id }).$promise.then(
                            function (response) {
                                console.log(response);
                                return response;
                            },
                            function (response) {
                                console.log(response);
                                if (response.status === 401) {
                                    $location.path("/");
                                }
                                return response;
                            }
                        );
                    }
                }
            });
    };

    app.config(["$stateProvider", "$urlRouterProvider", routing]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
            return function (exception, cause) {
                exception.message = "An error has occured!\nMessage: " + exception.message;
                $delegate(exception, cause);
                alert(exception.message);
            };
        }]);
    });

}());