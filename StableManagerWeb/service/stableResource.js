(function () {
    var common = angular.module("common.services");

    var stableResource = function ($resource, appSettings, currentUser) {
        return $resource(appSettings.serverPath + "api/stables/:id", null, {
            'query': {
                method: 'GET',
                isArray: true,
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            },
            'get': {
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            },
            'save': {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            },
            'update': {
                method: 'PUT',
                headers: { 'Authorization': 'Bearer ' + currentUser.getProfile().token }
            }
        });
    };

    common.factory("stableResource", ["$resource", "appSettings", "currentUser", stableResource]);

}());