(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('BaseUrl', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.logMenuItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
                menu.menuItems = response;
            })
            .catch(function (error) {
                console.log("Something went terribly wrong.");
            })
        };
    }

    MenuSearchService.$inject = ['$http', 'BaseUrl']
    function MenuSearchService($http, BaseUrl) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (BaseUrl + "/menu_items.json"),
                params: {
                    description: searchTerm
                }
            }).then(function (result){
                var foundItems = result.data.menu_items.filter(item => {
                                            return item.description
                                                .toString()
                                                .toLowerCase()
                                                .indexOf(searchTerm.toLowerCase()) >= 0
                                            })
                return foundItems;
            });
        }
    }
})();