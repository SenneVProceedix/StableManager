(function () {
    var currentUser = function () {


        var setProfile = function (username, token) {
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("token", token);
        };

        var getProfile = function () {
            return {
                isLoggedIn: sessionStorage.getItem("isLoggedIn"),
                username: sessionStorage.getItem("username"),
                token: sessionStorage.getItem("token")
            };
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        };
    };

    angular
        .module("common.services")
        .factory("currentUser",
            currentUser);
})();
