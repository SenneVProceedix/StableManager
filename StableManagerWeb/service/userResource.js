(function () {
    var common = angular.module("common.services");

    var userResource = function ($resource, appSettings) {
        return {
            registration: $resource(appSettings.serverPath + "api/account/register", null,
                {
                    'register': { method: 'POST' }
                }),
            identification: $resource(appSettings.serverPath + "token", null,
                {
                    'login': {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data)
                                str.push(encodeURIComponent(d) + "=" +
                                    encodeURIComponent(data[d]));
                            return str.join("&");
                        }

                    }
                })
        };
    };

    common.factory("userResource", ["$resource", "appSettings", userResource]);

}());