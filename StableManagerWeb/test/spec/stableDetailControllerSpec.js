describe("stable list controller", function () {

    var $scope;

    var stable = 
        {
            "id": 1,
            "url": "Image/field.jpg",
            "name": "Field With Stable",
            "size": "4x3",
            "type": "half pension",
            "bedding": "straw",
            "constructionDate": "10/10/2015",
            "cost": 100,
            "price": 250
        };


    beforeEach(function () {

        module("stableManager", "ui.router", "ui.mask", "ui.bootstrap", "chart.js");

        module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });

        inject(function (_$controller_, _$rootScope_, _$httpBackend_) {
            $rootscope = _$rootScope_;
            $scope = _$rootScope_.$new();
            controller = _$controller_("stableDetailController", { $scope: $scope, stable: stable});
        });
    });

    it("should get stable", function () {

        expect($scope.stable).toEqual(stable);
    });
});