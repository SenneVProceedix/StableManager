(function () {

    var app = angular.module("stableResourceMock", ["ngMockE2E"]);


    app.run(function ($httpBackend) {

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

        var stableUrl = "api/stables";
        var singleStableUrl = new RegExp(stableUrl + "/[0-9][0-9]*");

        $httpBackend.whenGET(stableUrl).respond(stables);

        $httpBackend.whenGET(singleStableUrl).respond(function (method, url, data) {
            var stable = { stableId: 0 };
            var param = url.split('/');
            var id = param[param.length - 1];
            console.log(id);

            if (id > 0) {
                for (var i = 0; i < stables.length; i++) {
                    if (stables[i].id == id) {
                        return [200, stables[i], {}];
                    }
                }
            }
            return [200, stable, {}];
        });

        $httpBackend.whenPOST(stableUrl).respond(function (method, url, data) {
            var stable = angular.fromJson(data);

            if (!stable.id) {
                stable.id = stables[stables.length - 1].id + 1;
                stables.push(stable);
            }
            else {
                for (var i = 0; i < stables.length; i++) {
                    if (stables[i].id === stable.id) {
                        stables[i] = stable;
                        break;
                    }
                }
            }
            return [200, stable, {}];
        });

        $httpBackend.whenGET(/App/).passThrough();
        $httpBackend.whenGET(/uib/).passThrough();
    });

}());