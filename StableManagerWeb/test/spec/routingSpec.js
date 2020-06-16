describe("Routing", function () {

    var $httpBackend, $rootscope, $state, $location, stableResource, $q;

    var isLoggedIn = true;

    var data = { "id": 1, "name": "Field With Stable", "url": "Image/field.jpg", "width": 4, "length": 3, "type": "half pension", "bedding": "straw", "constructionDate": "2015-10-10T00:00:00", "cost": 100.0, "price": 250.0 };

    function goTo(url) {
        $location.url(url);
        $httpBackend.flush();
    }

    beforeEach(function () {

        module("common.services", function ($provide) {
            $provide.service("currentUser", function () {
                return {
                    getProfile: function () {
                        return { isLoggedIn: isLoggedIn };
                    }
                };
            });
        });

        module("stableManager", "ui.router", "ui.mask", "ui.bootstrap", "chart.js");

        inject(function (_$rootScope_, _$httpBackend_, _$state_, _$location_, _stableResource_, _$q_) {
            $rootscope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $state = _$state_;
            $location = _$location_;
            stableResource = _stableResource_;
            $q = _$q_;
        });

        $httpBackend.whenGET("App/home.html").respond(200);
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should navigate to home", function () {
        $httpBackend.expectGET("App/home.html").respond(200);
        goTo("/");
        expect($state.current.name).toEqual("home");
    });

    it("should navigate to list of horses", function () {
        $httpBackend.expectGET("App/Stable/StableListView.html").respond(200);
        goTo('stables');
        expect($state.$current.name).toEqual("stablesList");
    });

    it("should load in horse when navigating to horse detail", function () {

        spyOn(stableResource, "get").and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(data);
            return { $promise: deferred.promise};
        });

        $httpBackend.expectGET("App/Stable/StableDetailView.html").respond(200);
        goTo('stables/detail/1');

        expect(stableResource.get).toHaveBeenCalled();
        expect($state.$current.name).toEqual("stableDetail");
    });

    it("should navigate to home when navigating to horse detail unauthorized", function () {
        isLoggedIn = false;
        $httpBackend.expectGET("App/home.html").respond(200);

        goTo('stables/detail/1');

        expect($state.$current.name).toEqual("home");
    })

});