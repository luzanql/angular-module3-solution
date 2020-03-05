(function ()  {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)

    NarrowItDownController.$inject = ['MenuSearchService'];
    function getMatchedMenuItems() {
        var promise = getMenus();

        promise.then(function (result) {

        },
        function (error) {

        }
    )};

    function getMenus() {
        var deferred = $q.defer();

        return deferred.promise;
    }
});