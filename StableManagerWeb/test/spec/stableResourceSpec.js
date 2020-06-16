describe("stableResource", function () {

    var stableResource, $httpBackend, appSettings, currentUser, $rootScope;

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
        module("ngResource");


        module("common.services", function ($provide) {
            $provide.service("currentUser", function () {
                return {
                    getProfile: function () {
                        return { token: "12345" };
                    }
                };
            });
        });


        inject(function (_stableResource_, _$httpBackend_, _appSettings_, _$rootScope_) {
            stableResource = _stableResource_;
            $httpBackend = _$httpBackend_;
            appSettings = _appSettings_;
            $rootScope = _$rootScope_;

        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should add authorization header", function () {
        $httpBackend.whenGET(appSettings.serverPath + "api/stables")
            .respond(function (method, url, data, headers, params) {
                expect(headers.Authorization).toBe("Bearer 12345");
                return [200, stables];
            });

        stableResource.query(function (data) {
            response = data;
        });

        $httpBackend.flush();
    });


    it("should return all stables", function () {

        $httpBackend.whenGET(appSettings.serverPath + "api/stables")
            .respond(200, stables);

        stableResource.query(function (data) {
            response = data;
        });

        $httpBackend.flush();

        expect(angular.toJson(response)).toEqual(angular.toJson(stables));
    });

    it("should get a single stable with id 2", function () {
        var response;

        $httpBackend.when("GET", appSettings.serverPath + "api/stables/2")
            .respond(200, stables[1]);

        stableResource.get({ id: 2 },function (data) {
            response = data;
        });

        $httpBackend.flush();

        expect(angular.toJson(response)).toEqual(angular.toJson(stables[1]));
    });

    it("should save a stable", function () {

        var stable = new stableResource({
            "id": 0,
            "url": "Image/field2.jpg",
            "name": "Field With 2 Stable",
            "size": "4x6",
            "type": "full pension",
            "bedding": "straw",
            "constructionDate": "01/10/2015",
            "cost": 200,
            "price": 500
        });

        $httpBackend.expectPOST(/./, stable).respond(200);

        stable.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it("should update a stable", function () {
        var stable = new stableResource({
            "id": 3,
            "url": "Image/field2.jpg",
            "name": "Field With 2 Stable",
            "size": "4x6",
            "type": "full pension",
            "bedding": "straw",
            "constructionDate": "01/10/2015",
            "cost": 200,
            "price": 500
        });

        $httpBackend.expectPUT(/./, stable).respond(200);

        stable.$update();

        expect($httpBackend.flush).not.toThrow();
    });
})