describe("stable list controller", function () {

    var $scope, stableResource, $httpBackend, appSettings;

    var stables = [
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
        },
        {
            "id": 2,
            "url": "Image/stable1.jpg",
            "name": "Standard Stable",
            "size": "3x3",
            "type": "half pension",
            "bedding": "straw",
            "constructionDate": "10/10/2015",
            "cost": 200,
            "price": 300
        },
        {
            "id": 3,
            "url": "Image/stable2.jpg",
            "name": "Silver Stable",
            "size": "3x4",
            "type": "full pension",
            "bedding": "straw",
            "constructionDate": "10/10/2015",
            "cost": 450,
            "price": 650
        }
    ];


    beforeEach(function () {

        module("stableManager", "ui.router", "ui.mask", "ui.bootstrap", "chart.js");

        module(function ($urlRouterProvider) {
            $urlRouterProvider.deferIntercept();
        });


        spyOn(toastr, "error").and.callFake(function () { });

        inject(function (_$controller_, _$rootScope_, _stableResource_, _$httpBackend_, _appSettings_) {
            $httpBackend = _$httpBackend_;
            appSettings = _appSettings_;
            $scope = _$rootScope_.$new();
            stableResource = _stableResource_;
            controller = _$controller_("stableListController", { $scope: $scope, stableResource: stableResource });
        });

        $httpBackend.whenGET(appSettings.serverPath + "api/stables").respond(200, stables);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });


    it("should get all stables", function () {
        $httpBackend.expectGET(appSettings.serverPath + "api/stables").respond(200, stables);
        expect($httpBackend.flush).not.toThrow();
    });

    it("should toggle show/hide image", function () {
        $scope.toggleImage();
        expect($scope.hideImage).toBeTrue();
    });

    it("shoud search for stables", function () {

        $httpBackend.expectGET(appSettings.serverPath + "api/stables?$filter=contains(tolower(Name),+tolower('field'))").respond(200, stables);

        $scope.odata.search = "field";
        $scope.searchClicked();

        expect($httpBackend.flush).not.toThrow();
    });

    it("should handle errors", function () {
        $httpBackend.expectGET(appSettings.serverPath + "api/stables").respond(404, {});

        $httpBackend.flush();

        expect(toastr.error).toHaveBeenCalled();
    });
});