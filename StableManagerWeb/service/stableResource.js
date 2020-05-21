(function () {
    var common = angular.module("common.services");

    var stableResource = function ($resource) {
        return $resource("api/stables/:id");
    };

    common.factory("stableResource", ["$resource", stableResource]);

}());